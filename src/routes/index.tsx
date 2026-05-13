import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import mapaImg from "@/assets/mapa.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Cadena de Producción Sostenible de la Pesca y Acuicultura Marina" },
      {
        name: "description",
        content:
          "Infografía interactiva sobre la cadena de producción sostenible de la pesca y acuicultura marina — Economía Circular AQUAFISH.",
      },
    ],
  }),
});

type Sector = {
  id: number;
  title: string;
  bullets: string[];
  x: number;
  y: number;
  w: number;
  h: number;
};

const SECTORS: Sector[] = [
  {
    id: 1,
    title: "1. Pesca y Acuicultura Sostenible",
    bullets: [
      "Técnicas de pesca responsable",
      "Reducción de descartes",
      "Respeto a las especies y ecosistemas protegidos",
      "Cultivos multitróficos",
      "Bienestar animal",
      "Recirculación de agua",
    ],
    x: 50, y: 20, w: 15, h: 15,
  },
  {
    id: 2,
    title: "2. Mercado de Origen",
    bullets: [
      "Buenas prácticas de manipulación",
      "Higiene y seguridad alimentaria",
      "Control de las capturas",
      "Marcas de calidad",
    ],
    x: 80, y: 38, w: 15, h: 15,
  },
  {
    id: 3,
    title: "3. Transporte",
    bullets: [
      "Cadena de frío eficiente",
      "Reducción de la huella de carbono",
      "Embalajes ecológicos",
    ],
    x: 85, y: 58, w: 15, h: 15,
  },
  {
    id: 4,
    title: "4. Comercialización y Transformación",
    bullets: [
      "Conservas, fileteado, productos transformados",
      "Productos descartados y que no se pueden utilizar para consumo: harina y aceite de pescado, productos para otras industrias, abonos para agricultura, pienso para acuicultura y ganadería",
      "Reciclado: reciclado de plásticos, de cajas de corcho, de redes",
    ],
    x: 72, y: 78, w: 15, h: 15,
  },
  {
    id: 5,
    title: "5. Consumo",
    bullets: [
      "Productos frescos",
      "Mercado y empleo local",
      "Identificación",
      "Productos de la pesca y acuicultura sanos y seguros",
      "Trazabilidad (procedencia)",
      "Calidad nutricional",
    ],
    x: 45, y: 80, w: 15, h: 15,
  },
  {
    id: 6,
    title: "6. Impacto Positivo",
    bullets: [
      "Comercio y tradición local",
      "Cero desperdicios",
      "Menor impacto ambiental, reducir cambio climático",
    ],
    x: 18, y: 65, w: 15, h: 15,
  },
  {
    id: 7,
    title: "7. Recuperación de Ecosistemas Marinos y Costeros",
    bullets: [
      "Biodiversidad",
      "Protección de zonas acuícolas",
      "Reservas marinas",
      "Reservas de pesca",
    ],
    x: 15, y: 38, w: 15, h: 15,
  },
];

function Index() {
  const [active, setActive] = useState<Sector | null>(null);
  const [devMode, setDevMode] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <button
        onClick={() => setDevMode((v) => !v)}
        className="fixed top-3 left-3 z-50 rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white hover:bg-black"
      >
        {devMode ? "Hide Hotspots" : "Show Hotspots"}
      </button>

      <main className="mx-auto flex min-h-screen w-full max-w-[1400px] items-center justify-center p-2 sm:p-4">
        <div className="relative w-full">
          <img
            src={mapaImg}
            alt="Cadena de producción sostenible de la pesca y acuicultura marina"
            className="block h-auto w-full select-none"
            draggable={false}
          />

          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              aria-label={`Abrir información sobre ${s.title.replace(/^\d+\.\s*/, "")}`}
              tabIndex={0}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                devMode
                  ? "bg-red-500/40 ring-2 ring-red-600"
                  : "bg-white/0 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
              }`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.w}%`,
                height: `${s.h}%`,
                cursor: "pointer",
              }}
              title={
                devMode
                  ? `S${s.id} • x:${s.x}% y:${s.y}% w:${s.w}% h:${s.h}%`
                  : undefined
              }
            >
              {devMode && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
                  {s.id} ({s.x}, {s.y})
                </span>
              )}
            </button>
          ))}

          <div
            aria-hidden="true"
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${
              devMode ? "bg-yellow-400/40 ring-2 ring-yellow-600" : ""
            }`}
            style={{ left: "50%", top: "50%", width: "10%", height: "10%" }}
          />
        </div>
      </main>

      <div
        onClick={() => setActive(null)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={active?.title ?? "Panel de información"}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[400px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          active ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {active && (
          <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2
                className="text-2xl font-bold leading-tight"
                style={{ color: "#1a3a8a" }}
              >
                {active.title}
              </h2>
              <button
                onClick={() => setActive(null)}
                aria-label="Cerrar panel"
                className="shrink-0 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul className="space-y-3 text-gray-700">
              {active.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "#1a3a8a" }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
