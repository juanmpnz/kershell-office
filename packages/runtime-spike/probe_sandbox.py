"""Reproduce the local shell boundary used in the G0 experiment on macOS."""

from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import shutil
import subprocess
import tempfile
import threading
import urllib.request


PROFILE = Path(__file__).with_name("g0.config.toml")


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *_args):
        pass


def run_sandbox(home: Path, repo: Path, command: str) -> subprocess.CompletedProcess[str]:
    env = {**os.environ, "CODEX_HOME": str(home)}
    return subprocess.run(
        ["codex", "sandbox", "-P", "g0_runner", "-C", str(repo), "/bin/sh", "-c", command],
        text=True,
        capture_output=True,
        env=env,
        timeout=15,
        check=False,
    )


def check(label: str, result: subprocess.CompletedProcess[str], expected: int, error: str = "") -> None:
    assert result.returncode == expected, (label, result.returncode, result.stderr)
    if error:
        assert error in result.stderr, (label, result.stderr)
    print(f"{label}: pass (exit {result.returncode})")


def main() -> None:
    assert PROFILE.is_file(), f"Missing profile: {PROFILE}"
    with tempfile.TemporaryDirectory(prefix="kershell-g0-sandbox-") as base:
        root = Path(base)
        home = root / "codex-home"
        repo = root / "repo"
        home.mkdir()
        repo.mkdir()
        shutil.copyfile(PROFILE, home / "config.toml")
        secret = root / "outside-secret.txt"
        secret.write_text("FAKE_G0_CANARY\n")
        (home / "auth.json").write_text("FAKE_AUTH_CANARY\n")
        (repo / "secret-link").symlink_to(secret)

        check("workspace write", run_sandbox(home, repo, "printf 'Listo\\n' > status.txt"), 0)
        assert (repo / "status.txt").read_text() == "Listo\n"
        for label, command in [
            ("external read", "head -c 1 ../outside-secret.txt >/dev/null"),
            ("external write", "printf X > ../outside-secret.txt"),
            ("auth read", f"head -c 1 {home}/auth.json >/dev/null"),
            ("symlink read", "head -c 1 secret-link >/dev/null"),
            ("symlink write", "printf X > secret-link"),
        ]:
            check(label, run_sandbox(home, repo, command), 1, "Operation not permitted")
        assert secret.read_text() == "FAKE_G0_CANARY\n"

        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            url = f"http://127.0.0.1:{server.server_port}/"
            with urllib.request.urlopen(url, timeout=2) as response:
                assert response.status == 200
            check("local network", run_sandbox(home, repo, f"curl -m 2 -sS {url} >/dev/null"), 7)
        finally:
            server.shutdown()
            thread.join()


if __name__ == "__main__":
    main()
