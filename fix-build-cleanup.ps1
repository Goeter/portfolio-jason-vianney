# Fix build errors caused by unused shadcn/ui and theme files.
# Run from the project root: C:\Portfolio Website Jason\portfolio-jason-vianney

$paths = @(
  "components\theme-provider.tsx",
  "components\ui\accordion.tsx",
  "components\ui\alert-dialog.tsx",
  "components\ui\alert.tsx",
  "components\ui\aspect-ratio.tsx",
  "components\ui\avatar.tsx",
  "components\ui\badge.tsx",
  "components\ui\breadcrumb.tsx",
  "components\ui\calendar.tsx",
  "components\ui\carousel.tsx",
  "components\ui\chart.tsx",
  "components\ui\checkbox.tsx",
  "components\ui\collapsible.tsx",
  "components\ui\command.tsx",
  "components\ui\context-menu.tsx",
  "components\ui\dialog.tsx",
  "components\ui\drawer.tsx",
  "components\ui\dropdown-menu.tsx",
  "components\ui\form.tsx",
  "components\ui\hover-card.tsx",
  "components\ui\input-otp.tsx",
  "components\ui\input.tsx",
  "components\ui\label.tsx",
  "components\ui\menubar.tsx",
  "components\ui\navigation-menu.tsx",
  "components\ui\pagination.tsx",
  "components\ui\popover.tsx",
  "components\ui\progress.tsx",
  "components\ui\radio-group.tsx",
  "components\ui\resizable.tsx",
  "components\ui\scroll-area.tsx",
  "components\ui\select.tsx",
  "components\ui\separator.tsx",
  "components\ui\sheet.tsx",
  "components\ui\sidebar.tsx",
  "components\ui\skeleton.tsx",
  "components\ui\slider.tsx",
  "components\ui\sonner.tsx",
  "components\ui\switch.tsx",
  "components\ui\table.tsx",
  "components\ui\tabs.tsx",
  "components\ui\textarea.tsx",
  "components\ui\toast.tsx",
  "components\ui\toaster.tsx",
  "components\ui\toggle-group.tsx",
  "components\ui\toggle.tsx",
  "components\ui\tooltip.tsx",
  "components\ui\use-mobile.tsx",
  "components\ui\use-toast.ts",
  "hooks\use-mobile.tsx",
  "hooks\use-toast.ts",
  "pnpm-lock.yaml",
  "tsconfig.tsbuildinfo"
)

foreach ($path in $paths) {
  if (Test-Path $path) {
    Remove-Item $path -Force
    Write-Host "Removed $path"
  }
}

if (Test-Path "hooks") {
  if (-not (Get-ChildItem "hooks" -Force)) {
    Remove-Item "hooks" -Force
    Write-Host "Removed empty hooks folder"
  }
}

Write-Host "Cleanup finished. Remaining UI components:"
Get-ChildItem "components\ui"
