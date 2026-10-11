# Coordinador mínimo de ensayo (F0-03)

Prueba de contrato para comparar con Paperclip. Usa `node:sqlite` en Node 24 y una base temporal. La suite ejercita aprobación, reclamación exclusiva, reinicio con estado persistido, rechazo de un worker obsoleto y efecto externo de resultado desconocido. Ese efecto queda inmóvil hasta una conciliación explícita.

```sh
node --test coordinator.test.mjs
```

No incluye API, autenticación, presupuesto, aislamiento de proceso ni integración con Codex. Estos faltantes son parte del coste de construir y mantener el motor propio; el prototipo no acredita F0-04 ni cierra G0.
