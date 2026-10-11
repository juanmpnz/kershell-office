# F0-01 — Harness constructor (avance)

Fecha: 2026-10-11. Responsable de edición: Principal Engineer. Revisión independiente: pendiente.

## Entregado

- `.codex/config.toml` limita a dos los hilos simultáneos de subagentes en una sesión.
- Seis perfiles en `.codex/agents/` separan producto, arquitectura, agentes, 3D, QA y seguridad. Cada archivo incluye `name`, `description` y `developer_instructions` conforme al esquema documentado de Codex.
- Seis skills en `.agents/skills/` contienen disparador, entradas/referencias, procedimiento, salida y condición de parada. Su texto niega autoridad implícita sobre presupuesto, conexiones y publicación.

## Comprobaciones

| Comprobación | Resultado |
|---|---|
| Sintaxis TOML con `python3 -m tomllib` y campos requeridos | Pasa, 7 archivos |
| `quick_validate.py` del creador de skills con PyYAML temporal (`uv run --no-project --with pyyaml`) | Pasa, 6 skills |
| `codex doctor --json`, versión 0.162.1 | Carga de configuración general: `ok`; auth local ChatGPT detectada; no se leyó ni copió el token. No acredita por sí sola la configuración del proyecto |
| Invocación de skill y caso fuera de ámbito | Pasa parcialmente: la CLI leyó `office-plan-task` y rechazó que el fixture autorizase publicar |
| Carga efectiva de perfil como subagente | No probado: la CLI leyó `product_lead.toml`, pero no registró un spawn; la última prueba registró `wait` sin agente destinatario |

Se hicieron tres invocaciones `codex exec` en modo `read-only`, con `gpt-6-luna` y esfuerzo bajo, después de que Juan autorizara un máximo de 5 € para pruebas de IA. La primera respuesta confundió el nombre de archivo con el nombre del agente; se renombraron los TOML para coincidir con su campo `name`. La [documentación oficial](https://learn.chatgpt.com/docs/agent-configuration/subagents) aclara que manda el campo `name` y que la coincidencia de archivo es una convención. La segunda invocación leyó perfil y skill; la tercera intentó delegar, pero su JSONL sólo mostró una llamada `wait` con `receiver_thread_ids: []`. Ninguna prueba acredita carga efectiva del perfil como sesión hija.

La CLI informó 207 407 tokens de entrada, 166 656 de ellos en caché, y 1 339 de salida en conjunto. No informó euros facturados. En ese momento se detuvieron más llamadas para evitar exceder un techo monetario que esta modalidad de autenticación no permite verificar desde la CLI. F0-01 queda abierto hasta una invocación real de subagente y revisión QA/Seguridad. La cuenta de la app local no se toma como autorización para consumo en un servidor.

En un ensayo adicional del 2026-10-11, con `gpt-6.1-sol` y una copia aislada, se pidió invocar los perfiles de QA y Seguridad. El JSONL volvió a registrar sólo `collab wait` con `receiver_thread_ids: []`; **no hubo spawn verificable**. La respuesta atribuyó resultados a subagentes sin evidencia de ejecución, por lo que no se acepta. Uso informado de ese turno: 103 787 tokens de entrada (95 232 en caché) y 391 de salida. QA y Seguridad sí revisaron G0 mediante sesiones independientes de esta tarea, pero esas sesiones no cargaron los perfiles TOML del proyecto y no cierran F0-01.

Se repitió una vez con `--enable multi_agent_v2`, un solo perfil (`qa_evaluation`) y una instrucción explícita de informar fallo si spawn no estuviera disponible. El JSONL registró de nuevo sólo `wait` con destinatarios vacíos, mientras el texto final afirmó falsamente que el subagente había confirmado el archivo. Uso informado: 63 431 tokens de entrada (55 680 en caché) y 176 de salida. Se detuvieron los reintentos: este cliente/recorrido no ha demostrado invocación efectiva y requiere diagnóstico antes de nuevas llamadas.

Los eventos de colaboración y el uso de estos dos reintentos están resumidos sin contenido de credenciales en [`f0-01-subagent-events.json`](f0-01-subagent-events.json).

Fuentes: [subagentes](https://learn.chatgpt.com/docs/agent-configuration/subagents), [skills](https://learn.chatgpt.com/docs/build-skills), [configuración avanzada](https://learn.chatgpt.com/docs/config-file/config-advanced).
