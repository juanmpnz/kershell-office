# Contexto y trazabilidad

Fecha: 2026-10-11. Fuente principal: chat de ChatGPT «Oficina IA viable», identificador `6acb5410-1830-83eb-ba23-adbf458b8906`, y autorización posterior en este chat para escribir el plan en `juanmpnz/kershell-office`.

## Decisiones del usuario

| ID | Requisito | Se concreta en |
|---|---|---|
| R01 | Herramienta interna para organizar el trabajo de Kershell | Producto; F0 y F1 |
| R02 | Oficina 3D con equipos agrupados en mesas | Producto; F0-05, F1-12, F4-06 |
| R03 | Clic en equipo: actividad actual, historial y campo para escribir | Producto; F1-05, F1-11, F1-12 |
| R04 | Interfaz simple, rápida e intuitiva; conversación con el equipo | Producto; F1-12, F1-14 |
| R05 | Equipos conectados a repositorios y capaces de realizar cambios | Arquitectura e integraciones; F1-04, F1-07, F2 |
| R06 | Dirección, producto, tecnología, desarrollo, marketing y ventas | Catálogo de agentes; F0-01, F2-01, F2-05, F4-06 |
| R07 | Harness, skills y arquitectura liderados por Principal Engineer | Harness y agentes; F0-01, F0-06 |
| R08 | Investigación diaria mientras esté activada | Investigación; F3-02, F3-06 |
| R09 | Especialistas evalúan si hay demanda y encaje con capacidades | Investigación; F3-01, F3-03, F3-04 |
| R10 | Juan decide si una oportunidad pasa a desarrollo | Investigación; F3-05 |
| R11 | Configuración obligatoria para APIs, repos y servidores | Integraciones; F1-03, F1-04, F4-01 |
| R12 | Google Workspace, correo de empresa `info@heykershell.com` | Integraciones; F4-02, F4-03, F4-04 |
| R13 | Plan escrito en el repositorio entregado | `tasks/plan.md`, `tasks/todo.md` y documentación enlazada |

## Acuerdos de diseño procedentes del intercambio

El chat evolucionó hacia una oficina que muestra ejecuciones reales, con una respuesta consolidada por equipo. Se conserva el 3D desde la primera entrega funcional y se añade acceso directo a configuración y decisiones pendientes.

Los trabajos nuevos entran en cola cuando un equipo está ocupado. Consultar estado no modifica el producto. Pausar y cancelar tienen confirmación del ejecutor. Las entregas incluyen cambios, comprobaciones y pendientes.

La investigación conserva evidencias e historial, evita duplicados y admite un día sin oportunidades. Presenta cuatro decisiones: descartar, seguir investigando, validar comercialmente y aprobar desarrollo. La aprobación tiene alcance, presupuesto y criterios concretos.

El equipo que construye la herramienta se distingue de los equipos que luego operarán en ella. Los perfiles se activan cuando aportan valor; no se obliga a pasar cada solicitud por todo el organigrama.

Estas son concreciones adoptadas para el plan a partir del intercambio. Las decisiones de bibliotecas, versiones y despliegue siguen el proceso de Fase 0.

## Propuestas abiertas

- Paperclip se evalúa como base de coordinación; no fue instalado ni validado en el chat.
- TenacitOS y OfficeClaw son referencias mencionadas para la experiencia visual. No se heredan sus motores ni sus garantías.
- Se verifica la integración concreta de Codex y su autenticación antes de prometer cobertura por una suscripción.
- El inventario exacto de servidores, repositorios, seis proyectos y recursos disponibles sigue pendiente.
- La cuenta `info@heykershell.com` puede ser buzón, alias o grupo; hay que comprobarlo antes de diseñar su acceso efectivo.

## Contexto empresarial

Las instrucciones del proyecto buscan reducir costes y ordenar servicios hoy repartidos entre Vercel, Supabase, Railway y almacenamiento de AWS, y desarrollar estrategias de venta. La oficina debe ayudar a ese objetivo; migrar los seis productos es otro programa de trabajo, que se podrá dirigir desde ella una vez autorizados los cambios.

El chat menciona Ediflow, Operational 3D, Futscan y Kershell Tools. Son entradas iniciales pendientes de inventario y estado verificado. No se supone que sean el catálogo completo ni que estén listos para vender.

La [landing de Kershell](https://www.heykershell.com/en), consultada el 2026-10-11, describe servicios de SaaS, IA aplicada, automatización y arquitectura. Sirve como referencia de marca. Su portfolio muestra nombres que requieren conciliación con el catálogo interno; el plan no ordena modificar la landing ni sustituir productos.

## Cobertura de la fuente

La lectura mediante la herramienta de chats devuelve cinco intercambios recientes, desde «vuelve a replantearte lo que me ofreciste» hasta la solicitud de plan y configuración; indica que no hay más páginas. Una revisión independiente obtuvo la misma cobertura. La vía de interfaz no permitió ampliar la lectura por restricciones de acceso, y no había fuentes sincronizadas adicionales en este proyecto. No se afirma haber recuperado los mensajes iniciales ni el post externo mencionado. Los requisitos expresados en los cinco intercambios y las propuestas técnicas abiertas quedan identificados arriba; si aparece contexto previo adicional, se contrasta y actualiza el plan antes de cambiar alcance.
