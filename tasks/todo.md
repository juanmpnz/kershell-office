# Tareas de desarrollo — Kershell Office

Estado inicial: **38 tareas pendientes**. Ninguna integración ni tarea de desarrollo está terminada por existir este plan. El orden por fases representa hitos, no obliga a ejecutar trabajo independiente en una única cadena. Referencias: [plan](plan.md), [arquitectura](../docs/architecture.md), [agentes](../docs/agents.md), [harness](../docs/harness.md), [integraciones](../docs/integrations.md), [investigación](../docs/research.md) y [calidad](../docs/quality-and-operations.md).

## Reglas de ejecución

- Escoger una tarea con dependencias satisfechas, registrar responsable y declarar archivos propios antes de editar. Coordinar en serie contratos, migraciones e integración de cambios.
- La numeración identifica tareas y no impone orden estricto: F1-08/F1-09/F1-10 se prueban con fixtures antes de habilitar el runner real de F1-07.
- S significa un incremento de 1–2 archivos sustantivos; M, de 3–5. Si la implementación prevista excede cinco, **dividir antes de programar**, con subtareas, dependencias y comprobación por lote. No estimar todo ese trabajo como M sin partición. Archivos generados no ocultan cambios sustantivos.
- Los IDs agrupan resultados de aceptación. En tareas con partición obligatoria, el tamaño indicado corresponde a cada incremento; el ID padre permanece pendiente hasta verificar todos. La lista de lotes se concreta antes de empezar, conservando los 38 IDs de seguimiento.
- Cada tarea tiene hasta tres criterios. Su verificación aporta informe, resultado y artefactos en `docs/reports/`, sin secretos ni datos privados. Un mock permite probar reglas; no acredita compatibilidad del proveedor real.
- F1-01 creará los scripts documentados por el harness; todavía no existen. Después se ejecutan los comandos reales de tipos, pruebas y compilación aplicables al cambio. Antes, sólo las comprobaciones documentales y del spike correspondiente.
- Las pruebas facturables requieren cuenta, límites y presupuesto autorizado. Las de F0 usan un supervisor acotado y fixture aislado; la aplicación exige sesión, secretos, política, persistencia, aprobaciones y control antes de su primer runner real.
- Los gates G0–G4 se cierran con evidencias y revisores. Una dependencia lista no sustituye el gate que habilita el piloto. Solicitar cuentas sólo cuando hagan falta; una simulación sin cuenta deja la prueba real pendiente.

## Fase 0 — Resolver riesgos y preparar construcción

### F0-01 — Harness, perfiles y skills del equipo constructor

- [ ] Pendiente.
- **Objetivo:** convertir el harness especificado en configuración soportada, con responsabilidades y procedimientos invocables.
- **Responsable / revisor:** Principal Engineer / QA y Security.
- **Dependencias:** ninguna; leer la documentación fundacional primero.
- **Aceptación:** configuración carga perfiles con misión y límites; las seis skills tienen entradas/salida/verificación; una invocación acotada usa el perfil y skill esperados sin ampliar autoridad.
- **Verificación:** validación con la versión instalada, caso positivo y caso fuera de ámbito, reporte de qué se cargó realmente. Si invocar factura, usar techo de prueba autorizado y supervisor aislado.
- **Áreas orientativas:** `.codex/`, `.agents/skills/`, `AGENTS.md`, `docs/reports/`.
- **Tamaño:** M por incremento; **partición obligatoria** en registro/perfiles iniciales, perfiles restantes y lotes de hasta tres skills. Cada lote se valida antes del siguiente.

### F0-02 — Spike de Codex, autenticación y continuidad

- [ ] Pendiente.
- **Objetivo:** probar el recorrido mínimo del runtime candidato antes de seleccionar una integración.
- **Responsable / revisor:** Backend/Agent Systems / Principal Engineer y Security.
- **Dependencias:** F0-01.
- **Aceptación:** identidad, modalidad de auth, versión y capacidades quedan verificadas; una tarea sobre fixture produce artefacto y uso observado/desconocido explícito; interrupción, reinicio y continuación se prueban con resultado registrado.
- **Verificación:** prueba real serializada, limitada en tiempo/llamadas/coste, con credencial fuera del workspace; usar API o entorno privado compatible con la modalidad de cuenta documentada, sin copiar `auth.json` a este repositorio público. Registrar pasa/falla/no probado; no deducir costes de estar en Work.
- **Áreas orientativas:** spike aislado de `packages/runtime/`, fixtures, `docs/reports/`.
- **Tamaño:** M.

### F0-03 — Comparar Paperclip y coordinador mínimo

- [ ] Pendiente.
- **Objetivo:** elegir qué reutilizar mediante el mismo recorrido y controles, sin construir dos plataformas completas.
- **Responsable / revisor:** Principal Engineer / Backend, QA y Security.
- **Dependencias:** F0-02.
- **Aceptación:** comparación registra licencia/versiones/API y propiedad de tareas/runs; ambas opciones se valoran con evidencia de cola, eventos, aprobación y recuperación; se estima adaptación/mantenimiento y se propone una implementación activa.
- **Verificación:** demostración acotada del candidato y prototipo mínimo/contratos de la alternativa, con fallos inducidos; puntos no ejecutados figuran no probados. No evaluar Google completo en este spike.
- **Áreas orientativas:** spike `packages/orchestrator/`, fixtures, informe comparativo y ADR propuesto.
- **Tamaño:** M; si hace falta superar la prueba acotada, registrar obstáculo y nueva subtarea antes de ampliar.

