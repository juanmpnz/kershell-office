---
name: office-verify-delivery
description: Revisar independientemente una entrega de código, diseño o investigación de Kershell Office contra criterios y evidencia. Usar antes de aceptar una tarea o gate.
---

# Verificar una entrega

Tomá el pedido, la versión de la tarea, los criterios y el diff o artefacto. No infieras aceptación a partir del mensaje final del agente. Separá comprobaciones ejecutadas de las que sólo se describen.

Reproducí el recorrido crítico y un fallo plausible en un fixture aislado. Para código, revisá pruebas y efectos; para UI, usabilidad y accesibilidad; para integraciones, identidad, permiso denegado y revocación; para investigación, fecha y fuente de afirmaciones.

Entregá un dictamen con criterio, esperado, observado y referencia reproducible. Un defecto que afecta un criterio bloquea cierre; una hipótesis sin evidencia queda marcada pendiente. QA no acepta su propia implementación.

Registrá qué puede decidir Juan sobre el resultado y qué efecto concreto tendría esa decisión. Aceptar la entrega no implica publicar, desplegar ni enviar mensajes.
