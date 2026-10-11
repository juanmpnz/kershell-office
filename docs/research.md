# Investigación diaria y oportunidades

## Propósito y estado

El proceso busca problemas con compradores posibles y encaje con Kershell. Su resultado ayuda a Juan a decidir qué vender, adaptar o construir. Este documento planifica la funcionalidad de Fase 3: **no crea un cron ni activa búsquedas reales**.

La preferencia inicial propuesta es vender productos existentes, encontrar adaptaciones vendibles y desarrollar algo nuevo cuando la evidencia lo justifique. No impide explorar otro sector. El éxito se mide por oportunidades útiles, validaciones y ventas posteriores, con su coste, no por cantidad de informes.

## Perfil operativo de Kershell — F3-01

Antes de habilitar investigación, Producto prepara un perfil versionado y Juan valida sus datos esenciales:

| Área | Datos necesarios | Tratamiento de lo desconocido |
|---|---|---|
| Capacidades | Tecnologías, servicios, componentes reutilizables y experiencia sectorial | Marcar pendiente; no afirmar capacidad por el nombre de un servicio |
| Productos | Propósito, estado real, repositorio, usuarios, oferta y mantenimiento | Verificar inventario y distinguir demo, producto operativo y vendible |
| Capacidad disponible | Tiempo, equipo, costes, presupuesto y soporte asumible | Estimar con rango y responsable; no prometer fechas sin alcance |
| Infraestructura | Recursos autorizados y límites de operación | Usar referencias; guardar inventario privado en el sistema autorizado |
| Acceso a compradores | Sectores conocidos, canales y relaciones utilizables | Separar contacto posible de permiso para contactarlo |
| Restricciones | Ámbitos excluidos, presupuesto, idiomas, países y obligaciones conocidas | Consultar dudas que afecten elegibilidad o viabilidad |

Ediflow, Operational 3D, Futscan y Kershell Tools son las **cuatro referencias citadas en el chat**, pendientes de verificar. Las instrucciones empresariales hablan de seis proyectos; completar ese inventario es una tarea pendiente. No se inventan dos productos para cerrar la cifra.

Cada investigación guarda la versión del perfil utilizada. Un cambio de capacidades puede motivar reevaluar candidatos, pero no reabre automáticamente oportunidades descartadas sin una razón nueva.

## Configuración y programación — F3-02

Configuración ofrece activación/pausa, horario diario, zona horaria, sectores y fuentes permitidos, cuotas, responsable y política de recuperación. Zona inicial: `Europe/Madrid`; las fechas visibles siguen esa zona y se guardan también instantes UTC para auditoría.

El trabajo corre en servidor con cola y persistencia, independiente de la escena 3D y de que el navegador esté abierto. Activar muestra la siguiente ejecución prevista. Pausar impide nuevos slots y permite elegir solicitar parada del activo; solo se muestra detenido cuando el ejecutor confirma el efecto.

Un **slot diario** identifica una fecha local de investigación para una empresa y perfil. La base de datos impone unicidad sobre esa identidad; cambiar el horario o reiniciar el scheduler no genera un segundo trabajo programado para la misma fecha.

La política propuesta para cambios de hora es ejecutar una sola vez por fecha: si la hora local no existe, usar el primer instante válido posterior; si se repite, usar su primera aparición. La siguiente fecha se calcula en la zona configurada, no sumando siempre 24 horas UTC. Se prueba explícitamente el horario de verano de Madrid.

Tras una caída, se permite como máximo recuperar el último slot vencido dentro de una ventana configurada; los anteriores se registran como omitidos. No se dispara una cola de todos los días perdidos. Si se pausó voluntariamente, no se recuperan esos días al reactivar salvo pedido explícito.

**Ejecutar ahora** crea una ejecución manual con identidad propia, sin activar el programa ni consumir silenciosamente el slot diario. La interfaz informa si ya hay una investigación activa y ofrece consultar esa ejecución o encolar la manual. Si Juan elige ejecutar el pendiente de hoy, se reutiliza su slot e identidad en lugar de crear otro programado.

Cambiar la zona horaria, si se permite después, requiere mostrar cómo afecta a los slots futuros y conservar la identidad de los ya registrados. La configuración inicial solo necesita Madrid; otras zonas no amplían el MVP.

## Fuentes y evidencia — F3-03

La búsqueda usa información actual y fuentes permitidas, preferentemente solicitudes de compradores, licitaciones relevantes, comunidades profesionales, procesos documentados y datos primarios. Noticias, tendencias o tamaño de mercado pueden orientar una búsqueda; no prueban por sí solos demanda de compra.

| Registro de fuente | Contenido requerido |
|---|---|
| Identidad | URL original y canónica, título, autor/entidad y tipo de fuente |
| Tiempo | Publicación o fecha del hecho si consta, fecha de acceso y última revisión |
| Evidencia | Extracto breve o referencia a la sección pertinente y afirmación que respalda |
| Contexto | Segmento, territorio, idioma y condiciones que limitan la afirmación |
| Calidad | Fuente primaria/secundaria, accesibilidad, relación con otras fuentes y posibles sesgos |
| Vigencia | Actual, pendiente de verificar, desactualizada o inaccesible; motivo registrado |

