# Calidad, seguridad y operación

Propuesta a validar en el piloto. Se aplican controles desde el primer trabajo real; Fase 4 completa la operación sostenida.

## Pruebas proporcionales al riesgo

| Capa | Qué debe probarse | Evidencia |
|---|---|---|
| Dominio | Transiciones, alcance, autorizaciones y reservas de presupuesto | Tests deterministas de reglas y conflictos |
| Persistencia | Claim de tarea, expiración de lease, outbox y deduplicación | Integración sobre PostgreSQL real de prueba |
| Adaptadores | Formatos, capabilities, errores, auth revocada y respuesta desconocida | Contratos contra fixture y spike acotado de proveedor |
| Runner | Checkout exclusivo, red, secretos, interrupción y recursos | Intentos permitidos/denegados desde entorno aislado |
| Oficina | Mesa, conversación, entregas, pendientes y configuración | E2E en navegador, capturas y revisión de Juan |
| Investigación | Fuentes, deduplicación, hipótesis y ausencia de datos | Evaluación de dataset pequeño, no sólo tests de schema |
| Recuperación | Reinicio en fases distintas y restauración | Informe con runIds, efectos y tiempos observados |

Se propone Vitest para dominio/contratos y Playwright para E2E, confirmados en F0 con el stack. Las llamadas reales de IA son secuenciales, acotadas y separadas del CI frecuente. La simulación prueba reglas, pero no acredita que el proveedor real cancela o respeta permisos.

## Escenarios mínimos de gate

1. Consulta de estado no crea ni modifica un trabajo.
2. Tarea de un proyecto no accede a otro checkout, secreto o integración.
3. Agente intenta usar un correo/página como autorización: el sistema lo rechaza.
4. Revocación bloquea nuevas llamadas y se muestra en la mesa; tras leer un documento y retirar acceso, reanudar reconstruye un thread sin contexto revocado.
5. Cancelar no anuncia detención hasta confirmación; se conserva lo ya producido.
6. Dos workers intentan el mismo trabajo: uno reclama y el obsoleto no confirma acciones.
7. Backend reinicia tras una acción externa: no la repite por ausencia de respuesta local.
8. Cambio de destinatario, contenido, proyecto o presupuesto invalida aprobación afectada.
9. Se agota el presupuesto o el proveedor limita uso: se detiene el avance y se informa.
10. Investigación sin oportunidad, con fallo y con oportunidad válida aparecen distintas.
11. Reinicio o cambio de horario de verano no genera dos investigaciones del mismo slot.
12. Pérdida de conexión de UI indica datos antiguos y recupera snapshot/historial.

QA mantiene una matriz requisito → escenario → evidencia. Si falla aislamiento, autorización, cancelación o continuidad del primer trabajo, no se habilita el piloto real.

## Evaluación de agentes

Un conjunto inicial de casos cubre: encargo claro, ambiguo, consulta, cambio de prioridad, falta de contexto, fuente contradictoria y pedido fuera de permisos. Se mide si identifica correctamente la intención, pide sólo lo necesario, entrega evidencia y respeta límites.

La calidad no se mide por cantidad de mensajes ni consenso entre agentes. Un revisor independiente comprueba hechos y resultados. No se requiere guardar razonamiento privado del modelo; se guardan decisiones, fuentes, acciones y evidencias verificables.

## Límites y presupuesto

Antes de ejecución real, Juan define un techo de gasto y acciones permitidas. Un presupuesto sin configurar permite demostraciones con fixtures y consultas locales, y bloquea trabajos facturables. No se inventa un coste de suscripción ni tarifa de modelo.

Admisión con reserva transaccional por tarea/proyecto/equipo y periodo. Se fijan máximo de tiempo, pasos, llamadas de herramienta, salida y concurrencia. La reserva usa una estimación conservadora con tarifas verificadas o unidades del proveedor. Si no puede estimarse un consumo, el conector se mantiene deshabilitado o se autoriza una prueba acotada específica.

El uso observado reconcilia la reserva y queda marcado como estimado o confirmado. Se contabilizan reintentos y subtareas dentro del presupuesto padre. Límite por cuenta/proveedor adicional, botón de parada global y margen de seguridad por latencia de contabilización. Un gasto monetario exacto no se garantiza sólo con telemetría tardía; se combinan cuotas del proveedor cuando existan con límites de trabajo y reservas.

