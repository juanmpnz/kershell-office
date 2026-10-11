# F0-04 — Aislamiento y autoridad (avance; gate abierto)

Fecha: 2026-10-11. Ensayo local en macOS 27.0.1 con Codex CLI 0.162.1 y una copia temporal de `kershell-office`. QA y Seguridad revisaron el gate por separado y recomendaron mantenerlo abierto.

## Perfil ensayado

Se cargó un perfil de permisos en un `CODEX_HOME` temporal privado y, para el primer run, como capa `-p g0`. `default_permissions = "g0_runner"`, con `:root = "deny"`, `:minimal = "read"`, `:tmpdir = "deny"`, `:slash_tmp = "deny"`, raíz de trabajo `.` con `write` y `network.enabled = false`. No se usó `--sandbox`, que desplazaría `default_permissions`. El segundo run aisló además la configuración personal: el `CODEX_HOME` temporal tenía sólo ese perfil y un enlace local al archivo de autenticación fuera del repositorio, sin copiar su contenido. `codex login status` indicó sesión ChatGPT.

El perfil de proyecto en `.codex/config.toml` no fue suficiente para `codex sandbox -P` desde la copia temporal: la CLI respondió `default_permissions requires a [permissions] table`. El perfil sí cargó al situarlo en `CODEX_HOME` temporal. Por ello **no se considera probada la distribución del perfil mediante la configuración del proyecto**.

La parte de shell se hizo reproducible en [`packages/runtime-spike/probe_sandbox.py`](../../packages/runtime-spike/probe_sandbox.py), que crea un home y credencial **ficticios**. Una corrida pasó sus siete comprobaciones. El intento contra `~/.codex/auth.json` de la tabla fue manual y no forma parte de ese script. Su [perfil versionado](../../packages/runtime-spike/g0.config.toml) añade desactivación de apps, navegador y Computer Use respecto al primer borrador temporal; el script no verifica que esas opciones limiten las herramientas efectivas del modelo. No se presenta esa diferencia como una prueba nueva del runner con modelo.

| Intento desde `codex sandbox -P g0_runner` | Resultado observado |
|---|---|
| Escribir `g0-fixture/status.txt` dentro del checkout | Permitido; contenido `Listo` |
| Leer el canario `../outside-secret.txt` | Código 1, `Operation not permitted` |
| Sobrescribir el canario externo | Código 1, `Operation not permitted`; canario intacto |
| Leer un byte de `~/.codex/auth.json` sin mostrarlo | Código 1, `Operation not permitted` |
| Leer o sobrescribir el canario mediante symlink dentro del checkout | Código 1, `Operation not permitted` |
| Resolver `example.com` | Falló DNS; por sí solo no acredita bloqueo de red |
| Conectar a `127.0.0.1:38941` | Fuera del sandbox el servidor respondió HTTP 200; dentro, `curl` terminó con código 7 y no conectó |
| Conectar a `1.1.1.1:443` | `curl` terminó con código 7 |

Un `codex exec` real bajo el perfil produjo el archivo permitido. Sus registros también muestran el intento de red local rechazado. **No muestran un intento de lectura/escritura del canario por el modelo**, aunque éste dijo haberlo hecho. La denegación del canario está demostrada para el proceso shell con ese perfil, no para todas las capacidades posibles del agente.

## Revisión adversarial y pendientes

- La [documentación de permisos de Codex](https://learn.chatgpt.com/docs/permissions) delimita este perfil a comandos locales. MCP, navegador, conectores y tráfico de servicio tienen controles separados. La configuración personal tenía servidores MCP habilitados; el ensayo con `CODEX_HOME` aislado elimina esa herencia, pero falta probar de forma reproducible la lista efectiva de herramientas y un intento de bypass por otra vía.
- El prototipo de coordinador recibió pruebas y correcciones posteriores: estado/evento transaccionales, exclusividad entre dos procesos preparados, expiración a `unknown` y reloj del coordinador consultado tras adquirir el bloqueo de DB. [F0-03](f0-03-orchestrator-spike.md) registra 5/5 pruebas. No se ha conectado ese coordinador a Codex ni a un gateway ejecutor; la conciliación de un efecto externo real y su autorización siguen sin probar.
- Faltan supervisor con límites de tiempo, memoria, llamadas y salida; revocación efectiva; prueba del gateway desde el runner; dos workers compitiendo; y conciliación de un efecto externo desconocido sin repetición. No se ha elegido aún un motor con un ADR revisado.

**Resultado:** evidencia parcial de aislamiento local. F0-04 y G0 continúan abiertos. No se conectaron proyectos ni servicios productivos.
