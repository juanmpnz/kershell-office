# Configuración e integraciones

Estado: **plan de implementación, 2026-10-11**. No hay conexiones operativas verificadas. Las capacidades documentadas y sus límites están en [fuentes técnicas](sources.md); la selección de motor, runtime y autenticación se resuelve en Fase 0.

## Configuración forma parte del producto

Configuración debe estar disponible desde el primer recorrido. Incluye proveedores de IA/Codex, proyectos/repositorios, servidores, Google Workspace, equipos/capacidades, presupuestos y programación. Fase 1 permite configurar proveedor y repositorio; las secciones de fases posteriores muestran su estado pendiente y no aparentan una conexión activa.

Cada conexión registra identidad del proveedor, propietario humano, proyectos habilitados, capacidades, alcance concedido, estado, última prueba, caducidad conocida y versión de configuración. La UI muestra estados «Sin configurar», «Conectando», «Lista», «Acceso limitado», «Requiere reconectar», «Error» y «Revocada». Un resultado correcto de ayer no prueba disponibilidad actual.

La ficha ofrece **Conectar, Probar, Rotar/Reautorizar y Revocar**, además de un diagnóstico comprensible. Probar usa la operación mínima necesaria y no envía correos, crea commits o despliega. La identidad y el alcance devueltos deben coincidir con el proyecto elegido antes de activar capacidades.

## Secretos y autorización — F1-03

Las API keys se introducen mediante un campo de escritura y se envían al backend por un canal autenticado. Después de guardarlas, ninguna API de lectura devuelve el valor. La UI muestra únicamente proveedor, alias, identificador interno, fecha y huella no reversible cuando resulte útil; no ofrece «mostrar clave». Los secretos no aparecen en conversaciones, historial de ejecuciones, telemetría o exportaciones de configuración.

Propuesta inicial: cifrado autenticado en servidor con clave maestra obtenida de un archivo protegido o gestor de secretos externo a la base de datos. Guardar ciphertext, identificador de clave y versión; respaldar la clave por una vía separada y documentar recuperación. Cifrar una columna dejando su clave en la misma base no cumple el requisito. La elección de biblioteca y mecanismo de rotación se registra al implementar F1-03.

Las credenciales del proveedor permanecen fuera del proceso donde se ejecuta código no confiable. El gateway realiza llamadas con identidad y permisos acotados; para runtimes que necesitan auth propia, el servicio supervisor entrega sólo la credencial imprescindible por el mecanismo soportado, sin montarla en el workspace ni heredársela a comandos arbitrarios. Fase 0 debe demostrar esta separación. Si un adaptador no la permite, su aislamiento pendiente se registra antes de usar repositorios reales.

Una conexión técnica no autoriza toda acción posible. El gateway aplica:

| Control | Qué debe verificar |
|---|---|
| Identidad | Usuario solicitante, equipo, agente y ejecución |
| Proyecto | Proyecto activo y conexión expresamente habilitada |
| Herramienta | Operación permitida para ese rol y recurso |
| Destino | Repo/rama, servidor/entorno, archivo, calendario o destinatario exactos |
| Contenido | Diff, documento, correo o comando que se aprobó |
| Vigencia | Alcance, presupuesto, vencimiento y estado de la autorización |
| Ejecución | Lease activo, cancelación no solicitada, idempotencia y límite de uso |

La autorización puede proceder de una instrucción vigente y acotada o de una aprobación en Pendientes; no se pide de nuevo por rutina. Antes de un efecto externo, el sistema vincula la aprobación a acción, contenido, destino, proyecto y versión. Cambiar destinatarios, adjuntos, diff, entorno, coste o alcance invalida la parte afectada. El modelo, un correo recibido o un README no pueden conceder esa autorización.

Las políticas se hacen cumplir en código. No permitir herramientas de shell/red que puedan evitar el gateway para realizar la misma acción. Registrar solicitud y resultado con identificador de idempotencia, sin contenido sensible innecesario. Después de un timeout, consultar el resultado remoto antes de repetir un envío, publicación o despliegue.

## Ciclo de vida común

1. **Conectar:** elegir proyecto y capacidades; autenticar al operador; almacenar credencial/referencia; comprobar identidad y alcance mínimo.
2. **Probar:** consulta acotada y lectura permitida. Guardar fecha, versión, resultado y diagnóstico, nunca el secreto.
3. **Activar:** habilitar sólo las capacidades verificadas y el presupuesto aprobado. Los agentes no amplían scopes por su cuenta.
4. **Rotar o reautorizar:** introducir nueva versión, probarla y cambiar de forma controlada. Retirar la anterior cuando ya no sea necesaria; una ampliación de permisos requiere autorización.
5. **Revocar:** bloquear nuevas llamadas inmediatamente, cancelar ejecuciones afectadas y retirar credenciales cuando sea posible. Confirmar revocación remota o indicar expresamente si sólo se desconectó Kershell.
6. **Recuperar:** tras renovar acceso o restaurar un backup, volver a probar identidad/permisos. No reactivar automáticamente acciones externas pendientes con una aprobación obsoleta.

