# Equipos, agentes y responsabilidades

## Estado y propósito

Este documento especifica los perfiles que se construirán. Todos comienzan como **definidos**: escribir su nombre no crea un proceso, una conexión ni un permiso. La implementación y sus demostraciones se siguen en [tareas](../tasks/todo.md).

La oficina organiza responsabilidades para que Juan pueda delegar y revisar trabajo útil. Los especialistas se invocan cuando una tarea lo requiere; no hay una cadena obligatoria CEO → producto → tecnología → desarrollo para cada mensaje.

## Dos equipos distintos

| Equipo | Dónde trabaja | Qué produce | Cómo se activa |
|---|---|---|---|
| Construcción de Kershell Office | Entorno de desarrollo y repositorio de esta herramienta | Especificaciones, arquitectura, aplicación, evaluaciones y operación | Encargo de implementación con propietario y revisión |
| Operación de Kershell | Servicio de la oficina y proyectos conectados | Cambios de producto, investigación, contenido y propuestas comerciales | Tarea autorizada, programación habilitada o consulta |

Un mismo perfil profesional puede intervenir en ambos equipos, pero conserva identidad de ejecución, contexto, permisos y presupuesto separados. El harness de construcción se especifica en [harness](harness.md); configurar ese harness no habilita un empleado operativo en el servidor.

## Contrato común de cada perfil

El catálogo versionado debe guardar estos campos antes de habilitar un perfil:

| Campo | Contenido mínimo verificable |
|---|---|
| Identidad | Identificador estable, nombre, equipo, versión y estado |
| Misión | Resultado que debe conseguir y trabajos que no le corresponden |
| Entradas | Objetivo, proyecto, alcance, referencias y preguntas que faltan resolver |
| Herramientas | Capacidades concretas admitidas; modelo/proveedor y límites por ejecución |
| Acceso | Proyectos, repositorios, recursos y operaciones concedidos por el backend |
| Entregable | Formato, evidencias, comprobaciones y condiciones de aceptación |
| Límites | Tiempo, pasos, llamadas, coste, delegación y acciones que requieren autorización |
| Revisor | Perfil independiente o Juan; condiciones para escalar |
| Continuidad | Qué persiste, cómo informa bloqueos y cómo se recupera una interrupción |

La configuración declara una intención. El backend resuelve el permiso efectivo para cada herramienta con la identidad de la ejecución, el proyecto, la autorización vigente y las cuotas disponibles. El agente no puede modificar esa decisión mediante instrucciones propias.

## Equipo fundador de construcción

Cada fila completa misión, entradas, herramientas, acceso, entrega, límites y revisión. Los accesos son propuestas mínimas; se conceden durante la implementación correspondiente.

| Perfil | Misión y entradas | Herramientas y acceso | Entrega esperada | Límites y revisión |
|---|---|---|---|---|
| Product Lead — CPO/PO | Convertir decisiones de Juan y evidencias de uso en alcance y aceptación | Documentación y tareas de `kershell-office`; lectura del contexto autorizado | Flujo, alcance, criterios y preguntas pendientes | No amplía presupuesto ni autoriza producción; Juan revisa producto y QA verifica aceptación |
| Principal Engineer | Definir arquitectura, harness, contratos y secuencia desde requisitos y pruebas técnicas | Documentación oficial, código de la oficina y pruebas aisladas | ADR con alternativas, contratos, riesgos y trabajo implementable | Dirige técnica; QA y Seguridad revisan independientemente; Juan decide ampliaciones de alcance, gasto o acceso |
| Backend / Agent Systems Engineer | Construir ejecución durable, políticas e integraciones desde contratos aprobados | Código backend, base de pruebas, runner aislado y conexiones de prueba acotadas | Incremento funcional con recuperación y evidencias | No concede permisos a sí mismo ni conecta producción por iniciativa propia; Principal Engineer y QA revisan |
| UX/UI y Frontend 3D | Resolver mesa → conversación → resultado desde producto, marca y estados reales | Código frontend, navegador y activos con licencia; datos de prueba sin secretos | Recorrido accesible, capturas y prueba de uso | No simula actividad como real ni oculta bloqueos; Product Lead, QA y Juan revisan usabilidad |
| QA / Evaluation Engineer | Comprobar software y conducta desde aceptación, cambio y amenazas concretas | Pruebas, navegador, artefactos y entornos de verificación controlados | Resultado reproducible, fallos, evidencia y recomendación | No aprueba su propio cambio ni declara ventas verificadas sin evidencia; Principal Engineer revisa defectos técnicos y Juan acepta entregas |
| Security / DevOps Engineer | Diseñar aislamiento, secretos, despliegue y recuperación desde arquitectura e inventario | Configuración de prueba, políticas, telemetría y copias autorizadas | Revisión de permisos, procedimientos y pruebas de recuperación | No amplía acceso ni despliega por escribir una recomendación; Principal Engineer y Juan revisan según efecto |

