---
name: office-architecture-review
description: Comparar decisiones técnicas de motor, runtime, datos o integraciones de Kershell Office y registrar un ADR con evidencia y revisión. Usar ante opciones costosas de revertir.
---

# Revisar una decisión de arquitectura

Leé el recorrido de producto afectado, el ADR vigente y la tarea activa. Usá documentación primaria actual para capacidades de proveedores y una prueba acotada cuando la decisión dependa de comportamiento real.

Definí alternativas que resuelvan el mismo escenario. Compará control de permisos, continuidad, coste medido/estimado, mantenimiento y efecto en la experiencia de Juan. Registrá pasa, falla o no probado para cada criterio; no conviertas una característica documentada en una prueba de Kershell.

Entregá o actualizá un ADR en `docs/decisions/` con contexto, decisión propuesta, evidencia, alternativas y consecuencias. Indicá fuente de autoridad para cada estado. QA y Seguridad revisan sus controles; el arquitecto no valida solo la ampliación de sus permisos o gasto.

La revisión acaba cuando la opción elegida cumple los controles obligatorios y existe un siguiente incremento implementable, o cuando se documenta exactamente qué prueba falta.