### F0-04 — Demostrar aislamiento y autoridad efectiva

- [ ] Pendiente.
- **Objetivo:** comprobar que el runtime elegido no evade los controles ni accede a recursos ajenos.
- **Responsable / revisor:** Security/DevOps / QA y Principal Engineer.
- **Dependencias:** F0-02, F0-03.
- **Aceptación:** se permite una operación del fixture y se deniega otra fuera del ámbito; shell/red no recuperan secretos ni realizan escritura externa evitando el gateway; doble reclamación, worker obsoleto y efecto incierto conservan control y trazabilidad.
- **Verificación:** intentos negativos desde el ejecutor, límite de recursos, revocación e interrupción; simular efecto externo con resultado desconocido y demostrar conciliación sin repetición automática. Un fallo deja G0 abierto.
- **Áreas orientativas:** sandbox/supervisor de ensayo, `packages/policy/` de spike, fixtures y reporte.
- **Tamaño:** M por incremento; dividir aislamiento de procesos/red y continuidad/efectos si exceden cinco archivos.

### F0-05 — Boceto navegable de oficina 3D y panel

- [ ] Pendiente.
- **Objetivo:** fijar una dirección visual simple que permita encontrar equipos, conversar y revisar trabajo.
- **Responsable / revisor:** UX/UI y Frontend 3D / Product Lead, QA y Juan.
- **Dependencias:** F0-01.
- **Aceptación:** comparar dos bocetos con referencia de marca y activos licenciados; mesa abre panel con Ahora/Conversación/Resultados e input visible; Configuración/Pendientes y alternativa de lista funcionan sin recorrer la escena.
- **Verificación:** prototipo con datos sintéticos etiquetados, teclado y movimiento reducido; medir selección/carga/FPS en equipo piloto y registrar dirección elegida. El prototipo no cuenta como operación real.
- **Áreas orientativas:** prototipo `packages/office-scene/`, bocetos y `docs/reports/`.
- **Tamaño:** M.

### F0-06 — Resolver ADR, versiones y recursos del piloto

- [ ] Pendiente.
- **Objetivo:** cerrar una arquitectura mínima reproducible usando resultados de los spikes.
- **Responsable / revisor:** Principal Engineer / QA y Security; Juan para coste/acceso y producto.
- **Dependencias:** F0-04, F0-05.
- **Aceptación:** ADR registra motor/runtime/auth, autoridad de cada dato y alternativas; versiones/licencias/contratos y límites de recursos quedan fijados; coste observado y presupuesto de piloto se distinguen de estimaciones y desconocidos.
- **Verificación:** revisión cruzada de informes, matriz de compatibilidad y demostración G0; ningún control obligatorio queda aceptado solo por documentación del proveedor.
- **Áreas orientativas:** `docs/decisions/`, arquitectura, informe de recursos y manifiesto de versiones sin secretos.
- **Tamaño:** S/M, hasta cinco archivos sustantivos; subdividir el cierre documental si requiere más.

### Gate G0 — Base técnica probada

- [ ] F0-01…F0-06 tienen evidencia y revisión; los perfiles/skills se cargaron realmente.
- [ ] Fixture aislado pasa por runtime real, produce artefacto y admite interrupción/recuperación; se registran identidad, versiones y consumo.
- [ ] Acceso fuera de ámbito, secreto ajeno, bypass de gateway y worker obsoleto se rechazan con evidencia.
- [ ] Comparación y ADR identifican una fuente de autoridad, límites y recursos; cuenta/presupuesto aplicables constan. Los mocks no cierran pruebas reales pendientes.

G0 prueba controles y viabilidad en ensayo; no conecta servidores productivos, no completa Google ni acredita servicio operativo. Un fallo material de aislamiento/auth/autoridad bloquea habilitar el piloto.

## Fase 1 — Una tarea real desde la oficina

### F1-01 — Crear base de aplicación y scripts verificables

- [ ] Pendiente.
- **Objetivo:** iniciar web/API/worker y contratos mínimos sobre el stack elegido.
- **Responsable / revisor:** Principal Engineer y Backend / QA.
- **Dependencias:** F0-06; G0 cerrado para utilizar el runtime real después.
- **Aceptación:** instalación reproducible con versiones fijadas y lockfile; web/API/worker arrancan con fixture y health check; scripts de desarrollo, tipos, lint, build y pruebas tienen comportamiento documentado y comprobado.
- **Verificación:** instalación limpia y arranque con datos sintéticos, sin cuentas ni secretos reales; ejecutar los scripts recién creados y registrar resultados.
- **Áreas orientativas:** manifiestos, `apps/web/`, `apps/api/`, `apps/worker/`, `packages/contracts/`, configuración de pruebas.
- **Tamaño:** M por incremento; **partición obligatoria** en workspace/contratos, API/persistencia mínima, worker fixture y web/scripts. No ejecutar este scaffold como un cambio grande único.

### F1-02 — Sesión del propietario y acceso privado