Una fecha desconocida se registra como desconocida. El modelo no inventa cifras, precios, citas ni compradores. Se respeta acceso y condiciones de las fuentes; no se eluden inicios de sesión ni se guardan artículos completos por defecto.

En cada ficha se separan **hechos con fuente**, **estimaciones**, **hipótesis** y **preguntas pendientes**. Evidencia comercial fuerte puede ser una necesidad explícita de un comprador identificado con contexto o una validación autorizada; un comentario aislado sigue siendo una señal, no una venta.

La repetición de una noticia en diez sitios no cuenta como diez señales independientes. Se conserva origen, organización y evento cuando pueda establecerse, con incertidumbre si la independencia es desconocida.

## Historial, deduplicación y filtro

Se guardan candidatos, fuentes, evaluaciones, decisiones de Juan y motivos de descarte. La búsqueda de duplicados combina URL canónica, evento/origen y una huella del problema, segmento y solución. Coincidencias dudosas se proponen para fusionar; no se borran silenciosamente oportunidades distintas.

Una nueva señal puede enriquecer una ficha existente. El resumen diario indica qué cambió respecto a la evaluación anterior. Un descarte conserva el motivo y solo vuelve a Pendientes si aparece un cambio material explicado.

El filtro inicial pregunta: ¿hay un problema concreto?, ¿se identifica quién lo sufre o compra?, ¿existe evidencia actual?, ¿podemos vender algo existente o adaptar?, ¿cabe en la capacidad y restricciones?, ¿qué necesitaríamos validar? Descarta ruido documentado y evita análisis profundo sin un candidato suficiente.

No se exige un número de ideas por día. Los umbrales y el máximo de candidatos evaluados se configuran. Una puntuación sirve para ordenar; no sustituye fuentes ni convierte automáticamente una oportunidad en desarrollo.

## Evaluación por especialistas — F3-04

| Evaluación | Pregunta y entrega | Criterio para pasar o escalar |
|---|---|---|
| Mercado | Problema, segmento, señales, actualidad y evidencia contraria | Problema concreto con referencias; distinguir ausencia de señal de fallo de búsqueda |
| Producto | Solución mínima, alternativas y diferenciación; vender/adaptar/nuevo | Relación explícita con el problema y límites del alcance propuesto |
| Técnica | Reutilización, dependencias, esfuerzo, mantenimiento y riesgos | Factible o prueba necesaria; hipótesis técnicas declaradas |
| Comercial y costes | Comprador, canal, oferta, costes y disposición a pagar conocida | Ruta plausible de validación; precio y demanda no verificados se etiquetan |
| Crítica | Supuestos, objeciones, conflictos de fuentes y razón para descartar | Objeciones respondidas o visibles para Juan, sin exigir consenso artificial |

El coordinador activa solo revisiones necesarias. Una oportunidad sin encaje básico no consume todas las especialidades. Producto y Técnica reciben la versión del perfil y evidencia del mismo expediente; sus conclusiones quedan asociadas a versiones concretas.

La salida consolidada puede recomendar descartar, seguir investigando o validar; la recomendación no ejecuta esa acción. Ante un dato decisivo ausente, expone la pregunta y la comprobación mínima necesaria.

## Ficha comprensible y ejemplo hipotético

La tarjeta resumida muestra propuesta, comprador, encaje, evidencia principal, incertidumbre y siguiente paso. Su detalle incluye historial, fuentes, evaluaciones y costes. Toda ficha contiene:

- Qué se vendería y a quién; problema, territorio y canal previsto.
- Por qué ahora y por qué Kershell; categoría vender/adaptar/desarrollar.
- Hechos, hipótesis, alternativas y objeciones; evidencia comercial disponible y pendiente.
- Alcance propuesto, esfuerzo en rango, coste estimado, mantenimiento y dependencias.
- Prueba comercial siguiente, criterio de éxito y motivo para abandonar.
- Versión, autores de revisión, fecha, consumo y decisiones anteriores.

**Ejemplo hipotético, no investigado:** «Validar si un segmento de administradores de fincas necesita una función que Ediflow ya cubre». Primero se verifica el estado del producto y se recopilan señales actuales del segmento. La ficha propone una validación acotada; no presenta compradores, demanda, precio ni desarrollo necesario como hechos.

## Cuatro decisiones humanas — F3-05

| Decisión de Juan | Efecto autorizado | Condición |
|---|---|---|
| Descartar | Archivar la oportunidad conservando evidencia y motivo | Confirmar ficha y versión; permitir motivo breve |
| Seguir investigando | Crear investigación adicional acotada | Pregunta, fuentes/acciones, presupuesto y criterio de cierre |
| Validar comercialmente | Preparar o ejecutar la validación definida | Alcance, destinatarios/canales y acciones expresamente autorizadas; preparar borrador no equivale a enviarlo |
| Aprobar desarrollo | Crear una tarea ejecutable para Producto/Desarrollo | Alcance, presupuesto máximo, entregables, aceptación, proyecto y permisos necesarios |

