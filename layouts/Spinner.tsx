"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-950 border-r-blue-700"></div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-950">
            Chargement...
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Veuillez patienter quelques instants.
          </p>
        </div>
      </div>
    </div>
  );
}