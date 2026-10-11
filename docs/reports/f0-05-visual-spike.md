# F0-05 — Boceto navegable 3D (avance)

Fecha: 2026-10-11. Responsable de edición: UX/Frontend 3D. Revisión de Juan y QA: pendiente.

## Dos direcciones

| Vista | Qué aporta | Límite visto |
|---|---|---|
| [Espacial](f0-05-spatial.png) | La oficina y las mesas se reconocen como lugar de trabajo; jerarquía visual clara | Más perspectiva y superficie de escena |
| [Plano cenital](f0-05-plan.png) | Comparación regular de las seis mesas; etiquetas más uniformes | Menos identidad espacial |

Recomendación provisional: vista espacial como entrada de escritorio, botón de plano cenital y lista accesible. La decisión visual final requiere revisión de Juan. Las mesas y objetos usan geometría propia; Three.js 0.186.1 (MIT), Vite 8.3.4, Playwright 1.64.0. DM Sans y Space Grotesk se cargan de Google Fonts (SIL OFL); para producción conviene fijar los archivos y licencias localmente.

## Recorrido comprobado

El script `packages/office-scene/scripts/check-browser.mjs` corrió en Chrome de este Mac con 1440×900 y preferencia de movimiento reducido. Abrió Desarrollo y sus pestañas, conservó el borrador al cambiar de equipo, cambió ambas cámaras, verificó que las seis etiquetas quedan dentro de la escena, usó `Enter` en la lista, abrió Pendientes y Configuración y volvió. Sin errores JavaScript y con WebGL activo. Se detectó y corrigió un defecto de etiquetas fuera de la escena al cambiar cámara. Una prueba adicional con WebGL desactivado y 390×844 verificó que aparece la lista, que el panel abre y que no hay desbordamiento horizontal.

Las corridas observaron 60 FPS en escritorio; la última registró navegación 414 ms y DOM listo 235 ms con servidor local caliente. Son mediciones orientativas de este equipo; no prueban rendimiento móvil ni carga de producción. La compilación termina; Vite advierte un bundle JS de 540.86 kB (135.67 kB gzip), a optimizar al integrar la escena real. `npm audit --omit=dev --audit-level=high` informó cero vulnerabilidades conocidas en dependencias de ejecución.

El panel abre Ahora/Conversación/Resultados y muestra input siempre visible. Configuración, Pendientes y lista funcionan sin interactuar con el canvas. Los datos sintéticos se identifican en pantalla; «Vista previa» conserva el texto local y no envía nada. El prototipo no implementa sesiones, agentes ni estados reales.

Pendiente para cerrar F0-05: revisión visual de Juan y QA, y prueba de rendimiento en el equipo/navegador que se use como piloto definitivo.