Las llamadas ya aceptadas por un proveedor pueden completar después de revocar; conservar el resultado conocido y reconciliar las que queden indeterminadas. Cancelar una ejecución no revierte sus efectos anteriores.

Si se revoca acceso a datos ya incluidos en conversaciones del runtime, invalidar sus resúmenes/cachés y threads afectados. Una reanudación posterior usa un thread nuevo reconstruido con el ámbito vigente; filtrar únicamente futuras búsquedas no elimina el contexto antiguo. Registrar qué pudo retirarse y qué ya procesó el proveedor.

## IA y Codex — Fase 0 y F1-03

| Opción por evaluar | Encaje | Condición de selección |
|---|---|---|
| Codex SDK en runner | Jobs de código y continuación de threads locales | Demostrar streaming, persistencia, cancelación y aislamiento en la versión fijada |
| App Server por stdio | Conversación interactiva con historial y aprobaciones | Supervisor local, protocolo fijado, eventos persistidos; backend propio autentica al navegador |
| CLI `exec` con JSON | Ejecutor acotado si cubre el primer recorrido | Parser robusto, salida estructurada, reanudación y timeout verificados |
| Paperclip `codex_local` | Usar coordinación externa detrás de adaptador Kershell | Probar motor ACP/CLI elegido, permisos explícitos y autoridad única para estados |
| Agents API gestionada | Harness y sesiones gestionados, con entorno alojado o propio | Acceso beta, costes, ubicación/retención de datos y herramientas adecuados |
| Agents SDK / Responses | Agentes con herramientas propias, por ejemplo investigación | Loop, almacenamiento, permisos y recuperación implementados por Kershell |