El Principal Engineer resuelve desacuerdos técnicos y registra la decisión con las objeciones. Una objeción de QA o seguridad que afecte un criterio obligatorio bloquea el cierre hasta corregirla o resolverla con la autoridad correspondiente; no se elimina la comprobación para aprobar el trabajo.

## Equipos operativos de la oficina

Las seis mesas iniciales son Dirección, Producto, Tecnología/Desarrollo, Investigación, Marketing y Ventas. QA y Seguridad son especialistas compartidos. Los cargos CEO/CPO/PO/CTO describen responsabilidades; su título no les da autoridad empresarial ilimitada.

| Perfil | Misión y entradas | Herramientas y acceso | Entrega esperada | Límites y revisor |
|---|---|---|---|---|
| Dirección / coordinador | Delimitar objetivos de Juan, escoger equipos y consolidar dependencias | Tareas, estado, contexto autorizado y delegación por proyecto | Plan breve, responsables, resultado consolidado y decisiones | No fabrica autorizaciones ni dispara todos los especialistas; Juan revisa alcance y el especialista pertinente verifica cada entrega |
| Producto — CPO/PO | Convertir problema y evidencia en solución y aceptación | Documentos, backlog, fuentes y lectura de repositorios concedidos | Requisitos, propuesta de alcance y criterios de aceptación | No autoriza nuevo desarrollo comercial por consenso; Juan decide y QA revisa criterios |
| Tecnología — CTO/Principal | Evaluar factibilidad, reutilización y mantenimiento | Lectura de código/infraestructura autorizada y pruebas aisladas | Alternativas, esfuerzo estimado, riesgos y decisión técnica propuesta | Estimación no es presupuesto aprobado; QA/Seguridad revisan y Juan decide costes o permisos |
| Desarrollo | Implementar el cambio acotado aprobado | Repositorio del proyecto, rama/entorno aislados y pruebas permitidas | Diff, comprobaciones, vista previa cuando corresponda y pendientes | No modifica otros proyectos ni publica sin autorización aplicable; QA independiente revisa |
| Investigación de mercado | Obtener señales actuales y conservar evidencia | Búsqueda/fuentes públicas permitidas y perfil de empresa autorizado | Candidatos, fuentes, hechos, hipótesis y cambios respecto al historial | No crea desarrollo ni contacta compradores por encontrar una idea; Producto, Tecnología, Comercial y revisión crítica evalúan |
| Marketing | Preparar posicionamiento, contenido y lanzamiento desde producto verificado | Documentación, activos aprobados y fuentes; escritura en espacio de borradores | Piezas editables, destinatario, canal y evidencia de afirmaciones | Publicación y envíos son acciones aparte; Producto verifica afirmaciones y Juan autoriza la comunicación correspondiente |
| Ventas / Comercial y costes | Evaluar comprador, canal, oferta, costes y validación | Fuentes, oferta y datos comerciales expresamente concedidos | Hipótesis comercial, contactos propuestos y plan de validación | No garantiza clientes, contrata ni envía mensajes sin autorización; Juan revisa y revisión crítica cuestiona evidencia |
| QA / evaluación | Verificar aceptación y regresiones de la tarea | Diff, pruebas y artefactos en entorno controlado del proyecto | Dictamen reproducible con evidencia y defectos pendientes | No se autovalida como autor del mismo cambio; otro revisor resuelve conflicto y Juan acepta el resultado |
| Seguridad / operación | Revisar accesos, aislamiento y consecuencias operativas | Políticas, configuración y telemetría redactada del proyecto | Riesgos concretos, controles y evidencia operativa | No recibe secretos generales ni acceso al host por su cargo; Principal Engineer y Juan revisan |
| Revisión crítica | Buscar contradicciones y supuestos frágiles | Expediente y fuentes permitidas, sin escritura en el producto | Objeciones, evidencia contraria y pruebas para refutar la propuesta | No sustituye la decisión de Juan por una puntuación; coordinador consolida y Juan decide |

