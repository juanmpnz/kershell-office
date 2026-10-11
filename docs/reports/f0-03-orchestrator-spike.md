# F0-03 — Comparación inicial de motor (avance)

Fecha: 2026-10-11. No es decisión ADR ni prueba de un agente real. Responsable: Principal Engineer. Revisión QA/Seguridad: pendiente.

## Mismo escenario de ensayo

Crear tarea de ejemplo, conservarla tras reiniciar, exigir aprobación, reclamar en exclusividad y evitar repetir una acción externa de resultado incierto. Sin proveedor de IA ni recursos de Kershell.

| Criterio | Paperclip 2026.1005.0 | Coordinador mínimo del repositorio |
|---|---|---|
| Arranque y persistencia | Pasa: instancia en `/tmp/kershell-f0-paperclip-data`, PostgreSQL embebido; `KER-1` seguía en `backlog` tras reinicio | Pasa en fixture con SQLite y dos instancias |
| API y tarea | Pasa: `/api/health` respondió `ok`; CLI creó compañía y tarea | No aplica: prototipo sin API |
| Aprobación | CLI ofrece tipos de aprobación; flujo de aprobación de tarea de Kershell no probado | Pasa en test de aprobación previa a reclamar |
| Reclamación exclusiva y worker obsoleto | No probado con ejecución real | Pasa en fixture con dos procesos reclamando la misma tarea; lease vencido queda en `unknown` y dueño obsoleto no confirma, sin runner de IA |
| Efecto externo incierto | No probado | Pasa en test: estado `unknown` no se reclama sin conciliación explícita |
| Aislamiento de red | Servicio ligado a `127.0.0.1:3100`; `Host: outside.example` recibió HTTP 403 | No implementado |
| Cancelación, eventos y recuperación de agente | No probado | Eventos de estado mínimos probados; cancelación y agente no implementados |

La prueba de Paperclip se hizo con Node 24.21.0 porque exige Node >=24.11; el Node predeterminado del equipo era 24.1.0. Se instaló el paquete en `/tmp`, sin servicio permanente ni modelo. `npm` informó 386 paquetes y aproximadamente 1.4 GB de dependencias en disco; los datos temporales ocuparon 81 MB en esta medición. Son datos del equipo piloto, no presupuesto de servidor.

**Hallazgo a investigar:** en dos cierres con SIGINT el log registró `graceful heartbeat run drain failed` por error de consulta a PostgreSQL mientras la base embebida se cerraba. La tarea persistió al reiniciar, pero esta prueba no cubre runs activos. No se considera recuperación validada.

La [documentación actual del adaptador Codex de Paperclip](https://docs.paperclip.ing/reference/adapters/codex/) confirma que puede tomar el login ChatGPT del host en un home gestionado, pero indica que su vía CLI añade `--dangerously-bypass-approvals-and-sandbox` **por defecto** si no se configura lo contrario. Para cualquier ensayo posterior habría que fijar `dangerouslyBypassApprovalsAndSandbox: false`, elegir explícitamente el engine y demostrar la política efectiva. El engine ACP usa otro comportamiento de sandbox y permisos que tampoco se probó aquí. Este hallazgo impide tratar los defaults del adaptador como aislamiento de Kershell.

El coordinador propio demuestra algunos invariantes en un fixture pequeño; aún carece de API, autenticación, presupuesto, aislamiento, scheduler y recuperación completa. Implementarlos elevaría el mantenimiento. Paperclip ya expone bastante superficie, pero habría que adaptar autoridad, permisos y aprobación para Kershell. **Propuesta provisional:** seguir evaluando Paperclip como motor candidato y reservar la decisión para F0-06 después del runner y F0-04.

Revisión de fallo inducido posterior: QA encontró que varias transiciones cambiaban estado y emitían evento en operaciones separadas. Una prueba nueva reprodujo el defecto (`completed` persistía si fallaba el insert del evento); se corrigió envolviendo estado y evento en una transacción. Un segundo test prepara dos procesos y les envía la orden de claim tras la barrera de preparación; uno obtiene el lease y aparece un solo evento `claimed`. La prueba demuestra exclusividad entre procesos, sin medir solapamiento exacto de las transacciones.

Seguridad detectó que la expiración reencolaba automáticamente trabajo que podía haber causado un efecto externo, y que el worker aportaba su propia hora para validar el lease. Una prueba reprodujo la confirmación con hora antigua. El coordinador ahora usa su reloj propio, mueve leases vencidos a `unknown` y exige conciliación explícita antes de otra reclamación. La conciliación conserva `effect_key`. QA y Seguridad detectaron además que tomar la hora antes de esperar el bloqueo SQLite permitía confirmar un lease ya vencido: otra prueba reprodujo el fallo reteniendo el bloqueo en un proceso hijo. Ahora el reloj se consulta dentro de la transacción. `node --test packages/orchestrator-spike/coordinator.test.mjs`: **5/5 pasan**. Falta registrar intención/identificador del efecto antes de invocar un gateway, comprobar el resultado remoto y autorizar/atribuir la decisión de reintento. Sigue siendo un fixture SQLite sin agente ni gateway; no acredita el recorrido completo ni una elección de motor.

Fuentes: [repositorio Paperclip](https://github.com/paperclipai/paperclip), [instalación](https://docs.paperclip.ing/reference/cli/installation/), [base de datos](https://docs.paperclip.ing/reference/deploy/database/). Código examinado en commit `de9ab8e7e066b865908389633e5a2b5c3024651f`; paquete npm `paperclipai@2026.1005.0`. La licencia del repositorio es MIT.
