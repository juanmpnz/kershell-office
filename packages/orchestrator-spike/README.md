# Coordinador mínimo de ensayo (F0-03)

Prueba de contrato para comparar con Paperclip. Usa `node:sqlite` en Node 24 y una base temporal. La suite ejercita aprobación, exclusividad entre dos procesos, reinicio con estado persistido, rechazo de un worker obsoleto y un efecto externo **simulado** de resultado desconocido. Un lease vencido queda en `unknown` hasta una conciliación explícita; estado y evento se confirman juntos.

```sh
node --test coordinator.test.mjs
```

No incluye API, autenticación, presupuesto, aislamiento de proceso, intención de efecto durable previa al gateway ni integración con Codex. La conciliación del fixture no verifica resultado remoto ni autoridad de quien la solicita. Estos faltantes son parte del coste de construir y mantener el motor propio; el prototipo no acredita F0-04 ni cierra G0.