- [ ] Pendiente.
- **Objetivo:** autenticar a Juan y proteger API, stream y artefactos antes de configurar recursos.
- **Responsable / revisor:** Backend / Security y QA.
- **Dependencias:** F1-01.
- **Aceptación:** sesión identifica al propietario y caduca/revoca; solicitudes anónimas o de otro ámbito son rechazadas; mutaciones y stream aplican sesión y protección del mecanismo elegido.
- **Verificación:** login/logout, sesión expirada, solicitud sin autoridad y acceso a artefacto ajeno en entorno privado; revisar configuración TLS/red y no exposición del runtime.
- **Áreas orientativas:** sesión API, middleware/política, entrada web y pruebas de sesión.
- **Tamaño:** M.

### F1-03 — Configuración de proveedor y secretos

- [ ] Pendiente.
- **Objetivo:** conectar un proveedor mediante almacenamiento seguro y diagnóstico comprensible.
- **Responsable / revisor:** Backend y Security / QA.
- **Dependencias:** F1-02.
- **Aceptación:** secreto cifrado con clave separada se escribe sin API de lectura de valor; ficha verifica identidad/capacidad/estado y muestra última prueba; rotación/revocación bloquean nuevas llamadas y logs/exportaciones no contienen valores.
- **Verificación:** ciclo con credencial de ensayo y operación mínima autorizada, secreto canario y revocación; confirmar separación del runner demostrada en G0.
- **Áreas orientativas:** secret store, integración IA, Configuración y contratos/pruebas.
- **Tamaño:** M por incremento; dividir secreto/ciclo de conexión y panel si superan cinco archivos.

### F1-04 — Registrar proyecto y repositorio piloto

- [ ] Pendiente.
- **Objetivo:** preparar cambios locales sobre un repositorio autorizado con identidad y base verificadas.
- **Responsable / revisor:** Backend/Agent Systems / Security y QA.
- **Dependencias:** F1-03.
- **Aceptación:** proyecto registra repo/base/rutas/comandos y permiso mínimo; checkout exclusivo desde commit base no expone tokens; otro repo/ruta se deniega y el diff local se conserva con limpieza recuperable.
- **Verificación:** repositorio de ensayo o copia autorizada, dos tareas con checkouts distintos e intento fuera de alcance; no push directo ni despliegue como efecto de la prueba.
- **Áreas orientativas:** registro de proyecto, adaptador GitHub/Git, workspace supervisor y pruebas.
- **Tamaño:** M.

### F1-05 — Conversación, intención y cola de equipo

- [ ] Pendiente.
- **Objetivo:** convertir mensajes de Juan en consultas o tareas acotadas con proyecto visible.
- **Responsable / revisor:** Backend y Frontend / Product Lead y QA.
- **Dependencias:** F1-02.
- **Aceptación:** consulta devuelve estado sin modificar tareas; pedido claro crea una tarea idempotente y ambiguo pregunta antes de cambios; equipo ocupado recibe mensajes y encola trabajo sin interrumpir silenciosamente.
- **Verificación:** casos de consulta/pedido/ambigüedad/repetición con worker fixture; comprobar persistencia de conversación y proyecto junto al input.
- **Áreas orientativas:** mensajes, contratos de intención, admisión/cola y panel de conversación.
- **Tamaño:** M por incremento; separar dominio/persistencia y UI si excede cinco archivos.

### F1-06 — Política y presupuesto antes de ejecutar

- [ ] Pendiente.
- **Objetivo:** admitir tareas solo con ámbito, capacidades y reserva disponibles.
- **Responsable / revisor:** Backend / Security y QA.
- **Dependencias:** F1-03, F1-05.
- **Aceptación:** backend aplica intersección rol/tarea/proyecto/conexión; admisión y reserva son atómicas y presupuesto ausente bloquea gasto; límites de tiempo/pasos/llamadas/concurrencia y consumo estimado/confirmado se registran.
- **Verificación:** dos admisiones compitiendo por saldo, permiso denegado, presupuesto agotado y reserva con resultado desconocido; contenido externo no concede autoridad.
- **Áreas orientativas:** `packages/policy/`, reservas/ledger, gateway y pruebas de conflictos.
- **Tamaño:** M por incremento; dividir permiso/admisión y presupuesto/reconciliación si excede cinco archivos.

### F1-07 — Runner real en entorno aislado

- [ ] Pendiente.
- **Objetivo:** ejecutar una tarea de código real usando controles ya implementados.
- **Responsable / revisor:** Agent Systems / Security, Principal Engineer y QA.
- **Dependencias:** F1-04, F1-06, F1-08, F1-09, F1-10; G0 cerrado.
- **Aceptación:** runtime fijado trabaja en checkout exclusivo y publica estado/artefacto; proceso no alcanza otros secretos/proyectos/producción ni evita gateway; identidad, uso, fallo y detención se observan sin depender del navegador.
- **Verificación:** cambio acotado sobre copia de prueba autorizada, prueba negativa de acceso y cancelación confirmada; cuenta y presupuesto habilitados antes de invocar.
- **Áreas orientativas:** runner, adaptador Codex, supervisor y pruebas dirigidas.
- **Tamaño:** M por incremento; separar supervisor/adaptador y cableado real si superan cinco archivos.

### F1-08 — Eventos persistentes y recuperación de ejecuciones

