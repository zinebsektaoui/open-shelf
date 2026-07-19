type FilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function Filter({ value, onChange }: FilterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
      <button
        onClick={() => onChange("Tous")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "Tous"
            ? "bg-blue-950 text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-blue-900"
        }`}
      >
        Tous
      </button>

      <button
        onClick={() => onChange("Disponible")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "Disponible"
            ? "bg-blue-950 text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-blue-900"
        }`}
      >
        Disponible
      </button>

      <button
        onClick={() => onChange("Emprunté")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "Emprunté"
            ? "bg-blue-950 text-white shadow-sm"
            : "text-slate-600 hover:bg-white hover:text-blue-900"
        }`}
      >
        Emprunté
      </button>
    </div>
  );
}