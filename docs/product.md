# Producto y experiencia de uso

## Objetivo

Juan dirige el trabajo de Kershell desde una oficina 3D que conecta conversaciones, tareas y resultados reales. El éxito se mide por trabajo útil entregado, menos coordinación manual y gasto controlado. La herramienta comienza para uso interno de una empresa; convertirla en SaaS no forma parte de este plan.

## Supuestos de planificación

- Aplicación web en español, escritorio como primera experiencia, operativa desde navegador moderno.
- Juan es el propietario inicial. Un segundo usuario interno puede incorporarse con permisos explícitos; no se presupone acceso de clientes.
- Los agentes ejecutan en servidor aunque la pestaña esté cerrada. La escena visual consume el estado del backend.
- Un proyecto piloto y una ejecución de trabajo simultánea inicialmente. Se amplía después de medir aislamiento, coste y recuperación.
- Repositorios e integraciones se registran por proyecto. El inventario definitivo y la capacidad real se completan en Fase 0.

## Navegación principal

| Destino | Uso |
|---|---|
| Oficina | Mesas, equipos y estado de trabajo |
| Proyectos | Contexto, repositorios, tareas y entregas por producto |
| Pendientes | Preguntas, aprobaciones y oportunidades que necesitan decisión |
| Configuración | Conexiones, equipos, permisos, presupuestos y programación |

Configuración y Pendientes son accesibles con una acción desde cualquier pantalla. La vista de lista permite operar las mismas funciones con teclado, en pantalla pequeña o sin WebGL. La oficina sigue siendo la vista principal en escritorio.

## Oficina 3D

Mesas para Dirección, Producto, Tecnología/Desarrollo, Investigación, Marketing y Ventas. QA y Seguridad aparecen como especialistas al inspeccionar un equipo; una mesa propia sólo se añade si mejora la operación.

Cada mesa muestra nombre, estado y una frase breve: «Desarrollo · Trabajando · Ediflow: corrigiendo filtros». El usuario no necesita controlar un personaje ni recorrer el edificio. Cámara inicial elevada con todas las mesas localizables; zoom y giro opcionales, botón de restablecer vista.

Estilo visual propio de Kershell, limpio y legible, con geometría sencilla y animaciones discretas. F0-05 compara dos bocetos con la marca de la landing y fija la dirección visual. Los activos deben tener licencia documentada; no se copian escenas o assets de referencias.

| Estado visible | Significado |
|---|---|
| Disponible | Equipo habilitado sin trabajo activo ni bloqueo |
| Trabajando | Hay ejecución o revisión activa confirmada |
| Necesita tu respuesta | Existe pregunta o autorización concreta pendiente |
| Bloqueado | Falta recurso, conexión, presupuesto o se perdió el ejecutor |
| Pausado | Equipo o tarea detenidos de forma efectiva |
| Sin configurar | Perfil definido todavía sin capacidades operativas |

No se anima actividad inventada. Si se pierde conexión, se muestra «Sin conexión · última actualización…»; no se convierte el último estado en estado actual. Los estados del equipo se calculan desde sus tareas y prioridades, no desde la opinión del modelo.

## Panel de equipo

Clic en mesa o selección en la lista abre un panel lateral que conserva la oficina:

1. **Ahora:** proyecto, objetivo, paso actual, cola y acciones de pausar/cancelar si corresponden.
2. **Conversación:** una respuesta consolidada del equipo, con input siempre visible y proyecto activo junto al campo.
3. **Resultados e historial:** entregas recientes, comprobaciones, preguntas resueltas y trabajo pendiente; detalle progresivo.

El panel se abre por defecto con el trabajo actual y la conversación accesibles sin cambiar de pantalla. Los registros técnicos, modelos y consumo detallado se consultan en un desplegable. Se conserva el borrador al cambiar de equipo y se advierte si cambia el proyecto destino.

## Comportamiento de los mensajes

| Pedido | Respuesta esperada |
|---|---|
| «¿Cómo va Ediflow?» | Consulta estado persistido y evidencia; no inicia cambios |
| «Revisen y corrijan el formulario» | Crea tarea acotada, muestra objetivo y entra en cola |
| «Preparen el lanzamiento» | Dirección crea subtareas para los equipos necesarios |
| «Pausen esto y prioricen lo otro» | Registra solicitud, confirma detención y reordena después |
| Pedido ambiguo sin proyecto identificable | Hace una pregunta concreta y espera antes de modificar |

La clasificación del mensaje no otorga permisos. El backend valida proyecto, herramientas, presupuesto y alcance antes de aceptar una ejecución. Un mensaje a un equipo ocupado no interrumpe trabajos silenciosamente.

## Entregas y decisiones

Toda entrega responde: qué se pidió, qué cambió, cómo se comprobó, qué falta y qué decisión necesita Juan. Incluye enlaces a diff, documentos, capturas o vista previa según el trabajo. «Preparado para revisión» y «Terminado» son estados distintos; publicar y desplegar son acciones independientes.

Pendientes agrupa preguntas bloqueantes, permisos, entregas por revisar y oportunidades. Cada elemento muestra qué se autoriza y su efecto. Los equipos no necesitan pedir de nuevo una autorización vigente, pero un cambio de contenido, destino, coste o alcance invalida la aprobación afectada.

## Configuración obligatoria

Se ofrecen proveedores de IA/Codex, proyectos y repositorios, servidores, Google Workspace, equipos y capacidades, presupuestos y programación. Cada conexión muestra identidad, alcance, estado, última comprobación y acciones de probar/revocar. El detalle se especifica en [integraciones](integrations.md).

## Dos recorridos de aceptación

**Trabajo delegado:** conectar un proyecto piloto → seleccionar Desarrollo → encargar un cambio acotado → observar estados reales → consultar sin interrumpir → revisar diff y pruebas → aceptar el resultado. Incluye ejecutar con la pestaña cerrada, reconectar y probar cancelación sobre una copia aislada.

**Oportunidad comercial:** activar investigación diaria → recoger fuentes → evaluación por especialistas → ficha comprensible → Juan decide → sólo una aprobación de desarrollo acotada crea una tarea ejecutable. Un día sin candidatos y un fallo de investigación se distinguen.

## Límites del primer MVP

Fase 1 entrega un proyecto, un ejecutor real, una revisión verificable, 3D mínimo y configuración de proveedor/repositorio. Todos los departamentos pueden verse, pero los no habilitados aparecen como tales. Investigación diaria llega en Fase 3; integración completa de Google y operación de varios servidores llega en Fase 4.

Quedan fuera del MVP: CRM completo, contabilidad, contratación automática de servicios, ventas garantizadas, contactos comerciales masivos, producción sin aprobación y migración automática de los seis proyectos. Se pueden proponer como trabajos futuros con alcance propio.

## Criterios de usabilidad propuestos

- En una sesión de prueba, Juan localiza equipo, trabajo actual e historial y envía un pedido sin explicación técnica.
- Las cuatro decisiones de oportunidad, configuración y los pendientes globales se encuentran sin navegar por la escena.
- El panel abre en menos de un segundo con datos ya cargados; objetivo de 30 FPS sostenidos en el equipo piloto, medido en F0-05/F1-14. Si falla, se reduce la escena y se mantiene operativa la lista.
- Navegación por teclado, foco visible, etiquetas accesibles, información que no depende sólo del color y respeto por movimiento reducido. La escena no concentra controles indispensables en el canvas.