- [ ] Pendiente.
- **Objetivo:** conservar tareas y continuidad aunque se pierdan stream, API o worker.
- **Responsable / revisor:** Backend / Principal Engineer y QA.
- **Dependencias:** F1-05, F1-06.
- **Aceptación:** eventos/versiones/outbox y cursor reconstruyen snapshot; claim/lease/fencing impiden que dos workers confirmen el mismo trabajo; pérdida de comunicación concilia antes de reintentar y existe copia/restauración mínima antes de admitir datos durables reales.
- **Verificación:** PostgreSQL real de prueba y worker fixture, reinicio antes/después de confirmar, dos reclamaciones, cursor vencido y restauración de copia en instancia vacía con agenda desactivada; repetir continuidad con runtime real en F1-07/G1.
- **Áreas orientativas:** adaptador de orquestación, eventos/leases, SSE y pruebas de recuperación.
- **Tamaño:** M por incremento; separar persistencia/claim y proyección/stream si exceden cinco archivos.

### F1-09 — Aprobaciones vinculadas a una acción

- [ ] Pendiente.
- **Objetivo:** hacer cumplir autorizaciones acotadas antes de efectos externos.
- **Responsable / revisor:** Backend / Security y QA.
- **Dependencias:** F1-02, F1-06.
- **Aceptación:** acción vincula proyecto/operación/contenido/destino/versión/caducidad; cambio material o rechazo impide ejecutar y una autorización vigente se reutiliza dentro de alcance; decisión idempotente registra intención/resultado y estado desconocido sin repetición insegura.
- **Verificación:** destinatario, diff o presupuesto cambiados, doble clic, fuente externa con falsa autorización y timeout después de aceptar en proveedor fixture.
- **Áreas orientativas:** intentos de acción, approvals, gateway y contratos/pruebas.
- **Tamaño:** M.

### F1-10 — Pausa, cancelación y parada global

- [ ] Pendiente.
- **Objetivo:** detener trabajo con estado efectivo y conservar lo ya producido.
- **Responsable / revisor:** Agent Systems / Security y QA.
- **Dependencias:** F1-08, F1-09.
- **Aceptación:** comando pendiente se distingue de detención confirmada; lease/cancelación bloquean herramientas nuevas y reanudación usa intento seguro; parada global impide admisiones y muestra efectos conocidos o pendientes de conciliación.
- **Verificación:** fixture con herramienta lenta, ejecutor perdido, cancelación repetida y nueva admisión durante parada; confirmar de nuevo sobre runtime real en F1-07.
- **Áreas orientativas:** controles worker/runtime, política de admisión y pruebas de interrupción.
- **Tamaño:** M.

### F1-11 — Artefactos privados y revisión de entrega

- [ ] Pendiente.
- **Objetivo:** presentar diff y comprobaciones como resultado revisable, con acceso protegido.
- **Responsable / revisor:** Backend y Frontend / QA y Product Lead.
- **Dependencias:** F1-07, F1-08, F1-09.
- **Aceptación:** artefactos tienen hash/procedencia/ámbito, lectura autenticada y copia mínima recuperable; entrega informa cambio/pruebas/faltantes/decisión; REVIEW_READY y COMPLETED exigen las comprobaciones y aceptación definidas.
- **Verificación:** diff y captura del piloto, hash alterado, artefacto ajeno, comprobación fallida y recuperación de bytes desde copia; aceptar resultado no publica ni despliega.
- **Áreas orientativas:** artifact store, revisión, tarjeta de entrega y pruebas.
- **Tamaño:** M por incremento; dividir almacenamiento/contrato y presentación si excede cinco archivos.

### F1-12 — Oficina 3D con estados reales y panel

- [ ] Pendiente.
- **Objetivo:** realizar mesa → conversación → trabajo → resultado desde la oficina.
- **Responsable / revisor:** UX/Frontend 3D / Product Lead, QA y Juan.
- **Dependencias:** F1-05, F1-08, F1-11.
- **Aceptación:** seis mesas muestran capacidad efectiva sin actividad inventada; clic abre panel/input/proyecto e historial, con vista de lista equivalente; desconexión muestra última actualización y reconexión recupera snapshot.
- **Verificación:** navegador real, ejecución piloto, pestaña cerrada/reabierta, pérdida de stream, teclado/movimiento reducido y medición de FPS/tiempo de apertura.
- **Áreas orientativas:** `packages/office-scene/`, panel de equipo, consumo de eventos y pruebas UI.
- **Tamaño:** M por incremento; separar escena/selección, panel y reconexión/accesibilidad antes de implementar.

### F1-13 — Bandeja global de pendientes

- [ ] Pendiente.
- **Objetivo:** reunir preguntas, autorizaciones y entregas que necesitan a Juan.
- **Responsable / revisor:** Frontend y Backend / Product Lead y QA.
- **Dependencias:** F1-09, F1-11.
- **Aceptación:** Pendientes se abre directamente desde cualquier vista; cada ítem explica qué requiere y efecto de la decisión; resolución concurrente o vencida informa conflicto y no duplica acciones.
- **Verificación:** pregunta, aprobación y revisión en distintos equipos; resolver dos veces y comprobar desaparición/estado del ítem con su historial.
- **Áreas orientativas:** proyección de pendientes, página/lista, decisiones y pruebas UI.
- **Tamaño:** M.

### F1-14 — Evaluar el recorrido mínimo con Juan