Inicio propuesto: una ejecución activa y pruebas con modelos en serie. El coordinador evita ciclos de delegación con profundidad y número máximo de subtareas. Las revisiones se disparan por necesidad, sin mantener todo el organigrama consumiendo.

Modelo de coste para decidir recursos:

`coste mensual = infraestructura + almacenamiento/copias + consumo IA + búsqueda/herramientas + mantenimiento humano`

`coste de entrega = uso de todas las ejecuciones e intentos + infraestructura atribuible + revisión`

F0 mide una tarea de código y una investigación mínima. Se compara el gasto y la intervención con el mismo trabajo usando Codex directamente; no se fija retorno económico sin observación.

## Observabilidad

Registrar taskId/runId/projectId/actionId, actor, transición, tiempos, resultado, uso y versión de política. Redactar secretos antes de logs y persistencia. Capturas y artefactos pueden contener información sensible y usan acceso autenticado.

Métricas: duración/espera/fallos por tarea, recuperaciones, operaciones denegadas, resultados aceptados, uso estimado/confirmado, coste por entrega e investigación, oportunidades evaluadas/validadas. Mostrar al usuario un resumen comprensible; registros técnicos bajo detalle.

Alertas internas ante runner perdido, fallos recurrentes, tarea bloqueada, cuota próxima al límite y respaldo fallido. El digest comercial sólo destaca novedades útiles, fallo o decisión necesaria. Canales de aviso externos se configuran y autorizan expresamente.

## Despliegue gradual

Primero entorno local/privado de prueba con datos sintéticos. Después servidor privado para un proyecto piloto, acceso autenticado y TLS o red privada. Los ejecutores se separan de los servicios de producción por identidad, red y almacenamiento; preferentemente host/VM específico. Si comparten máquina física, se prueba que el aislamiento y los límites se mantienen.

F0 propone capacidad a partir de CPU/RAM/disco observados y máximos concurrentes. No compra servidor ni migra servicios. Infraestructura como configuración versionada sin secretos, health checks de API/worker/DB, y readiness que comprueba dependencias necesarias.

Despliegues y migraciones tienen backup previo, comprobación de compatibilidad y rollback de aplicación. Una migración incompatible no se revierte automáticamente con pérdida de datos: se prueba restauración o corrección hacia delante. Las actualizaciones del motor externo pasan primero por entorno de prueba y contratos.

## Copias y recuperación

Antes de admitir datos durables reales en el piloto de Fase 1, se ensaya una copia/restauración mínima de DB y artefactos en una instancia vacía. F4-05 amplía ese mecanismo a respaldo completo, retención, restauración integrada y objetivos de recuperación medidos.

Respaldar PostgreSQL, artefactos, configuración, mapas de IDs y archivos persistentes del runtime/motor cuando existan. Secretos y claves de recuperación se almacenan cifrados, con la clave maestra separada de la copia de DB. Un dump SQL aislado no equivale a respaldo completo.

Propuesta inicial para el piloto: backup diario cifrado fuera del host, retención de 7 diarios y 4 semanales, RPO objetivo de 24 h y RTO de 4 h. Son objetivos por confirmar con volumen y presupuesto; la restauración medida es el criterio de aceptación. Sesiones o credenciales cuya copia no sea compatible se reconectan mediante el procedimiento del proveedor.

Restaurar en instancia vacía, comprobar permisos y hashes, reconciliar acciones externas y mantener programación desactivada hasta terminar. Nunca arrancar una copia restaurada que repita envíos o ejecuciones ya realizadas. Hacer simulacro antes de ampliar a varios proyectos.

## Datos y retención

Propuesta piloto: eventos técnicos 30 días, artefactos 90 días y decisiones mientras viva el proyecto, sujetos a revisión de necesidad y almacenamiento. El historial de oportunidades conserva resúmenes y fuentes; no copia sin necesidad correos o documentos completos. Borrado y exportación respetan trazabilidad y permisos.

Verificar dónde procesan datos los proveedores seleccionados. Una ejecución en servidor europeo no implica por sí sola procesamiento europeo del modelo. Los requisitos reales de clientes y contratos se confirman antes de enviar material privado.

## Incidente y parada

Juan puede bloquear nuevas admisiones y detener ejecutores desde Configuración sin depender de una conversación. La acción se confirma con estados reales. Revocar conexiones afectadas, conservar evidencia mínima, reconciliar efectos, recuperar servicios y revisar permisos antes de reactivar. La pantalla debe decir qué se detuvo y qué efecto ya se produjo.
