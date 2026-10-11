# F0-02 — Runtime Codex (avance)

Fecha: 2026-10-11. El repositorio piloto elegido por Juan es `kershell-office`; no se hicieron escrituras de modelo sobre él.

## Verificado

- `codex --version`: 0.162.1.
- `codex login status` indicó sesión ChatGPT. `codex doctor --json` confirmó almacenamiento local de tokens ChatGPT y ausencia de API key. No se abrió ni copió el archivo de autenticación.
- Tres invocaciones `codex exec` con modelo `gpt-6-luna`, sandbox `read-only`, esfuerzo bajo y tiempo máximo de 150 segundos terminaron con exit 0. Produjeron respuestas de texto y JSONL con uso en tokens. Ninguna produjo cambios de archivos ni hizo una tarea de código.
- La skill fue consultada y el caso fuera de ámbito (publicar el sitio) se rechazó en el texto. Eso verifica comportamiento del ensayo, no una barrera de ejecución.
- Ensayo posterior con `gpt-6.1-sol` y una copia temporal de `kershell-office`: Codex cambió `g0-fixture/status.txt` de `Pendiente` a `Listo` mediante una herramienta de shell. El evento `command_execution` terminó con código 0, el archivo contiene `Listo` y su SHA-256 es `56c9e1e91283ba0559ce310d63f83a0e1554cbcdc105e100b4f51be0c03d069c`. Uso informado por ese turno: 109 251 tokens de entrada (86 144 en caché) y 494 de salida.
- Se inició otra sesión (`01a12a9d-86d9-74b1-a2cf-4aa0a19f7faa`), se envió SIGINT durante el comando `sleep 30` y `g0-fixture/interrupt.txt` permaneció en `Pendiente`. `codex exec resume` con ese mismo ID retomó el contexto, cambió el archivo a `Listo` y lo verificó; el turno reanudado informó 135 853 tokens de entrada (111 232 en caché) y 540 de salida. El turno interrumpido no emitió cifra final de uso. Esto prueba continuidad de una sesión CLI local, no recuperación automática de un worker de servicio.
- La cuenta siguió autenticada con ChatGPT; el límite semanal observado pasó de 12 % a 13 % de uso. La cuenta no tenía créditos adicionales cargados ni API key. La CLI no proporcionó euros facturados; el gasto monetario exacto sigue desconocido. No se utilizó el crédito gratuito de reinicio de límite.

Los eventos de comando, IDs de sesión y cifras de uso se conservaron sin contenido de credenciales en [`f0-02-runtime-events.json`](f0-02-runtime-events.json). La copia de trabajo y los logs completos fueron temporales.

## No probado / siguiente ensayo

- Capacidad real de crear un subagente con el perfil del proyecto: no aparece evento de spawn en los JSONL. En la tercera invocación se observó `wait` sin destinatarios.
- Recuperación tras reinicio de un worker persistente y política de recursos aplicada al proceso completo. La prueba de CLI cubre interrupción/reanudación manual y artefacto local.
- Uso de la sesión ChatGPT por un servicio privado de larga duración, renovación de auth, coste en euros y controles de gasto efectivos. La CLI ofrece tokens, no una cifra facturada.

## Cautela de evidencia

En dos turnos el modelo afirmó que los comandos de lectura/escritura externa habían fallado, pero el JSONL **no contiene esos comandos**; sólo apareció el intento de red. Sus respuestas no se cuentan como prueba de denegación. Los intentos directos con el mismo perfil de shell están en [F0-04](f0-04-isolation-spike.md), con el límite de que no prueban todas las rutas del ejecutor. La cuenta no debe interpretarse como autorización para un servidor o un presupuesto de piloto.

El límite autorizado para pruebas de IA es **5 €**. El gasto monetario observado figura como **desconocido**: estas llamadas consumieron cuota incluida de ChatGPT, sin créditos adicionales disponibles; no se extrapola precio de API. La credencial permaneció fuera del repositorio público. Para el piloto hace falta una modalidad con medición y corte de coste aplicables.
