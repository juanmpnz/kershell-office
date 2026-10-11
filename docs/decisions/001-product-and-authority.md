# ADR-001 — Oficina interna 3D y autoridad de trabajo

Estado: base de producto derivada del chat; concreciones de UX propuestas para revisión.
Fecha: 2026-10-11.

## Contexto

Juan quiere dirigir equipos de agentes y proyectos de Kershell desde una oficina simple. Pide mesas 3D, actividad actual, historial y conversación con el equipo. También investigación de mercado diaria activable, evaluación especializada y su OK antes de desarrollar una oportunidad.

## Decisión

La experiencia principal es mesa → conversación → trabajo visible → resultado revisable. La aplicación comienza como herramienta interna, con proyectos y herramientas autorizados. Actividad y estados proceden de ejecuciones persistentes. Configuración y Pendientes tienen acceso directo fuera de la navegación espacial.

Se distinguen agentes constructores de la aplicación y equipos operativos dentro de ella. El organigrama expresa responsabilidades; el coordinador activa sólo los especialistas necesarios. Principal Engineer lidera las decisiones técnicas y QA/Seguridad revisan sus controles.

Juan conserva autoridad para aprobar desarrollo de oportunidades y para acciones externas según la política acordada. Una aprobación define alcance y presupuesto; no habilita nuevas acciones ilimitadas. Consultar un estado no modifica código.

## Alternativas consideradas

- Tablero convencional como interfaz principal: no satisface la oficina 3D solicitada. Se conserva como vista accesible equivalente.
- Oficina sólo visual con estados simulados: no permite delegación ni supervisión real.
- Organigrama completo obligatorio para cada tarea: aumenta coordinación y consumo sin beneficio demostrado.
- SaaS comercial desde el comienzo: agrega cuentas de clientes y operación que no forman parte del objetivo inicial.

## Consecuencias

Se construye un primer recorrido completo con 3D mínimo antes de ampliar departamentos. Las pruebas verifican conducta del sistema, no sólo renderizado. El MVP debe ser más útil para Juan que un conjunto de conversaciones y una escena decorativa; se compara con una tarea equivalente en Codex.

Referencias: [contexto](../context.md), [producto](../product.md), [plan](../../tasks/plan.md).