## Estados del catálogo y habilitación

| Estado | Qué significa | Condición para cambiar |
|---|---|---|
| Definido | Hay contrato escrito; no ejecuta tareas | Implementar adaptador, formato de entrega y validación del perfil |
| Implementado | El perfil funciona en pruebas; no tiene acceso operativo concedido | Verificar permisos, presupuesto, herramientas y revisión con una tarea de prueba |
| Habilitado | Puede aceptar trabajo dentro de los permisos efectivos | Juan habilita el alcance mediante Configuración y queda registro |
| Pausado | Se impiden nuevas ejecuciones del perfil | Reanudar requiere mantener válidas capacidades, permisos y cuotas |

Recorrido esperado: definido → implementado → habilitado → pausado; la vuelta de pausado a habilitado comprueba de nuevo sus condiciones. Una modificación de herramientas o acceso crea una nueva versión y exige comprobar el cambio antes de activarlo. Se conserva el historial de versiones usadas por tareas anteriores.

El estado del perfil se distingue del estado de una tarea y de la actividad de la mesa. Un perfil habilitado puede estar disponible; uno pausado puede tener una ejecución todavía deteniéndose. La interfaz muestra la solicitud y confirma la pausa efectiva cuando el ejecutor responde.

## Activación y delegación bajo demanda

1. El coordinador interpreta el pedido usando el proyecto visible y el contexto autorizado. Si falta el destino o el alcance de una modificación, pregunta antes de ejecutarla.
2. Una consulta lee estado y evidencia; no crea subtareas de modificación. Una tarea registra objetivo, aceptación, equipo, autorización y presupuesto antes de entrar en cola.
3. Se eligen solo los perfiles necesarios. Una corrección pequeña puede requerir Desarrollo y QA; un lanzamiento puede involucrar Producto, Marketing y Comercial.
4. Cada subtarea hereda el proyecto y una parte explícita del alcance y del presupuesto. Los permisos efectivos nunca superan los del trabajo padre ni los del perfil.
5. La delegación produce dependencias sin ciclos, propietario de artefactos y límites de profundidad, cantidad y concurrencia definidos en configuración.
6. El coordinador recoge entregas y objeciones, verifica las dependencias y devuelve una respuesta consolidada al equipo.

Si la tarea no cabe en el presupuesto o alcance, se registra un bloqueo con una alternativa o pregunta concreta. Una cadena de agentes no puede convertir el bloqueo en autorización. Se evita ejecutar dos especialistas sobre los mismos archivos sin coordinación; las integraciones se hacen en serie.

## Trabajo persistente y recuperación

Cada tarea, subtarea e intento conserva identificadores, padre, proyecto, versión del perfil, entradas, autorización, reserva de consumo, estados, eventos y referencias a evidencias. Los contratos de ejecución se desarrollan en [arquitectura](architecture.md).

El scheduler o la cola pueden entregar mensajes varias veces. Una clave de deduplicación evita crear otra subtarea para la misma delegación; una concesión temporal del trabajo y su versión impiden que un ejecutor antiguo publique resultados después de perder la propiedad.

