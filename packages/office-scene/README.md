# Boceto de oficina 3D (F0-05)

Prototipo aislado con datos sintéticos. No se conecta a Codex, proyectos ni servicios de Kershell. El input conserva un borrador local durante la sesión, pero no envía mensajes.

```sh
npm ci
npm run dev
npm run build
npm run check:browser
```

`check:browser` usa Google Chrome instalado en el equipo y `OFFICE_URL` si Vite no está en el puerto 5173. Genera las dos capturas del informe en `docs/reports/`.

Las mesas se construyen con geometría propia en Three.js (licencia MIT). La tipografía DM Sans y Space Grotesk se sirve desde Google Fonts y tiene licencia SIL Open Font License; si se incorpora al producto se deben fijar fuentes y licencias localmente. El prototipo es una evaluación visual, no el frontend definitivo.
