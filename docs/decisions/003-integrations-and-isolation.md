# ADR-003 — Gateway de acciones, secretos y aislamiento

Estado: propuesto; validación ejecutable en F0-04 y F1-03/F1-06/F1-09.
Fecha: 2026-10-11.

## Contexto

Los equipos accederán a repositorios, proveedores, servidores y Google Workspace. El uso de shell y contenido externo exige límites ejecutables. Los proyectos actuales de Kershell no deben quedar expuestos a un ejecutor con permisos generales.

## Propuesta

El backend aplica permisos por rol, tarea, proyecto, herramienta y recurso. Un gateway realiza efectos externos con credenciales propias fuera de los checkouts. La aprobación se vincula a contenido, destino, identidad, alcance y versión; cambiar esos elementos invalida la autorización afectada.

Secretos cifrados y referencias en DB, clave maestra separada del repositorio y del backup SQL, UI de escritura sin lectura posterior. Revocar invalida nuevas acciones y evita volver a entregar credenciales a runners. Se prueba la separación real de procesos y de entornos del runtime, no sólo la ocultación visual del valor.

Runners separados de producción, identidades mínimas y recursos acotados. La conexión a servidores empieza como inventario y lectura; despliegues se convierten en operaciones acotadas con revisión. No exponer root, socket Docker o SSH general a los empleados.

Google se conecta mediante un flujo OAuth verificado con permisos mínimos y cuenta efectiva confirmada. Las acciones de lectura, preparar borrador, enviar y editar tienen capacidades separadas en la aplicación, aunque un scope del proveedor pueda ser más amplio.

## Alternativas consideradas

- Pasar todos los tokens al agente: facilita integración, pero permite caminos laterales de escritura y exfiltración.
- Pedir obediencia sólo por prompt: no bloquea herramientas ni protege datos por sí solo.
- Agentes en el host de producción con acceso administrador: concentra riesgos y dificulta atribuir acciones.
- Aprobar de nuevo cada acción rutinaria: no respeta autorizaciones vigentes y aumenta intervención; se usa autoridad registrada y acotada.

## Consecuencias

Hace falta un broker/gateway y pruebas negativas desde la primera tarea real. Las acciones con resultado incierto requieren reconciliación antes de repetir. Los conectores incompletos se muestran como no habilitados. La misma política se aplica si se adopta Paperclip.

Referencias: [arquitectura](../architecture.md), [integraciones](../integrations.md), [calidad](../quality-and-operations.md).