Estas opciones no se implementan todas. El ADR de Fase 0 selecciona el recorrido mínimo y las alternativas justificadas. La UI recibe eventos normalizados del backend, no credenciales ni el protocolo crudo de un runner. Un listener WebSocket experimental de App Server no se expone directamente como servidor público. [SDK y App Server](https://learn.chatgpt.com/docs/codex-sdk), [comparación de runtimes](https://developers.openai.com/api/docs/guides/agents).

Si se prueba la vía CLI de `codex_local` de Paperclip, su documentación actual requiere fijar explícitamente `dangerouslyBypassApprovalsAndSandbox=false` para evitar el bypass por defecto. Se reconfirma la opción en el release elegido y se prueba una acción denegada; ese ajuste por sí solo no demuestra aislamiento. La vía ACP se evalúa con su política propia. [Adaptador Codex](https://docs.paperclip.ing/reference/adapters/codex/).

La configuración de proveedor identifica modalidad de auth, endpoint autorizado, modelo disponible, presupuesto, límites y pruebas. No elegir un modelo por aparecer en un ejemplo. Endpoints personalizados los define el administrador y no un agente; restringir destinos y redirecciones para impedir acceso a metadata o servicios internos no autorizados.

| Modalidad | Lo que hay que verificar |
|---|---|
| API key Platform | Proyecto de facturación, permisos, modelos y límites; uso facturado aparte del plan ChatGPT |
| Login ChatGPT gestionado por Codex | Cuenta/workspace autorizado, disponibilidad de login headless, cuota compartida y renovación persistida |
| Access token Enterprise | Elegibilidad real y permiso administrativo; no se presume disponible |

OpenAI documenta automatización privada avanzada con login ChatGPT, pero recomienda API keys como opción general de automatización. El flujo de credencial de cuenta requiere una máquina o stream serializado por copia de `auth.json`; varios empleados virtuales no multiplican el cupo. Esa guía excluye repositorios públicos/open source: no se configura ese patrón CI para el estado público actual de `kershell-office`. Se evalúa API o un piloto privado compatible. No copiar tokens desde este chat ni implementar una renovación OAuth propia. [Autenticación](https://learn.chatgpt.com/docs/auth), [automatización privada con cuenta Codex](https://learn.chatgpt.com/docs/auth/ci-cd-auth).

Prueba de cierre: una invocación real acotada produce evidencia de identidad, eventos, resultado, consumo disponible, detención y continuación tras reinicio. Datos de coste desconocidos se muestran como desconocidos. Limitar también tiempo, pasos, llamadas y concurrencia; un reporte monetario tardío no garantiza un corte exacto.

## Proyectos y GitHub — F1-04

Registrar producto, propietario, URL del repositorio, rama base verificada, rutas permitidas, comandos de comprobación y entorno de trabajo. Separar los repos de productos de `kershell-office`. El inventario definitivo se completa con Juan; los nombres mencionados en [contexto](context.md) no prueban disponibilidad ni estado.

Preferencia propuesta: GitHub App instalada sólo en repositorios seleccionados, tokens temporales limitados a repos/permisos necesarios. Alternativa: PAT fine-grained de duración y alcance acotados. No pedir token clásico con acceso a toda la cuenta para simplificar el piloto. [Permisos GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app), [tokens de instalación](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation).

| Capacidad | Permiso previsto y barrera adicional |
|---|---|
| Inventario/clonado/lectura | Metadata y Contents de lectura en repo seleccionado; verificar mínimos del endpoint |
| Preparar cambios | Escritura local en worktree de tarea; no necesita push remoto |
| Publicar rama y abrir PR | Contents y Pull requests de escritura según API usada; autorización aplicable para ese repo/diff/destino |
| Consultar comprobaciones | Lectura de checks/status/Actions sólo si el recorrido lo necesita |
| Editar workflows | Workflows separado y aprobación por ampliación de alcance |
| Merge, despliegue o administración | Fuera del permiso inicial; autorización específica y controles del repositorio |

Crear un worktree/checkout aislado por tarea, desde una referencia base registrada. No ejecutar dos tareas sobre el mismo checkout mutable. Un worktree separa cambios Git y no constituye aislamiento de procesos, red o secretos: el runner aplica esas fronteras. El supervisor controla rutas y enlaces simbólicos antes de montar el workspace. Credenciales mediante broker/helper temporal, sin tokens en URLs persistidas ni archivos del repo.

La aceptación de F1-04 incluye clonar el piloto, denegar otro repo, crear trabajo local, conservar un diff verificable y limpiar de forma recuperable. El recorrido autorizado de PR se comprueba posteriormente sobre rama de prueba, con idempotencia. Respetar protecciones de rama y no hacer push directo a producción.

## Servidores — F4-01

Inventariar por proyecto: proveedor, entorno, hostname validado, responsable, método de acceso, servicios y capacidades. Las primeras operaciones son lectura de estado, métricas y logs filtrados. No se presupone acceso a los servidores actuales ni se compra infraestructura al implementar la ficha.

Usar identidad de servicio dedicada, SSH con host key verificada o API restringida. Evitar root, credenciales personales amplias y montar el socket Docker en el runner. Para acciones necesarias, un servicio de operaciones expone comandos estructurados y recursos permitidos; no una shell administrativa arbitraria. El gateway valida proyecto, entorno, argumentos y autorización vigente.

El agente de diagnóstico no modifica servicios. Reiniciar, cambiar configuración, desplegar, migrar datos, ampliar capacidad y eliminar recursos son capacidades separadas. El despliegue necesita artefacto/revisión aprobados, destino exacto y comprobación de salud; el sistema registra qué versión se publicó y cómo recuperar la anterior. La migración de seis productos sigue siendo otro programa de trabajo.

F4-01 prueba lectura sobre entorno de ensayo, rechazo de root/destino no autorizado, timeout, redacción de logs y revocación. No usar logs de clientes como material público de pruebas. Las operaciones de escritura se habilitan sólo cuando exista procedimiento específico y evidencia de autorización.

## Google Workspace — F4-02 a F4-04

Primero verificar qué representa **`info@heykershell.com`**. Puede ser usuario con buzón, alias de otro usuario o grupo. Registrar la identidad que concede OAuth y la relación comprobada con esa dirección. No crear cuenta, pedir contraseña ni atribuir acceso al agente por conocer el correo.

Preferencia de implementación propuesta: APIs oficiales Google con OAuth de aplicación web y acceso limitado. Si se elige Paperclip y sus conectores MCP cumplen el recorrido, se pueden reutilizar; su documentación actual indica verificación pendiente y Developer Preview, por lo que no deben bloquear el piloto. [OAuth web server](https://developers.google.com/identity/protocols/oauth2/web-server), [estado del setup Google en Paperclip](https://docs.paperclip.ing/connectors/google-setup/).

**F4-02 — OAuth.** Configurar un proyecto Google Cloud de Kershell, APIs necesarias, audiencia apropiada, client ID/secret y redirect URI exacta del entorno. Autorizar desde navegador con `state` validado; intercambio de código sólo en backend. Pedir acceso offline cuando sea necesario, cifrar refresh tokens y probar renovación/revocación. Manejar consentimiento rechazado, cuenta incorrecta, scope insuficiente y token expirado sin bucles de reconexión. No usar delegación de dominio como atajo inicial; requeriría otro análisis y permiso administrativo.

**F4-03 — Lectura.** Habilitar únicamente servicios y recursos necesarios; consultas y respuestas permanecen en el contexto autorizado del proyecto. Mensajes, adjuntos y documentos externos son datos no confiables y no instrucciones para ampliar acceso o enviar información.

| Servicio | Alcance mínimo a evaluar | Primer recorrido |
|---|---|---|
| Gmail | `gmail.readonly` si hace falta contenido; menor alcance cuando baste metadata | Consultar un hilo de prueba autorizado y resumirlo con referencia |
| Drive/Docs | `drive.file` para archivos seleccionados si cubre el uso; evaluar lectura amplia sólo con necesidad acreditada | Leer documento piloto elegido, sin recorrer toda la unidad |
| Calendar | Scope de lectura adecuado a los calendarios/eventos requeridos | Consultar agenda de prueba, sin crear invitaciones |

Los scopes exactos se fijan al desarrollar cada operación, comprobando [Gmail](https://developers.google.com/workspace/gmail/api/auth/scopes), [Drive](https://developers.google.com/workspace/drive/api/guides/api-specific-auth) y [Calendar](https://developers.google.com/workspace/calendar/api/auth). En particular, `drive.file` no equivale a leer todo Drive y puede permitir escritura sobre archivos concedidos; el gateway mantiene el recorrido inicial en lectura.

**F4-04 — Escritura autorizada.** Añadir borradores, edición de archivos, eventos y envío como operaciones distintas. `gmail.compose` también permite envío: una capacidad de borrador en la UI debe bloquear el envío en el gateway aun si el token del proveedor lo permite. Redactar un correo en Kershell puede hacerse sin escribir en Gmail; guardarlo allí necesita permiso de escritura.

Antes de enviar, mostrar remitente/alias validado, To/CC/BCC, asunto, cuerpo y adjuntos exactos. La aprobación debe cubrir ese contenido y destinatarios en el proyecto correcto. Antes de crear un evento, mostrar calendario, horario/zona, invitados y efecto de notificación. Antes de editar un documento, mostrar archivo y cambios. Una autorización de lectura o investigación comercial no autoriza contactar prospectos.

Las pruebas usan cuenta/archivo/calendario de ensayo y un destinatario controlado autorizado. Verificar scope denegado, renovación, revocación y rechazo de contenido cambiado después de aprobar; después probar un efecto permitido. La cuenta real `info@heykershell.com` se incorpora sólo tras comprobar su identidad y recibir acceso por el flujo seguro.

## Recursos a preparar por fase

| Fase / tareas | Recursos necesarios | Evidencia de cierre |
|---|---|---|
| Fase 0 | Entorno de ensayo, decisión de presupuesto y modalidad de acceso Codex; repo de prueba; versiones candidatas | Comparación motor/runtime, auth real, aislamiento, recuperación y ADR |
| Fase 1 — F1-03/F1-04 | Cuenta/proyecto de IA, credencial por Configuración segura, repo piloto y permisos limitados | Proveedor y repo probados; secreto sin readback; revocación y alcance denegado |
| Fase 2 | Roles habilitados, proyectos y capacidades por equipo | Delegación conserva permisos, presupuesto y procedencia de autorización |
| Fase 3 | Fuentes y herramientas de búsqueda, horario Europe/Madrid, presupuesto de investigación | Activación manual/diaria sin duplicados; evidencia y ausencia de contacto externo implícito |
| Fase 4 — F4-01 | Inventario privado y acceso de lectura a servidor de ensayo | Diagnóstico real con identidad restringida y revocación |
| Fase 4 — F4-02/F4-03 | Proyecto Google Cloud, OAuth interno según elegibilidad, cuenta y recursos de prueba | Cuenta correcta, lectura limitada, renovación y revocación |
| Fase 4 — F4-04 | Permisos de escritura justificados y acciones/destinos de ensayo autorizados | Escritura permitida con aprobación vigente y rechazo de cambios fuera de ella |

Se solicita información y acceso sólo cuando una prueba lo necesita. Las credenciales se introducen en el mecanismo seguro del entorno, nunca en Markdown, issues, PRs o chats. Sin acceso real, se puede completar el diseño y simulación de fallos, pero la conexión queda marcada «pendiente de prueba».
