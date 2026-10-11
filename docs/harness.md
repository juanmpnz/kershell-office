# Harness del equipo constructor

Estado: especificación y configuración inicial de F0-01. `AGENTS.md` sirve como entrada de contexto; seis perfiles y seis skills están en el repositorio, pero su uso operativo como subagentes permanece pendiente de prueba efectiva. Ver [informe F0-01](reports/f0-01-harness.md).

## Responsabilidades

El Product Lead mantiene requisitos y alcance. Principal Engineer dirige decisiones técnicas y reparto. Backend/Agent Systems, UX/Frontend 3D y Security/DevOps implementan por áreas. QA/Evaluation revisa evidencias de forma independiente. Sus contratos profesionales están en [agentes](agents.md).

El harness ayuda a construir Kershell Office. Los permisos y empleados que funcionarán dentro de la aplicación se implementan en el backend y en el runner, no mediante este archivo.

## Archivos previstos

| Archivo | Función y verificación |
|---|---|
| `AGENTS.md` | Entrada corta, orden de lectura y límites; ya creado |
| `.codex/config.toml` | Registro de perfiles con sintaxis oficial de la versión fijada; probar que Codex lo carga |
| `.codex/agents/*.toml` | Especialidad, instrucciones, recursos y límites de herramientas soportados |
| `.agents/skills/<nombre>/SKILL.md` | Procedimiento reutilizable con trigger, entradas, pasos y verificación |
| `docs/decisions/*.md` | Decisiones con alternativas y consecuencias |
| `tasks/todo.md` | Fuente de tareas y criterios de cierre |
| `docs/reports/` | Evidencia de spikes, evaluaciones y gates, sin datos sensibles |

No se inventan opciones TOML ni se copia la configuración personal del desarrollador. Cada perfil se valida con una invocación acotada y un trabajo de fixture antes de llamarlo operativo. Se registra modelo disponible y presupuesto; el nombre del rol no impone un modelo permanente.

## Skills del proyecto que se crearán

| Skill | Cuándo usarla | Entregable y control |
|---|---|---|
| `office-plan-task` | Convertir pedido autorizado en incremento | Alcance, dependencias, criterios y prueba; no ampliar permisos |
| `office-architecture-review` | Elegir motor, runtime o cambiar contrato | ADR, fuentes actuales, alternativas y revisión QA/seguridad |
| `office-implement-slice` | Ejecutar tarea del backlog | Cambio mínimo, verificación y resumen revisable |
| `office-verify-delivery` | Revisar un resultado | Evidencia reproducible, defectos y aceptación/rechazo |
| `office-integration-check` | Incorporar o cambiar conector | Identidad, scopes, revocación, errores e intento denegado |
| `office-research-opportunity` | Diseñar o evaluar investigación | Fuentes, hechos/hipótesis, objeciones y siguiente decisión |

Cada skill describe entradas obligatorias, archivos de referencia, salida esperada, pasos, condición de parada y autoridad. No guarda secretos ni duplica la especificación completa. Se evalúa con un caso positivo y otro de ámbito/permiso incorrecto.

## Flujo de una tarea

1. Seleccionar una tarea preparada; cargar sus referencias y comprobar dependencias.
2. Declarar responsable, archivos propios, criterio de cierre y presupuesto de prueba.
3. Para una decisión técnica nueva, redactar ADR y someterlo a QA/seguridad cuando corresponda.
4. Implementar una porción pequeña; contratos compartidos antes de consumidores.
5. Verificar comportamiento y casos de fallo relevantes sobre fixtures aislados. Revisión visual en navegador para UI.
6. Revisar diff y permisos; corregir hallazgos concretos; actualizar tarea y evidencia.
7. Crear un commit coherente y entregar resultado para revisión. Publicación/despliegue siguen sus autorizaciones.

La aprobación del plan no implica activar cuentas, envíos o producción. Las tareas de desarrollo ya autorizadas no necesitan una confirmación repetida para decisiones rutinarias dentro de alcance.

## Delegación

Se delegan contratos, frontend, documentación y evaluación independientes con propiedad explícita. Nadie edita simultáneamente una migración, configuración común o mismo archivo. Cambios sobre un producto conectado usan checkouts aislados; el integrador aplica una revisión y merge secuencial.

El Principal Engineer coordina y resuelve conflictos de contrato. No revisa como único aprobador una ampliación de sus propios permisos. Los especialistas devuelven artefactos y bloqueos con referencias, no simplemente una opinión de conformidad.

## Comandos y estilo previstos

F1-01 creará `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm test:e2e`. No están disponibles en esta entrega documental, que se verifica mediante documentos, enlaces, diff y coherencia de dependencias. Fase 0 sí ejecutará invocaciones y spikes acotados; cada informe guardará los comandos reales de su entorno temporal y las evidencias, aunque todavía no existan los scripts de aplicación.

TypeScript estricto; nombres concretos, contratos validados en fronteras, errores uniformes y funciones pequeñas. Ejemplo orientativo de estilo para un contrato futuro, no implementación instalada:

```typescript
type ControlRequest = {
  taskId: string;
  action: "pause" | "resume" | "cancel";
  expectedVersion: number;
  idempotencyKey: string;
};
```

## Definition of Done

Una tarea cumple su aceptación, aporta evidencia proporcional al riesgo, conserva permisos/aislamiento y actualiza documentación y seguimiento. Para código se requieren pruebas dirigidas, compilación y tipos según los scripts reales. Para UI se revisa el flujo en navegador y acceso con teclado. Para integraciones se comprueba un permiso denegado y una revocación.

Un perfil o skill está habilitado sólo tras validación real. La lista de tareas comienza pendiente; escribir el plan no cierra los spikes ni el desarrollo.