- [ ] Pendiente.
- **Objetivo:** comprobar utilidad y control antes de ampliar coordinación.
- **Responsable / revisor:** QA/Evaluation y Product Lead / Juan, Security y Principal Engineer.
- **Dependencias:** F1-10, F1-12, F1-13.
- **Aceptación:** pedido real acotado termina en evidencia revisable con navegador cerrado; fallos de conexión/reinicio/cancelación no ocultan estado ni repiten efectos; se registra intervención, tiempo y consumo frente a tarea equivalente con Codex directo.
- **Verificación:** recorrido G1 grabado o documentado sin datos sensibles, checks del repositorio y prueba de uso donde Juan localiza equipo, historial y configuración sin explicación técnica.
- **Áreas orientativas:** `tests/e2e/`, matriz requisito/evidencia y `docs/reports/`.
- **Tamaño:** M.

### Gate G1 — Un trabajo útil, verificable y controlado

- [ ] F1-01…F1-14 verificadas; sesión, secretos, permisos y reservas estaban activos antes del runner real.
- [ ] Juan encargó un cambio en copia autorizada, cerró la pestaña, volvió y revisó diff/comprobaciones; consultar estado no modificó tareas.
- [ ] Dos reclamaciones, reinicio, desconexión, agotamiento de cuota y cancelación tienen resultados observables sin duplicación insegura; copia/restauración mínima de datos y artefactos fue ensayada.
- [ ] 3D/panel/lista, Pendientes y Configuración son utilizables; constan capturas, accesibilidad, rendimiento e intervención/consumo del piloto.

## Fase 2 — Coordinación y contexto

### F2-01 — Catálogo y habilitación de perfiles operativos

- [ ] Pendiente.
- **Objetivo:** activar equipos solo cuando contrato, herramientas y revisión estén comprobados.
- **Responsable / revisor:** Agent Systems / Product Lead, Security y QA.
- **Dependencias:** F1-06, F1-14; G1 cerrado.
- **Aceptación:** catálogo versiona misión/entradas/herramientas/acceso/entrega/límites/revisor; estados definido/implementado/habilitado/pausado tienen efectos reales; un perfil no habilitado o sin capacidad no recibe ejecución.
- **Verificación:** habilitación/pausa/reanudación, herramienta fuera de ámbito y versión nueva; la mesa distingue sin configurar de disponible.
- **Áreas orientativas:** perfiles operativos, política de activación, Configuración y pruebas.
- **Tamaño:** M; registrar perfiles de forma declarativa, dividir incorporación de herramientas si exige más archivos.

### F2-02 — Coordinador y dependencias selectivas

- [ ] Pendiente.
- **Objetivo:** repartir un objetivo entre especialistas necesarios con presupuesto padre.
- **Responsable / revisor:** Agent Systems / Principal Engineer y QA.
- **Dependencias:** F2-01, F1-08, F1-09.
- **Aceptación:** subtareas guardan padre/alcance/propietario/dependencias y permisos heredados; ciclos, exceso de profundidad/cantidad y doble delegación se rechazan; coordinador consolida entregas y objeciones sin ampliar el encargo.
- **Verificación:** corrección pequeña frente a lanzamiento, entrega repetida, dependencia fallida y falta de reserva; solo se invocan perfiles necesarios.
- **Áreas orientativas:** coordinador, grafo de subtareas, reservas heredadas y pruebas.
- **Tamaño:** M.

### F2-03 — QA independiente y escrituras coordinadas

- [ ] Pendiente.
- **Objetivo:** revisar por separado y evitar cambios concurrentes sobre un checkout mutable.
- **Responsable / revisor:** QA y Agent Systems / Principal Engineer y Security.
- **Dependencias:** F2-02, F1-11.
- **Aceptación:** autor no aprueba su propio cambio y revisor usa contexto de aceptación; propietarios/checkouts distintos y merge serializado impiden colisiones; defecto verificable bloquea el cierre y se conserva desacuerdo relevante.
- **Verificación:** defecto sembrado y dos especialistas modificando ruta coincidente; revisión rechaza, se corrige y sólo se integra la versión verificada.
- **Áreas orientativas:** asignación de escritor, revisión, integración de artefactos y pruebas.
- **Tamaño:** M.

### F2-04 — Memoria por proyecto y recuperación de contexto

- [ ] Pendiente.
- **Objetivo:** recuperar fuentes y decisiones relevantes sin mezclar proyectos ni autoridad.
- **Responsable / revisor:** Backend / Security y QA.
- **Dependencias:** F2-01, F1-08.
- **Aceptación:** contexto guarda procedencia/fecha/versión y distingue empresa/proyecto/tarea; recuperación filtra acceso antes de entregar datos al modelo; revocar o reducir permisos invalida cachés/resúmenes/runtime threads afectados y reconstruye un thread desde contexto permitido antes de reanudar.
- **Verificación:** leer documento con canario → revocar/reducir permisos → reanudar; comprobar que canario no reaparece por resumen, caché ni thread anterior. Añadir dos proyectos distintos, corrección humana e instrucción hostil como datos.
- **Áreas orientativas:** memoria/context builder, recuperación autorizada y pruebas.
- **Tamaño:** M.

### F2-05 — Demostración de trabajo entre equipos

