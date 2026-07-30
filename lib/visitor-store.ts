import fs from "fs"
import path from "path"

export interface VisitorLog {
  id: string
  timestamp: string
  ip: string
  city?: string
  region?: string
  country?: string
  countryCode?: string
  isp?: string
  org?: string
  userAgent: string
  deviceType: string
  browser: string
  os: string
  path: string
  ref: string
  screen?: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "visitors.json")

// In-memory cache for fast server response
let memoryLogs: VisitorLog[] = []
let loadedFromDisk = false

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]), "utf-8")
    }
  } catch (err) {
    console.error("Error creating visitor data directory:", err)
  }
}

function loadLogs(): VisitorLog[] {
  if (loadedFromDisk && memoryLogs.length > 0) {
    return memoryLogs
  }
  try {
    ensureDataFile()
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8")
      memoryLogs = JSON.parse(raw) as VisitorLog[]
      loadedFromDisk = true
    }
  } catch (err) {
    console.error("Error reading visitors.json:", err)
  }
  return memoryLogs
}

function saveLogs(logs: VisitorLog[]) {
  memoryLogs = logs
  try {
    ensureDataFile()
    // Keep last 1000 logs to prevent file from growing indefinitely
    const truncated = logs.slice(0, 1000)
    fs.writeFileSync(DATA_FILE, JSON.stringify(truncated, null, 2), "utf-8")
  } catch (err) {
    console.error("Error saving visitors.json:", err)
  }
}

export function addVisitorLog(log: Omit<VisitorLog, "id" | "timestamp">): VisitorLog {
  const currentLogs = loadLogs()
  const newLog: VisitorLog = {
    ...log,
    id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  }

  // Prepend to top
  const updated = [newLog, ...currentLogs]
  saveLogs(updated)
  return newLog
}

export function getVisitorLogs(): VisitorLog[] {
  return loadLogs()
}

export function parseUserAgent(ua: string) {
  let deviceType = "Desktop"
  if (/mobile/i.test(ua)) deviceType = "Mobile"
  if (/ipad|tablet/i.test(ua)) deviceType = "Tablet"

  let browser = "Unknown"
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) browser = "Chrome"
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = "Safari"
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox"
  else if (/edg/i.test(ua)) browser = "Edge"
  else if (/opera|opr/i.test(ua)) browser = "Opera"

  let os = "Unknown"
  if (/windows/i.test(ua)) os = "Windows"
  else if (/macintosh|mac os/i.test(ua)) os = "macOS"
  else if (/android/i.test(ua)) os = "Android"
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS"
  else if (/linux/i.test(ua)) os = "Linux"

  return { deviceType, browser, os }
}
