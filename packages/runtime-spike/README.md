# Ensayo de aislamiento local para G0

En macOS con Codex CLI 0.162.1, ejecutar desde la raíz del repositorio:

```sh
python3 packages/runtime-spike/probe_sandbox.py
```

El script crea un `CODEX_HOME` y un checkout ficticio temporales, sin credenciales reales. Copia `g0.config.toml`, inicia un servidor HTTP local y comprueba escritura permitida, lectura/escritura externas denegadas, archivo de auth ficticio inaccesible, symlinks rechazados y red local bloqueada. Destruye el fixture al finalizar.

Este ensayo verifica la frontera de **comandos locales** de Codex. No demuestra límites de MCP/conectores, política de acciones externas, presupuesto, recursos del proceso, cancelación de worker ni recuperación de orquestación. Véase el [informe F0-04](../../docs/reports/f0-04-isolation-spike.md).