- [ ] Pendiente.
- **Objetivo:** preparar un lanzamiento acotado sin copiar instrucciones entre mesas.
- **Responsable / revisor:** Product Lead y QA / Juan y Principal Engineer.
- **Dependencias:** F2-03, F2-04, F1-12, F1-13.
- **Aceptación:** Dirección coordina Producto/Desarrollo/Marketing según alcance; cada mesa refleja su trabajo y entrega global conserva fuentes/pruebas/objeciones; reinicio y doble reclamación no repiten subtareas ni envían borradores.
- **Verificación:** recorrido G2 sobre producto piloto autorizado, defecto sembrado detectado por QA y consumo total conciliado contra techo padre.
- **Áreas orientativas:** fixtures/casos de evaluación, E2E y reporte multiequipo.
- **Tamaño:** S/M.

### Gate G2 — Varios equipos sin coordinación manual innecesaria

- [ ] F2-01…F2-05 verificadas; roles operativos están habilitados mediante pruebas y permisos, no por nombre.
- [ ] Objetivo de lanzamiento produjo subtareas selectivas, artefactos separados y respuesta consolidada; Juan no copió mensajes entre equipos.
- [ ] QA independiente detectó un defecto, se corrigió y se integró en serie; no hubo checkout mutable compartido.
- [ ] Reinicio/doble reclamación y prueba de memoria cruzada conservaron ámbito, presupuesto y ausencia de efectos externos no autorizados.

## Fase 3 — Investigación diaria

### F3-01 — Perfil de capacidades y catálogo verificado

- [ ] Pendiente.
- **Objetivo:** dar a la investigación contexto empresarial concreto y versionado.
- **Responsable / revisor:** Producto y Comercial / Juan y Tecnología.
- **Dependencias:** F1-04, F1-05. Puede adelantarse durante Fase 1.
- **Aceptación:** perfil recoge capacidades/productos/capacidad/restricciones/canales con fuentes; los cuatro productos citados conservan estado pendiente hasta verificar y el inventario de seis no se inventa; Juan valida datos esenciales y se guarda versión.
- **Verificación:** contrastar un producto y una capacidad con evidencia autorizada; desconocidos aparecen como tales en contexto y ficha de ensayo.
- **Áreas orientativas:** CompanyProfile, editor privado, fixtures y revisión de inventario.
- **Tamaño:** S/M.

### F3-02 — Scheduler diario Europe/Madrid

- [ ] Pendiente.
- **Objetivo:** ejecutar investigación activable sin UI y una sola vez por slot diario.
- **Responsable / revisor:** Backend/Agent Systems / QA.
- **Dependencias:** F1-06, F1-08, F1-10, F3-01.
- **Aceptación:** activar/pausar/horario muestran siguiente slot local y UTC; unicidad, lease y política DST/retraso impiden segundo programado por fecha; ejecución manual tiene identidad propia o reutiliza explícitamente el pendiente de hoy.
- **Verificación:** reloj controlado sobre cambios de hora Madrid, reinicio, doble scheduler, caída y reactivación; pestaña cerrada y encolado manual durante ejecución activa.
- **Áreas orientativas:** Schedule/slots, worker programador, Configuración y pruebas de tiempo.
- **Tamaño:** M.

### F3-03 — Fuentes actuales, evidencia e historial sin duplicados

- [ ] Pendiente.
- **Objetivo:** recoger señales con procedencia y separar demanda de noticias repetidas.
- **Responsable / revisor:** Investigación y Backend / QA y Producto.
- **Dependencias:** F3-01, F1-03, F1-06, F1-08.
- **Aceptación:** fuente guarda URL/origen/publicación/acceso/afirmación/vigencia; hechos, hipótesis y evidencia comercial se distinguen; URLs sindicadas/candidatos repetidos enriquecen historial sin inflar señales independientes.
- **Verificación:** conjunto controlado con noticia repetida, fecha ausente, contradicción y fuente inaccesible; una búsqueda real acotada con proveedor/techo autorizados y referencias comprobables.
- **Áreas orientativas:** ResearchProvider, Evidence/Opportunity, filtro/dedup y pruebas.
- **Tamaño:** M por incremento; separar adaptador/fuentes e historial/dedup si exceden cinco archivos.

### F3-04 — Evaluación especializada y revisión crítica

- [ ] Pendiente.
- **Objetivo:** evaluar encaje y posible venta con especialistas necesarios y objeciones visibles.
- **Responsable / revisor:** Coordinador, Producto y Tecnología / Comercial, revisión crítica y QA.
- **Dependencias:** F2-02, F2-03, F2-04, F3-03.
- **Aceptación:** mercado/producto/técnica/comercial/crítica producen preguntas y entregables distintos; filtro evita análisis profundo de candidatos débiles; ficha consolida versiones, hipótesis, esfuerzo en rango y evidencia contraria sin inventar consenso o demanda.
- **Verificación:** candidato vendible, insuficiente y contradictorio; comprobar qué especialistas fueron activados, coste y preguntas pendientes.
- **Áreas orientativas:** flujo de evaluación, perfiles de investigación, consolidación y casos evaluados.
- **Tamaño:** M.

### F3-05 — Cuatro decisiones y creación acotada de desarrollo

