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
      <style>{`
        @keyframes hotspotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26, 58, 138, 0.35), 0 0 0 0 rgba(26, 58, 138, 0.0); }
          50%      { box-shadow: 0 0 0 10px rgba(26, 58, 138, 0.0), 0 0 22px 4px rgba(26, 58, 138, 0.18); }
        }
        @keyframes hintPing {
          0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.6; }
          80%  { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
        }
        @keyframes bulletIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes titleIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hotspot-idle { animation: hotspotPulse 2.8s ease-in-out infinite; }
        .hotspot-idle::after {
          content: "";
          position: absolute;
          left: 50%; top: 50%;
          width: 70%; height: 70%;
          border-radius: 9999px;
          border: 2px solid rgba(26, 58, 138, 0.5);
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          animation: hintPing 2.8s ease-out infinite;
          pointer-events: none;
        }
        .hotspot-idle:hover { animation: none; }
        .hotspot-idle:hover::after { animation: none; opacity: 0; }
        .panel-title { animation: titleIn 0.4s ease-out both; }
        .panel-bullet { animation: bulletIn 0.45s ease-out both; }
      `}</style>

      <button
        onClick={() => setDevMode((v) => !v)}
        className="fixed top-3 left-3 z-50 rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-black"
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
              className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 ${
                devMode
                  ? "bg-red-500/40 ring-2 ring-red-600"
                  : "hotspot-idle bg-white/0 hover:scale-110 hover:bg-white/25 hover:shadow-[0_0_40px_rgba(255,255,255,0.85),0_0_18px_rgba(26,58,138,0.45)] hover:backdrop-blur-[1px]"
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
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={active?.title ?? "Panel de información"}
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          active ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {active && (
          <div key={active.id} className="flex h-full flex-col overflow-y-auto p-6 sm:p-8">
            <div className="mb-2 flex items-start justify-between gap-4">
              <span
                className="panel-title inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wider text-white"
                style={{ backgroundColor: "#1a3a8a" }}
              >
                SECTOR {active.id}
              </span>
              <button
                onClick={() => setActive(null)}
                aria-label="Cerrar panel"
                className="shrink-0 rounded-full p-2 text-gray-500 transition-all duration-200 hover:rotate-90 hover:bg-gray-100 hover:text-gray-900"
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
            <h2
              className="panel-title mb-6 text-2xl font-bold leading-tight"
              style={{ color: "#1a3a8a", animationDelay: "60ms" }}
            >
              {active.title.replace(/^\d+\.\s*/, "")}
            </h2>
            <div
              className="panel-title mb-6 h-1 w-16 rounded-full"
              style={{
                background: "linear-gradient(90deg, #1a3a8a, #4a8fd6)",
                animationDelay: "120ms",
              }}
            />
            <ul className="space-y-3 text-gray-700">
              {active.bullets.map((b, i) => (
                <li
                  key={i}
                  className="panel-bullet group/li flex gap-3 rounded-lg p-2 leading-relaxed transition-colors duration-200 hover:bg-blue-50/60"
                  style={{ animationDelay: `${150 + i * 70}ms` }}
                >
                  <span
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover/li:scale-150"
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
