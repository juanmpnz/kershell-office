---
name: office-integration-check
description: Diseñar y verificar un conector de Codex, GitHub, servidores o Google para Kershell Office con permisos acotados, diagnóstico y revocación. Usar al introducir o cambiar integraciones.
---

# Verificar una integración

Leé `docs/integrations.md` y la documentación oficial del proveedor para la versión y operación exactas. Identificá identidad conectada, proyecto permitido, capacidades, scopes, modo de cobro y cómo se revoca.

Escribí y probá primero el contrato de conexión y una consulta mínima. Guardá secretos por el mecanismo protegido, sin lectura del valor desde la UI o los logs. Probá una acción permitida y otra denegada desde la frontera real; un token válido no demuestra que el gateway limite el uso del agente.

Para escrituras externas, vinculá la autorización a recurso, destino y contenido. Si se pierde la respuesta tras enviar una acción, conciliá el estado remoto antes de repetir. Conservá idempotencia, resultado, versión de política y diagnóstico comprensible.

Entregá versión, identidad, permisos efectivos, pruebas, limitaciones y procedimiento de rotación/revocación. No declares «Listo» un conector que sólo funciona con mock.