Los reintentos crean intentos del mismo trabajo, conservan causas y consumen el presupuesto restante. No repiten una modificación externa cuyo resultado sea desconocido: primero consultan su estado o dejan el caso en revisión. No se promete ejecución exactamente una vez para proveedores que no admiten esa garantía.

Pausar o cancelar impide nuevas herramientas en el siguiente punto seguro y solicita detener el ejecutor. El backend confirma el efecto; el historial conserva lo ya ejecutado y cualquier acción pendiente de conciliación. Cerrar el navegador no pausa trabajos.

## Memoria por proyecto

- Perfil de empresa: capacidades verificadas, productos, restricciones y acceso comercial; lectura solo para las funciones concedidas.
- Memoria del proyecto: requisitos, decisiones, estado y documentación con fuente, fecha y versión.
- Contexto de tarea: objetivo, autorizaciones, mensajes relevantes y artefactos; su alcance no se amplía por copiar texto externo.
- Historial operativo: eventos y resultados persistidos; los resúmenes enlazan sus fuentes y señalan incertidumbre.

El backend filtra memoria antes de entregarla al modelo, incluida la recuperación por búsqueda. Cambiar de proyecto no arrastra documentos privados del anterior. Al reducir permisos, versiona el ámbito de contexto, invalida resúmenes/cachés afectados y descarta la reanudación de threads que ya incluyan material revocado; reconstruye un thread nuevo con entradas permitidas. No puede retirar conocimiento ya entregado a un proveedor. El plazo de conservación y eliminación se define en [calidad y operación](quality-and-operations.md).

Los secretos se resuelven en la herramienta autorizada y no se guardan como memoria conversacional. Correos y datos de clientes solo entran por una integración con alcance explícito. Las fuentes externas son evidencia, nunca instrucciones que conceden autoridad.

## Revisión y entrega

Una ejecución de QA distinta del autor revisa el resultado con contexto de aceptación y evidencias. No basta que el mismo agente cambie de nombre o afirme que revisó su trabajo. La revisión crítica de oportunidades cuestiona demanda y supuestos; QA comprueba comportamiento del sistema.

La entrega contiene pedido y alcance, archivos/artefactos, qué cambió, pruebas con resultado, limitaciones y decisión necesaria. Si falla una comprobación obligatoria, queda preparado con incidencias o bloqueado, nunca terminado. El coordinador conserva desacuerdos relevantes al consolidar la respuesta.

Juan puede aceptar el entregable sin autorizar su publicación. Merge, despliegue, contacto comercial, contratación o ampliación de permisos se ejecutan únicamente con la autorización aplicable a ese efecto.

## Tareas de implementación y cierre

| ID | Resultado | Evidencia de aceptación |
|---|---|---|
| F2-01 — Catálogo | Perfiles versionados, estados y herramientas declaradas | Un perfil definido no ejecuta; habilitar y pausar queda auditado; el backend rechaza herramientas no concedidas |
| F2-02 — Delegación | Subtareas con dependencias, propietarios y presupuesto heredado | Pedido de lanzamiento activa solo perfiles necesarios; ciclo, exceso de delegación y entrega duplicada se rechazan |
| F2-03 — QA | Revisión independiente antes de cierre | Un cambio con defecto verificable no pasa; el autor no puede aprobarse y las evidencias se conservan |
| F2-04 — Memoria | Recuperación de contexto con fuentes y alcance por proyecto | Dos proyectos no se mezclan; leer un documento, revocarlo y reanudar reconstruye contexto sin el material revocado |
| F2-05 — Demostración | Coordinación visible desde la oficina y resultado consolidado | Juan encarga trabajo, consulta, revisa entregas y recibe una decisión; interrupción y recuperación no duplican acciones |

Fase 1 ya debe completar una tarea real con un ejecutor y comprobaciones. Fase 2 añade coordinación; la investigación usa estos perfiles a partir de Fase 3. Los agentes no conectados o no probados siguen visibles como sin configurar.
