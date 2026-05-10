{/* Mobile Menu */}
<div
  className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
    isMobileMenuOpen
      ? "pointer-events-auto opacity-100"
      : "pointer-events-none opacity-0"
  }`}
>
  {/* Overlay */}
  <div
    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
      isMobileMenuOpen ? "opacity-100" : "opacity-0"
    }`}
    onClick={() => setIsMobileMenuOpen(false)}
  />

  {/* Sidebar */}
  <div
    className={`absolute right-0 top-0 h-full w-[280px] border-l border-cyan-500/20 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out ${
      isMobileMenuOpen
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0"
    }`}
  >
    {/* Header */}
    <div className="mb-8 flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-wide text-white">
        Navigation
      </h2>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(false)}
        className="rounded-xl text-cyan-300 transition-all duration-300 hover:bg-cyan-500/10 hover:text-white"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>

    {/* Menu Items */}
    <div className="space-y-3">
      {navItems.map((item, index) => {
        const Icon = item.icon
        const isActive = activeSection === item.id

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-500 ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            } ${
              isActive
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
            }`}
            style={{
              transitionDelay: `${index * 80}ms`,
            }}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <Icon className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

            <span className="relative z-10 text-sm font-medium">
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  </div>
</div>