- [ ] Pendiente.
- **Objetivo:** convertir una oportunidad en trabajo solo según la decisión explícita de Juan.
- **Responsable / revisor:** Backend y Frontend / Producto, Security y QA.
- **Dependencias:** F3-04, F1-09, F1-13.
- **Aceptación:** ficha ofrece descartar/seguir investigando/validar comercialmente/aprobar desarrollo; desarrollo exige aprobación vigente con alcance/presupuesto/entregables/aceptación/proyecto; doble clic crea una sola tarea y cambios materiales invalidan autorización afectada.
- **Verificación:** probar cada decisión, falta de permiso, ficha cambiada y repetición; seguir investigando o validar no crea desarrollo ni envío comercial implícito.
- **Áreas orientativas:** decisión de oportunidad, admisión, ficha/Pendientes y pruebas.
- **Tamaño:** M por incremento; separar decisión/dominio y ficha si exceden cinco archivos.

### F3-06 — Resumen diario, cuotas y evaluación completa

- [ ] Pendiente.
- **Objetivo:** hacer investigación diaria útil y controlada, con resultados y fallos distinguibles.
- **Responsable / revisor:** Backend e Investigación / QA, Comercial y Juan.
- **Dependencias:** F3-02, F3-05, F1-06.
- **Aceptación:** resumen distingue novedades/sin oportunidades/parcial/fallido/omitido; reservas y límites frenan nuevas etapas y contabilizan reintentos/hijos sin doble cargo; rutina completa opera sin navegador y solo destaca novedades, fallo o decisión necesaria.
- **Verificación:** G3 con búsqueda real acotada y fixtures de cuota/timeout; consumo desconocido mantiene reserva y no se promete corte monetario exacto; ningún correo externo automático.
- **Áreas orientativas:** digest interno, ledger de investigación, evaluación E2E y reporte.
- **Tamaño:** M.

### Gate G3 — Investigación con evidencia y decisión humana

- [ ] F3-01…F3-06 verificadas y G2 cerrado para coordinación de especialistas real.
- [ ] Investigación piloto conserva fuentes/fechas, objeciones y perfil versionado; noticia sindicada no se contó como demanda independiente.
- [ ] Rutina funciona sin UI, resiste DST/reinicio y distingue investigación sin candidatos de un fallo o límite.
- [ ] Cuatro decisiones tienen efectos acotados: solo aprobar desarrollo crea una tarea única con alcance/presupuesto/aceptación; cuotas y resumen tienen evidencia real y controlada.

## Fase 4 — Integraciones y operación sostenida

Las primeras tareas de conectores pueden empezar al completar sus dependencias, en paralelo con Fase 2/3. Habilitar el piloto de varios proyectos requiere G4. No se migra infraestructura por completar una ficha.

### F4-01 — Servidores: inventario y diagnóstico de lectura

- [ ] Pendiente.
- **Objetivo:** consultar recursos autorizados sin dar shell administrativa a los agentes.
- **Responsable / revisor:** Security/DevOps / QA y Principal Engineer.
- **Dependencias:** F1-03, F1-06, F1-09.
- **Aceptación:** inventario privado identifica proyecto/entorno/responsable/método/host verificado; diagnóstico solo lee estado/métricas/logs redactados mediante identidad mínima; root/destino ajeno/escritura se rechazan y revocación bloquea llamadas.
- **Verificación:** servidor de ensayo autorizado, host key/API, timeout, logs canario y revocación; no reiniciar ni desplegar en esta tarea.
- **Áreas orientativas:** conector de servidor, diagnóstico estructurado, Configuración y pruebas.
- **Tamaño:** M.

### F4-02 — OAuth Google e identidad efectiva

- [ ] Pendiente.
- **Objetivo:** conectar la cuenta adecuada mediante autorización y tokens fuera del agente.
- **Responsable / revisor:** Backend y Security / QA.
- **Dependencias:** F1-02, F1-03, F1-06, F1-09.
- **Aceptación:** se verifica si `info@heykershell.com` es buzón/alias/grupo y quién concede acceso; backend valida state/redirect/intercambio y cifra refresh token; scopes/rechazo/cuenta errónea/renovación/revocación se muestran sin bucles ni ampliación automática.
- **Verificación:** proyecto OAuth y cuenta de ensayo autorizados, consentimiento rechazado, token expirado y revocación; identidad efectiva concuerda con ficha.
- **Áreas orientativas:** adaptador Google OAuth, ciclo de conexión, callback y pruebas.
- **Tamaño:** M.

### F4-03 — Lectura autorizada de Gmail, Drive y Calendar

- [ ] Pendiente.
- **Objetivo:** consultar contenido seleccionado de Workspace con ámbito de proyecto.
- **Responsable / revisor:** Backend / Security, Producto y QA.
- **Dependencias:** F4-02, F2-04.
- **Aceptación:** Gmail lee hilo de prueba, Drive documento seleccionado y Calendar agenda permitida; scopes mínimos y gateway deniegan recurso ajeno/escritura aunque token tenga más capacidad; contenido externo no concede permisos y respuestas conservan referencia sin mezclar proyectos.
- **Verificación:** ensayo por servicio con recurso permitido/denegado, renovación y revocación; usar datos controlados y revisar separación del contexto.
- **Áreas orientativas:** adaptadores Gmail/Drive/Calendar, gateway y fixtures.
- **Tamaño:** M por incremento; **partición obligatoria** en Gmail, Drive y Calendar, cada uno con prueba positiva/negativa y revisión antes de habilitarse.

