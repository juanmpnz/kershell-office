# F0-02 — Runtime Codex (avance)

Fecha: 2026-10-11. El repositorio piloto elegido por Juan es `kershell-office`; no se hicieron escrituras de modelo sobre él.

## Verificado

- `codex --version`: 0.162.1.
- `codex login status` indicó sesión ChatGPT. `codex doctor --json` confirmó almacenamiento local de tokens ChatGPT y ausencia de API key. No se abrió ni copió el archivo de autenticación.
- Tres invocaciones `codex exec` con modelo `gpt-6-luna`, sandbox `read-only`, esfuerzo bajo y tiempo máximo de 150 segundos terminaron con exit 0. Produjeron respuestas de texto y JSONL con uso en tokens. Ninguna produjo cambios de archivos ni hizo una tarea de código.
- La skill fue consultada y el caso fuera de ámbito (publicar el sitio) se rechazó en el texto. Eso verifica comportamiento del ensayo, no una barrera de ejecución.

## No probado / siguiente ensayo

- Capacidad real de crear un subagente con el perfil del proyecto: no aparece evento de spawn en los JSONL. En la tercera invocación se observó `wait` sin destinatarios.
- Una tarea de código sobre copia aislada de `kershell-office`, artefacto, cancelación/interrupción, reinicio y reanudación.
- Uso de la sesión ChatGPT por un servicio privado de larga duración, renovación de auth, coste en euros y controles de gasto efectivos. La CLI ofrece tokens, no una cifra facturada.

El límite autorizado para pruebas de IA es **5 €**. El gasto monetario observado figura como **desconocido**; se detuvieron las llamadas después de tres invocaciones para no extrapolar un precio de API a esta cuenta. La credencial seguirá fuera del repositorio público. El próximo ensayo debe usar una modalidad con medición y corte de coste aplicables y una copia aislada del repo piloto.