El backend exige aprobación vigente de Juan antes de crear trabajo de desarrollo por oportunidad. Un agente, una puntuación, el consenso de especialistas o una respuesta dentro de una fuente no sustituyen esa aprobación.

La decisión se persiste con identidad del aprobador, fecha, versión de ficha, alcance, presupuesto, aceptación y acciones autorizadas. Una clave única evita que un doble clic cree dos proyectos o tareas. Si cambia materialmente alcance, coste, destino o acceso, se invalida la autorización afectada y se solicita una nueva decisión concreta.

La aprobación de desarrollo no autoriza despliegue, envíos comerciales ni gasto adicional. La autorización vigente y acotada puede usarse sin preguntar otra vez. Un rechazo técnico posterior se informa; no se cambia la oportunidad por otra para consumir el mismo OK.

## Ejecución durable y efectos externos

Flujo: slot/manual → cola → exploración → filtro → evaluaciones → consolidación → ficha y resumen → decisión humana. Cada etapa guarda entradas, versión, estado, intentos, fuentes, artefactos y consumo antes de avanzar.

La unicidad del slot evita duplicar la investigación programada; la concesión temporal al worker y su versión evitan que dos ejecutores confirmen el mismo avance. Reintentos limitados usan espera creciente y el presupuesto restante. Un intento antiguo pierde permiso de escribir al expirar su concesión.

Se recupera desde la última etapa confirmada, sin reanalizar todas las fuentes ni crear otra ficha por defecto. Antes de repetir una operación se consulta su registro por clave de deduplicación. Publicar/enviar/gastar no forma parte de la búsqueda diaria normal.

Si una validación autorizada incluye efecto externo, se registra la intención antes de ejecutarlo y el identificador del proveedor después. Se usa idempotencia cuando el proveedor la ofrece. Si hubo timeout y no se conoce el resultado, se concilia antes de reintentar; si no puede comprobarse, queda en revisión. No se promete ausencia absoluta de duplicados sin soporte del proveedor.

## Cuotas, presupuesto y resumen — F3-06

Se configuran límites por investigación, día y mes: duración, pasos, llamadas de búsqueda/modelo, tokens cuando se puedan acotar, candidatos, evaluaciones profundas, concurrencia y coste. Cada etapa reserva capacidad antes de iniciarse; los hijos comparten el presupuesto padre y sus reservas no se cuentan dos veces.

El gasto previsto se distingue del confirmado. Las reservas se ajustan al conocer consumo y se concilian al cerrar intentos; una reserva con resultado desconocido no se libera a ciegas tras un timeout. Faltando saldo, se detienen nuevas etapas y se muestra lo completado y lo pendiente.

Tiempo y pasos permiten limitar el trabajo, pero una cancelación no anula llamadas ya enviadas ni garantiza una factura exacta. El tope efectivo depende también de límites del proveedor, concurrencia y consumo pendiente. Se conserva margen configurable y se rechaza iniciar una llamada cuyo máximo permitido no quepa en la reserva disponible.

| Resultado diario | Qué ve Juan |
|---|---|
| Completado con novedades | Fichas nuevas y cambios materiales de las existentes |
| Completado sin oportunidades suficientes | Investigación terminada, cobertura y motivo; no se inventan ideas |
| Parcial | Fuentes/etapas completadas y límite o fallo que impidió continuar |
| Fallido | Etapa, causa, reintentos y qué necesita acción; no se presenta como ausencia de demanda |
| Omitido o pausado | Slot y motivo; no consta como investigación realizada |

El resumen se guarda en Investigación y Pendientes; incluye cobertura, novedades, bloqueos y consumo. No crea automáticamente correos ni notificaciones externas. Una entrega por Gmail requiere la integración y autorización correspondientes. Se evita repetir avisos sin cambios materiales.

## Verificación y cierre de Fase 3

| ID | Demostración obligatoria |
|---|---|
| F3-01 | Perfil versionado con productos pendientes identificados; una capacidad desconocida no aparece como verificada |
| F3-02 | Ejecución sin UI, reinicio, pausa, recuperación y cambio horario; un slot local produce como máximo un trabajo programado y la manual no duplica el diario |
| F3-03 | Fuentes fechadas, señales sindicadas deduplicadas e historial; se distinguen hecho, hipótesis y evidencia comercial |
| F3-04 | Candidato atraviesa revisiones necesarias; objeciones aparecen y no se inventa consenso ni demanda |
| F3-05 | Las cuatro decisiones tienen efecto acotado; sin aprobación no se crea desarrollo y un doble clic no duplica la tarea |
| F3-06 | Cuotas y reservas frenan nuevas etapas; timeout conserva consumo pendiente; resumen diferencia sin novedades, parcial y fallo |

QA usa casos controlados para fallos, duplicados y horario, más una investigación piloto acotada con fuentes reales autorizadas. Juan revisa que puede entender la propuesta, sus incertidumbres y el efecto del OK desde una ficha breve.
