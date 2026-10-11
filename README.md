# Kershell Office

Oficina interna 3D para dirigir los proyectos, equipos de agentes e investigación comercial de Kershell TI. Juan selecciona un equipo, entiende su trabajo y conversa con él; el sistema ejecuta tareas autorizadas y entrega resultados verificables.

## Estado — 11 de octubre de 2026

Fase 0 en curso: perfiles y skills de construcción, boceto 3D navegable y pruebas locales acotadas de los motores. La aplicación operativa, los agentes de la oficina y las conexiones todavía no están implementados. No se activan investigaciones programadas ni se conectan cuentas o servidores de Kershell.

## Empezar aquí

1. [Plan de desarrollo](tasks/plan.md): fases, decisiones y demostraciones de cierre.
2. [Tareas de implementación](tasks/todo.md): responsables, dependencias, aceptación y verificación.
3. [Producto y experiencia 3D](docs/product.md): alcance y comportamiento de la oficina.
4. [Contexto y trazabilidad](docs/context.md): requisitos extraídos de «Oficina IA viable».

## Documentación técnica

| Documento | Contenido |
|---|---|
| [Arquitectura](docs/architecture.md) | Componentes, datos, ejecución y contratos iniciales |
| [Equipos y agentes](docs/agents.md) | Equipo fundador, departamentos y contratos de responsabilidad |
| [Harness de desarrollo](docs/harness.md) | Instrucciones, perfiles, skills y flujo de trabajo |
| [Configuración e integraciones](docs/integrations.md) | Codex, repositorios, servidores y Google Workspace |
| [Investigación de mercado](docs/research.md) | Proceso diario, evaluación y decisiones |
| [Calidad y operación](docs/quality-and-operations.md) | Pruebas, seguridad, presupuesto y recuperación |
| [Decisiones de arquitectura](docs/decisions/README.md) | Qué está fijado y qué debe verificarse |
| [Fuentes técnicas](docs/sources.md) | Documentación primaria consultada y límites de las referencias |

## Desarrollo

La [lista de tareas](tasks/todo.md) y los [informes de Fase 0](docs/reports/) muestran avance y límites. Los comandos del boceto están en [su README](packages/office-scene/README.md); los de la aplicación se crearán en F1-01. Las pruebas técnicas de Fase 0 resuelven el motor y el runner antes de instalar la base de la aplicación.

La propuesta usa una aplicación web propia y ejecución aislada en servidor, con evaluación temprana de Paperclip. La experiencia 3D se desarrolla desde el primer recorrido funcional. Elegir una biblioteca o registrar un perfil no significa tener un empleado operativo.

Las estimaciones y opciones técnicas del plan son propuestas revisables. No contienen credenciales, inventario privado de servidores ni datos de clientes.
