# Fuentes técnicas y estado de verificación

Consulta: **2026-10-11**. Estas referencias sustentan opciones para el plan; no prueban que Kershell tenga las cuentas, permisos, cuotas, servidores o versiones necesarios. No se han instalado Paperclip ni runtimes, ejecutado agentes o conectado servicios para producir este documento.

## Cómo interpretar la evidencia

| Estado | Significado |
|---|---|
| Documentado | La fuente primaria describe la capacidad o limitación |
| Propuesto | Diseño planteado para Kershell; necesita la decisión y comprobaciones de su fase |
| Probado en Kershell | Hay ejecución reproducible y evidencia guardada; ninguna integración alcanza todavía este estado |

Las páginas pueden cambiar. Fase 0 debe registrar release/commit del motor, versión del runtime, esquemas y fecha de las pruebas. No se fijan versiones por aparecer en ejemplos de documentación. Las decisiones del usuario están en [contexto](context.md); las selecciones técnicas quedan en [decisiones](decisions/README.md).

## OpenAI: ejecución y autenticación

| ID | Fuente primaria | Hallazgo documentado | Consecuencia para el plan |
|---|---|---|---|
| O1 | [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk) | Permite integrar agentes locales en herramientas internas y automatizaciones, iniciar, continuar y reanudar threads | Candidato para tareas de código en el runner; comprobar eventos y cancelación en la versión elegida |
| O2 | [Codex App Server](https://learn.chatgpt.com/docs/app-server) | Protocolo para historial, autenticación, turnos, aprobaciones y eventos; transporte stdio disponible. WebSocket figura experimental y no soportado | Evaluar proceso local detrás del backend; no exponer directamente su listener al navegador o Internet |
| O3 | [Authentication](https://learn.chatgpt.com/docs/auth) | Login ChatGPT y API key son modalidades diferentes; API se cobra mediante Platform. Hay acceso headless documentado | Estar en Work no acredita el modo de autenticación ni el coste del servidor |
| O4 | [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode) | `codex exec` tiene eventos JSON, esquema final y reanudación; recomienda API key para automatización | Alternativa acotada al SDK; verificar salida y sandbox, sin considerar el mensaje final prueba de éxito |
| O5 | [Account auth in CI/CD](https://learn.chatgpt.com/docs/auth/ci-cd-auth) | Automatización privada avanzada con credencial ChatGPT renovada por Codex; una máquina o flujo serializado por copia de `auth.json`; excluye repositorios públicos/open source | No replicar sesiones concurrentes ni usar ese patrón CI en el repo público actual; probar renovación en piloto compatible |
| O6 | [Agents: comparación de runtimes](https://developers.openai.com/api/docs/guides/agents) | Agents API administra harness y estado; Agents SDK mantiene el loop en la aplicación; Responses permite integración directa | Son opciones distintas, ninguna seleccionada por este plan |
| O7 | [Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview) | Harness gestionado con sesiones y entornos propios o alojados; residencia actual en EE. UU., sin ZDR incluso con sandbox propio | Revisar adecuación de datos antes de elegir esa vía |
| O8 | [Agents API quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart) | API key Platform con permisos de agents y responses; superficie beta. Un turno completo no garantiza éxito de todas las herramientas | Verificar acceso, facturación y recuperación antes de incorporarlo |

App Server puede anunciar modelos y límites disponibles para la identidad autenticada. El plan no presupone disponibilidad de los modelos usados en ejemplos ni llama a endpoints de renovación OAuth por cuenta propia. La autenticación concreta queda registrada en Configuración y validada en Fase 0.

## Paperclip: candidato de coordinación

| ID | Fuente primaria | Hallazgo documentado | Consecuencia para el plan |
|---|---|---|---|
| P1 | [Licencia del repositorio](https://raw.githubusercontent.com/paperclipai/paperclip/master/LICENSE) | MIT, con conservación del aviso de licencia/copyright | Revisar también licencias de dependencias y activos; conservar avisos si se incorpora código |
| P2 | [README del repositorio](https://github.com/paperclipai/paperclip/blob/master/README.md) | Servidor Node y UI React; coordinación de tareas, agentes y presupuestos. Source indica Node 24.11+, pnpm 9.15+, requisitos adicionales de CLI/Python/Runner | Verificar requisitos en el release elegido; no convertir la descripción comercial en garantías operativas |
| P3 | [API overview](https://docs.paperclip.ing/reference/api/overview/) | API JSON para compañía, agentes, tareas, aprobaciones, costes y rutinas, con identidades y alcance | Probar si cubre la interfaz propia sin modificar el core |
| P4 | [Codex adapter](https://docs.paperclip.ing/reference/adapters/codex/) | ACP por defecto; CLI explícito. La vía CLI activa bypass si se omite su ajuste. Homes/sesiones gestionados y login del host o API key | Fijar explícitamente permisos; probar continuidad, auth y compatibilidad. Homes distintos no crean cuotas independientes |
| P5 | [Docker](https://docs.paperclip.ing/reference/deploy/docker/) | Imagen autocontenida y almacenamiento persistente; al construir se debe seleccionar target `production` | Probar despliegue reproducible y restauración antes de alojar trabajo real |
| P6 | [Deployment modes](https://docs.paperclip.ing/reference/deploy/deployment-modes/) | `local_trusted` carece de login; modo autenticado disponible con exposición privada o pública | El servidor necesita autenticación efectiva; acceso privado es la propuesta inicial |
| P7 | [Database](https://docs.paperclip.ing/reference/deploy/database/) | PostgreSQL con modos embedded, local Docker y alojado; respaldo SQL no incluye todos los bytes de archivos | Evaluar PostgreSQL propio y restauración conjunta con almacenamiento |
| P8 | [Storage](https://docs.paperclip.ing/reference/deploy/storage/) | Disco local o S3 compatible; archivos personales de agentes separados de uploads | Definir y respaldar ambas ubicaciones |
| P9 | [Secrets](https://docs.paperclip.ing/reference/deploy/secrets/) | Proveedor cifrado local y modo estricto para referencias de secretos en bindings persistidos | Comprobar alcance real y mantener claves de cifrado fuera de la base de datos |
| P10 | [Daily routine](https://docs.paperclip.ing/how-to/create-a-daily-routine/) | Rutinas recurrentes con tareas e historial | Candidato para investigación; probar horarios, duplicados y recuperación |
| P11 | [Google Workspace setup](https://docs.paperclip.ing/connectors/google-setup/) | Documenta verificación pendiente, conectores ocultos temporalmente y ruta MCP en Developer Preview | No hacer depender el MVP de esa disponibilidad; evaluar APIs Google directas |

La comparación pendiente es entre Paperclip detrás de un adaptador propio y un coordinador mínimo. El primero puede ahorrar tareas, persistencia y gobierno; el segundo exige construir y mantener esas garantías. La elección se hará con la misma tarea piloto y los mismos fallos inducidos, midiendo esfuerzo de integración, consumo, recuperación y mantenimiento. Evitar un fork grande y dos sistemas que compitan por el estado de una misma ejecución es una propuesta de arquitectura, no una capacidad demostrada.

## GitHub y Google

| ID | Fuente primaria | Hallazgo documentado | Uso previsto |
|---|---|---|---|
| H1 | [GitHub App permissions](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app) | Permisos por recurso; Contents para Git HTTP y Workflows separado | Limitar repos y operaciones; validar requisitos de cada endpoint |
| H2 | [GitHub App installation auth](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation) | Token temporal de instalación limitado a repos/permisos concedidos | Preferencia propuesta frente a credencial personal amplia |
| H3 | [Personal access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) | Alternativa con permisos y ciclo de vida propios | Token fine-grained acotado como alternativa si no se adopta App |
| G1 | [Google OAuth web server](https://developers.google.com/identity/protocols/oauth2/web-server) | Flujo de autorización para backend web, acceso offline, renovación y revocación | Conectar cuenta elegida sin entregar tokens al agente |
| G2 | [Gmail scopes](https://developers.google.com/workspace/gmail/api/auth/scopes) | Lectura, borradores y envío tienen alcances distintos | Comprobar privilegios reales; un permiso de borradores también puede permitir envío |
| G3 | [Drive scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth) | Acceso por archivos y acceso amplio requieren alcances distintos | Preferir archivos seleccionados si cubre el recorrido |
| G4 | [Calendar scopes](https://developers.google.com/workspace/calendar/api/auth) | Alcances de lectura y escritura diferenciados | Separar consultar agenda de crear o modificar eventos |

Los scopes definen lo que el proveedor permite; el gateway de Kershell debe aplicar además proyecto, propósito y autorización vigente. La existencia de OAuth no demuestra que `info@heykershell.com` sea un usuario Gmail autorizable: verificar si es buzón, alias o grupo antes de implementar su recorrido.

## Evidencia exigida en Fase 0

1. Registrar alternativas, versiones exactas y matriz de compatibilidad.
2. Ejecutar una tarea acotada en copia de prueba; obtener diff/artefacto y comprobación independiente.
3. Reanudar después de reinicio, recuperar stream desconectado y cancelar con confirmación del ejecutor.
4. Demostrar bloqueo de acceso fuera del workspace, herramientas no autorizadas y escrituras externas sin aprobación aplicable.
5. Comprobar método de autenticación, renovación, consumo y límites reales; no replicar sesiones como forma de ampliar cuota.
6. Impedir doble reclamación, duplicación de efectos y continuación de un runner antiguo tras perder su lease.
7. Probar recuperación representativa de datos y archivos de un fixture pequeño; no repetir efectos ya completados. El respaldo operativo y la restauración completa se verifican en F4-05.
8. Registrar resultados y seleccionar motor/runtime mediante ADR. Si faltan cuentas, dejar esa prueba pendiente explícita; no inventar un resultado.

Las pruebas de proveedor/repositorio continúan en Fase 1; las de investigación en Fase 3 y las de servidores/Google en Fase 4. El detalle y recursos necesarios están en [integraciones](integrations.md).