### F4-04 — Escrituras Google con autorización vinculada

- [ ] Pendiente.
- **Objetivo:** realizar solo borradores, ediciones, eventos o envíos expresamente autorizados.
- **Responsable / revisor:** Backend y Frontend / Security, QA y Juan para acciones de ensayo.
- **Dependencias:** F4-03, F1-08, F1-09, F1-10.
- **Aceptación:** preview muestra contenido/destino/remitente/adjuntos o calendario/invitados/notificaciones; gateway separa preparar/guardar/enviar/editar y rechaza cambios tras aprobar; intención/resultados/idempotencia y conciliación evitan repetir ciegamente un efecto incierto.
- **Verificación:** destinatario/archivo/calendario de prueba controlados, operación permitida y cambio denegado; timeout tras aceptar, doble solicitud y revocación, con evidencia por operación habilitada.
- **Áreas orientativas:** acciones Google, previews y decisiones, conciliación y pruebas.
- **Tamaño:** M por incremento; **partición obligatoria** por servicio y por preparar/guardar/enviar cuando afecte permisos distintos. No habilitar operaciones todavía no probadas.

### F4-05 — Copia completa y restauración ensayada

- [ ] Pendiente.
- **Objetivo:** recuperar datos, artefactos y runtime sin repetir acciones ya realizadas.
- **Responsable / revisor:** Security/DevOps / QA y Principal Engineer.
- **Dependencias:** F1-03, F1-08, F1-11.
- **Aceptación:** backup cifrado incluye DB/artefactos/configuración/mapeos/runtime necesario y clave por vía separada; restauración vacía valida hashes/permisos y reconcilia efectos con programación desactivada; RPO/RTO/retención y procedimiento de rollback se miden y ajustan al presupuesto.
- **Verificación:** simulacro desde copia de ensayo, artefacto y secreto canario, conexión que requiere reautorizar y efecto externo ya completado; ninguna acción se repite al arrancar.
- **Áreas orientativas:** `infra/`, backup/restore, procedimientos y reporte.
- **Tamaño:** M por incremento; separar respaldo, restauración y ensayo si exceden cinco archivos. Repetir ensayo integrado con conectores al cerrar G4.

### F4-06 — Mejorar oficina y capacidades de Marketing/Ventas

- [ ] Pendiente.
- **Objetivo:** completar operación de departamentos sin perder la interacción simple.
- **Responsable / revisor:** UX/Frontend, Marketing y Comercial / Producto, QA y Juan.
- **Dependencias:** F2-05, F1-12.
- **Aceptación:** equipos producen piezas/ofertas/borradores verificables con herramientas concedidas; oficina y lista permiten encontrar trabajo/resultados/pendientes rápidamente; consumo, errores y detalles permanecen accesibles sin saturar la vista principal.
- **Verificación:** encargo de contenido y propuesta comercial de ensayo, sin venta garantizada ni envío implícito; sesión con Juan, teclado, pantallas pequeñas y rendimiento medido.
- **Áreas orientativas:** perfiles/capacidades de Marketing/Ventas, oficina/paneles y pruebas de uso.
- **Tamaño:** M por incremento; dividir capacidades de departamentos y refinamiento UX antes de implementación si supera cinco archivos.

### F4-07 — Piloto de varios proyectos y cierre operativo

- [ ] Pendiente.
- **Objetivo:** comprobar operación sostenida, coste y recuperación antes de ampliar concurrencia.
- **Responsable / revisor:** Principal Engineer y Security/DevOps / QA, Producto y Juan.
- **Dependencias:** F4-01, F4-04, F4-05, F4-06, F3-06.
- **Aceptación:** dos proyectos autorizados mantienen código/contexto/secretos/consumo separados; observabilidad, alertas internas, parada y revocación permiten operar fallos; restauración integrada y coste total medido justifican o limitan la ampliación.
- **Verificación:** G4 con carga acotada, fallo de worker/proveedor, revocación, restauración vacía y recorrido Google de ensayo; registrar intervención humana, uso y recursos sin comprar servidor ni migrar seis productos.
- **Áreas orientativas:** despliegue piloto privado, métricas/alertas, casos E2E y reporte de operación.
- **Tamaño:** M por incremento; separar correcciones concretas surgidas del piloto y mantener este ID como aceptación integrada.

### Gate G4 — Operación sostenible con conexiones verificadas

- [ ] F4-01…F4-07 verificadas; G1/G2/G3 cerrados con evidencias vigentes.
- [ ] Servidor de ensayo y Google funcionaron con identidad mínima; revocación bloqueó nuevas llamadas y una escritura autorizada tuvo destino/contenido exactos.
- [ ] Restauración en instancia vacía recuperó DB/artefactos/configuración/runtime, con RPO/RTO medidos y sin repetir envíos ni agenda antes de conciliar.
- [ ] Dos proyectos operaron sin mezcla de datos o permisos; carga, coste total, uso estimado/confirmado y mantenimiento humano quedaron medidos antes de aumentar capacidad.
- [ ] Juan encuentra conexiones, trabajo, resultados y pendientes por equipo; existen procedimiento de incidente, parada y recuperación y responsables definidos.

La migración de los servicios actuales y de los seis productos se planifica como un trabajo distinto, con inventario, alcance, presupuesto y autorización propios.
