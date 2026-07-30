import { NextResponse, type NextRequest } from "next/server"
import fs from "fs"
import path from "path"
import { createClient } from "@supabase/supabase-js"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "upvotes.json")

// Local file fallback store
let memoryUpvotes: Record<string, number> = {}
let loadedFromDisk = false

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({}), "utf-8")
    }
  } catch (err) {
    console.error("Error creating upvotes data directory:", err)
  }
}

function loadLocalUpvotes(): Record<string, number> {
  if (loadedFromDisk) return memoryUpvotes
  try {
    ensureDataFile()
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8")
      memoryUpvotes = JSON.parse(raw) as Record<string, number>
      loadedFromDisk = true
    }
  } catch (err) {
    console.error("Error reading upvotes.json:", err)
  }
  return memoryUpvotes
}

function saveLocalUpvotes(data: Record<string, number>) {
  memoryUpvotes = data
  try {
    ensureDataFile()
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8")
  } catch (err) {
    console.error("Error saving upvotes.json:", err)
  }
}

// Supabase client helper
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (url && key) {
    try {
      return createClient(url, key)
    } catch (err) {
      console.error("Failed to initialize Supabase client:", err)
    }
  }
  return null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  const ids = searchParams.get("ids")

  const supabase = getSupabaseClient()

  if (supabase) {
    try {
      if (id) {
        const { data, error } = await supabase
          .from("item_upvotes")
          .select("id, likes_count")
          .eq("id", id)
          .single()

        if (!error && data) {
          return NextResponse.json({ success: true, upvotes: { [data.id]: data.likes_count } })
        }
      } else {
        let query = supabase.from("item_upvotes").select("id, likes_count")
        if (ids) {
          const idList = ids.split(",")
          query = query.in("id", idList)
        }
        const { data, error } = await query
        if (!error && data) {
          const result: Record<string, number> = {}
          data.forEach((row: { id: string; likes_count: number }) => {
            result[row.id] = row.likes_count
          })
          return NextResponse.json({ success: true, upvotes: result })
        }
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local store:", err)
    }
  }

  // Fallback to local store
  const localData = loadLocalUpvotes()
  if (id) {
    return NextResponse.json({ success: true, upvotes: { [id]: localData[id] || 0 } })
  }

  if (ids) {
    const idList = ids.split(",")
    const filtered: Record<string, number> = {}
    idList.forEach((itemId) => {
      filtered[itemId] = localData[itemId] || 0
    })
    return NextResponse.json({ success: true, upvotes: filtered })
  }

  return NextResponse.json({ success: true, upvotes: localData })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { id, itemType = "project", count = 1, title = "" } = body

    if (!id || typeof id !== "string") {
      return NextResponse.json({ success: false, error: "Invalid item ID" }, { status: 400 })
    }

    const increment = Math.min(Math.max(1, Number(count) || 1), 10)
    const supabase = getSupabaseClient()

    if (supabase) {
      try {
        // Try getting existing row
        const { data: existing } = await supabase
          .from("item_upvotes")
          .select("likes_count")
          .eq("id", id)
          .maybeSingle()

        const currentLikes = existing?.likes_count || 0
        const newLikes = currentLikes + increment

        const { error: upsertError } = await supabase.from("item_upvotes").upsert(
          {
            id,
            item_type: itemType,
            title: title || id,
            likes_count: newLikes,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )

        if (!upsertError) {
          return NextResponse.json({
            success: true,
            id,
            likesCount: newLikes,
            source: "supabase",
          })
        } else {
          console.warn("Supabase upsert error:", upsertError.message)
        }
      } catch (err) {
        console.warn("Supabase POST error, falling back to local file:", err)
      }
    }

    // Fallback to local file store
    const localData = loadLocalUpvotes()
    const current = localData[id] || 0
    const nextCount = current + increment
    localData[id] = nextCount
    saveLocalUpvotes(localData)

    return NextResponse.json({
      success: true,
      id,
      likesCount: nextCount,
      source: "local",
    })
  } catch (error) {
    console.error("Error in upvotes API:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
