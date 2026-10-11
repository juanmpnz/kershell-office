# ADR-002 — Selección del motor y del runtime

Estado: propuesto. Se resuelve en F0-06 con informes de F0-02/F0-03/F0-04.
Fecha: 2026-10-11.

## Contexto

La oficina requiere persistencia, presupuestos, herramientas, tareas, aprobaciones y recuperación. Paperclip fue sugerido como candidato. Codex dispone de distintas formas de integración, y autenticación ChatGPT y API no implican el mismo consumo. La aplicación debe funcionar en infraestructura privada sin depender de esta pestaña.

## Propuesta

Comparar una fachada propia sobre Paperclip con un coordinador mínimo propio, usando los mismos escenarios. Priorizar reutilización si cumple los controles mediante una adaptación pequeña y versiones fijadas, sin un fork amplio del core.

Usar fronteras `OrchestratorAdapter` y `AgentRuntimeAdapter`; una implementación activa de cada una. Si Paperclip se adopta, conserva autoridad de sus tareas/runs; Kershell construye la experiencia y los dominios que faltan. Si no encaja, documentar el coste adicional de mantener cola, scheduler y recuperación propios.

Para el runner, evaluar App Server con stdio y SDK según soporte efectivo de historial, eventos, aprobación, interrupción y reanudación. El backend expone un contrato propio autenticado a la web. El transporte WebSocket experimental del runtime no se publica directamente.

Autenticación: API key es una opción explícita de pago por uso; login ChatGPT privado se evalúa sólo con condiciones compatibles, renovación y límites probados. No asumir que estar en Work ni asignar muchos roles produce capacidad o cuotas adicionales. Si se usa una copia de sesión ChatGPT, comprobar la serialización exigida por el modo de autenticación documentado. La guía de auth de cuenta en CI excluye repositorios públicos/open source; el repo actual es público y no se habilita allí ese patrón. Una prueba privada compatible o API son las vías por evaluar.

Agents API gestionada se mantiene como alternativa a evaluar si reduce mantenimiento y cumple requisitos de datos/coste; su existencia no resuelve automáticamente la coordinación empresarial. Agents API y Agents SDK son productos distintos.

## Criterios de elección

| Criterio | Evidencia requerida |
|---|---|
| Flujo completo | Pedido real, cambio aislado, artefacto y revisión |
| Controles | Aprobación efectiva, cancelación confirmada y acceso denegado |
| Continuidad | Reinicio, consulta de estado y recuperación sin duplicados |
| Producto | API suficiente para conversación, cola y estado de mesas |
| Coste | Recursos medidos, uso observado y esfuerzo de integración |
| Mantenimiento | Licencia, versiones, migraciones y tamaño del adaptador |
| Datos/auth | Ubicación de procesamiento, modalidad de cuenta y renovación compatibles |

La evaluación registra pasa/falla/no probado. Un fallo de seguridad o autoridad impide habilitar trabajo real; no se compensa con una puntuación visual o un menor coste. Un punto sin cuenta/infraestructura se declara pendiente, sin fingir aceptación.

## Consecuencias y límite del spike

F0 dedica un máximo orientativo de una jornada a la comparación inicial del motor, además de las pruebas del runner. Si faltan capacidades, registrar el obstáculo y decidir con Juan el alcance de una prueba adicional; no construir dos plataformas completas para compararlas.

No hay decisión definitiva de motor en esta entrega documental. Las [fuentes técnicas](../sources.md) distinguen funciones documentadas de pruebas aún pendientes. El adaptador actual de Paperclip requiere revisar lane, sandbox y aprobaciones; sus defaults no se consideran controles de Kershell.
