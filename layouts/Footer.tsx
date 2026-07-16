function Footer() {
  return (
    <footer className="w-full bg-indigo-50 border-t border-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="font-semibold text-slate-800">Bibliothèque Royale</span>
          <span className="text-slate-500">
            © 2024 Bibliothèque Royale - Système de Gestion Intellectuelle
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Conditions
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Confidentialité
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Aide
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer