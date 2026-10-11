import * as THREE from "three";
import "./style.css";

// Synthetic content only. This prototype never calls a backend or an agent.
const teams = [
  {
    id: "direction",
    name: "Dirección",
    status: "Disponible",
    color: 0xb2f156,
    line: "Organizando prioridades",
    project: "Cartera Kershell",
    objective: "Ordenar el trabajo de la semana",
    step: "Esperando una nueva prioridad",
    result: "Resumen semanal de ejemplo",
  },
  {
    id: "product",
    name: "Producto",
    status: "Sin configurar",
    color: 0x8fa7bd,
    line: "Aún sin capacidades",
    project: "Kershell Office",
    objective: "Definir el primer recorrido útil",
    step: "Perfil diseñado; conexión pendiente",
    result: "Mapa de experiencia de ejemplo",
  },
  {
    id: "development",
    name: "Desarrollo",
    status: "Necesita tu respuesta",
    color: 0xf6c77d,
    line: "Ediflow · filtros",
    project: "Ediflow (ejemplo)",
    objective: "Corregir filtros de búsqueda",
    step: "Esperando elección de prioridad",
    result: "Propuesta de cambio de ejemplo",
  },
  {
    id: "research",
    name: "Investigación",
    status: "Disponible",
    color: 0xb2f156,
    line: "Revisando oportunidades",
    project: "Mercado (ejemplo)",
    objective: "Evaluar una oportunidad",
    step: "Ficha sintética lista para revisar",
    result: "Ficha de oportunidad de ejemplo",
  },
  {
    id: "marketing",
    name: "Marketing",
    status: "Sin configurar",
    color: 0x8fa7bd,
    line: "Aún sin capacidades",
    project: "Sin proyecto",
    objective: "Preparar comunicación",
    step: "Requiere configuración",
    result: "Sin entregas",
  },
  {
    id: "sales",
    name: "Ventas",
    status: "Sin configurar",
    color: 0x8fa7bd,
    line: "Aún sin capacidades",
    project: "Sin proyecto",
    objective: "Explorar contactos",
    step: "Requiere configuración",
    result: "Sin entregas",
  },
];

const sceneWrap = document.querySelector("#scene-wrap");
const canvas = document.querySelector("#scene");
const overlay = document.querySelector("#scene-buttons");
const list = document.querySelector("#team-list");
const panel = document.querySelector("#team-panel");
const metric = document.querySelector("#scene-metric");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const drafts = new Map();
const state = {
  selected: null,
  tab: "now",
  concept: "spatial",
  list: false,
  view: "office",
};
const started = performance.now();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1d30);
scene.fog = new THREE.Fog(0x0b1d30, 22, 35);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
} catch {
  // Keep all team and navigation controls available without WebGL.
  state.list = true;
  sceneWrap.hidden = true;
  list.hidden = false;
  const toggle = document.querySelector("#list-toggle");
  toggle.classList.add("active");
  toggle.setAttribute("aria-pressed", "true");
  toggle.disabled = true;
  for (const button of document.querySelectorAll("#concept-a,#concept-b"))
    button.disabled = true;
}
scene.add(new THREE.AmbientLight(0xb6d9ff, 1.7));
const light = new THREE.DirectionalLight(0xffffff, 2.6);
light.position.set(-6, 12, 8);
light.castShadow = true;
light.shadow.mapSize.set(1024, 1024);
light.shadow.camera.left = -12;
light.shadow.camera.right = 12;
light.shadow.camera.top = 12;
light.shadow.camera.bottom = -12;
scene.add(light);

const mat = (color, metalness = 0) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.68, metalness });
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(16.5, 0.28, 10.5),
  mat(0x203a51),
);
floor.position.y = -0.19;
floor.receiveShadow = true;
scene.add(floor);
const floorInset = new THREE.Mesh(
  new THREE.PlaneGeometry(15.6, 9.6),
  mat(0x172e43),
);
floorInset.rotation.x = -Math.PI / 2;
floorInset.position.y = -0.035;
floorInset.receiveShadow = true;
scene.add(floorInset);
const grid = new THREE.GridHelper(15.3, 12, 0x396077, 0x2b4e63);
grid.position.y = -0.025;
scene.add(grid);

function cube(parent, size, position, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
const points = [
  [-5.1, -2.55],
  [0, -2.55],
  [5.1, -2.55],
  [-5.1, 2.55],
  [0, 2.55],
  [5.1, 2.55],
];
const labels = new Map();
teams.forEach((team, index) => {
  const [x, z] = points[index];
  const desk = new THREE.Group();
  desk.position.set(x, 0, z);
  scene.add(desk);
  cube(desk, [3.15, 0.2, 1.65], [0, 0.7, 0], mat(0x65829a));
  for (const dx of [-1.3, 1.3])
    for (const dz of [-0.55, 0.55])
      cube(desk, [0.1, 0.7, 0.1], [dx, 0.3, dz], mat(0x354e64));
  cube(desk, [1.05, 0.67, 0.08], [0, 1.16, -0.28], mat(0x10283b));
  cube(
    desk,
    [0.91, 0.52, 0.025],
    [0, 1.16, -0.225],
    new THREE.MeshStandardMaterial({
      color: 0x1f5060,
      emissive: team.color,
      emissiveIntensity: 0.27,
    }),
  );
  cube(desk, [0.48, 0.06, 0.29], [0, 0.87, 0.2], mat(0x263e51));
  cube(
    desk,
    [0.12, 0.12, 0.12],
    [1.25, 0.85, 0],
    new THREE.MeshStandardMaterial({
      color: team.color,
      emissive: team.color,
      emissiveIntensity: 0.7,
    }),
  );
  cube(desk, [1.1, 0.12, 0.65], [0, 0.28, 1.16], mat(0x3f6077));
  cube(desk, [1.1, 0.76, 0.12], [0, 0.66, 1.43], mat(0x4a6c83));
  const button = document.createElement("button");
  button.type = "button";
  button.className = "desk-button";
  button.dataset.team = team.id;
  button.setAttribute(
    "aria-label",
    `${team.name}: ${team.status}. ${team.line}`,
  );
  button.style.setProperty(
    "--status",
    `#${team.color.toString(16).padStart(6, "0")}`,
  );
  button.innerHTML = `<strong>${team.name}</strong><small><span class="status-dot"></span>${team.status}</small>`;
  button.addEventListener("click", () => selectTeam(team.id));
  overlay.append(button);
  labels.set(team.id, { position: new THREE.Vector3(x, 1.95, z), button });
});

function renderList() {
  list.replaceChildren();
  for (const team of teams) {
    const button = document.createElement("button");
    button.className = `list-item${state.selected === team.id ? " selected" : ""}`;
    button.innerHTML = `<span><strong>${team.name}</strong><small>${team.status} · ${team.line}</small></span><span class="arrow" aria-hidden="true">→</span>`;
    button.addEventListener("click", () => selectTeam(team.id));
    list.append(button);
  }
}

function renderPanel() {
  const team = teams.find((item) => item.id === state.selected);
  if (!team) return;
  const contents = {
    now: `<h3>Trabajo actual</h3><div class="field"><span class="label">Proyecto</span><p>${team.project}</p></div><div class="field"><span class="label">Objetivo</span><p>${team.objective}</p></div><div class="field"><span class="label">Paso actual</span><p>${team.step}</p></div><div class="field"><span class="label">Cola</span><p>Sin tareas reales en este prototipo.</p></div>`,
    conversation: `<h3>Conversación de ejemplo</h3><div class="message"><strong>KERSHELL OFFICE</strong>Esta vista demuestra cómo consultarías y dirigirías al equipo. No hay un agente conectado.</div><div class="message"><strong>${team.name.toUpperCase()}</strong>${team.line}. Estado sintético para evaluar el diseño.</div>`,
    results: `<h3>Resultados e historial</h3><div class="result"><span class="label">ENTREGA DE EJEMPLO</span>${team.result}</div><p>Los enlaces, pruebas y aprobaciones se mostrarán aquí cuando exista una ejecución real.</p>`,
  };
  panel.innerHTML = `<div class="panel-header"><span class="eyebrow">EQUIPO / ${team.name.toUpperCase()}</span><h2>${team.name}</h2><p>${team.status} · ${team.line}</p></div><div class="panel-tabs" role="tablist" aria-label="Detalle de ${team.name}"><button role="tab" data-tab="now" aria-selected="${state.tab === "now"}" class="${state.tab === "now" ? "active" : ""}">Ahora</button><button role="tab" data-tab="conversation" aria-selected="${state.tab === "conversation"}" class="${state.tab === "conversation" ? "active" : ""}">Conversación</button><button role="tab" data-tab="results" aria-selected="${state.tab === "results"}" class="${state.tab === "results" ? "active" : ""}">Resultados</button></div><div class="panel-body" role="tabpanel">${contents[state.tab]}</div><form class="compose"><label for="team-message">Mensaje para ${team.name} · ${team.project}</label><div class="compose-row"><input id="team-message" autocomplete="off" placeholder="Escribí una consulta o encargo…" value=""><button type="submit">Vista previa</button></div><div class="compose-hint">Solo boceto: el mensaje no se envía.</div></form>`;
  const input = panel.querySelector("input");
  input.value = drafts.get(team.id) || "";
  input.addEventListener("input", () => drafts.set(team.id, input.value));
  panel.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    panel.querySelector(".compose-hint").textContent =
      "Mensaje conservado en este boceto. No se envió ni se creó una tarea.";
  });
  panel.querySelectorAll("[data-tab]").forEach((button) =>
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      renderPanel();
      panel.querySelector(`[data-tab="${state.tab}"]`).focus();
    }),
  );
}

function selectTeam(id) {
  state.selected = id;
  state.tab = "now";
  if (state.view !== "office") showView("office");
  overlay
    .querySelectorAll(".desk-button")
    .forEach((button) =>
      button.classList.toggle("selected", button.dataset.team === id),
    );
  renderList();
  renderPanel();
  if (window.innerWidth < 1050)
    panel.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
      block: "start",
    });
}

function showView(view) {
  state.view = view;
  document
    .querySelectorAll("[data-view]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.view === view),
    );
  for (const name of ["office", "pending", "settings"])
    document.querySelector(`#${name}-view`).hidden = name !== view;
  if (view === "office") resize();
}
document
  .querySelectorAll("[data-view]")
  .forEach((button) =>
    button.addEventListener("click", () => showView(button.dataset.view)),
  );
document
  .querySelectorAll("[data-open-team]")
  .forEach((button) =>
    button.addEventListener("click", () => selectTeam(button.dataset.openTeam)),
  );
document.querySelector("#list-toggle").addEventListener("click", (event) => {
  state.list = !state.list;
  event.currentTarget.classList.toggle("active", state.list);
  event.currentTarget.setAttribute("aria-pressed", String(state.list));
  sceneWrap.hidden = state.list;
  list.hidden = !state.list;
  if (!state.list) resize();
});
for (const [id, concept] of [
  ["concept-a", "spatial"],
  ["concept-b", "plan"],
]) {
  document.querySelector(`#${id}`).addEventListener("click", () => {
    state.concept = concept;
    for (const button of document.querySelectorAll("#concept-a,#concept-b")) {
      const active = button.id === id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
    placeCamera();
  });
}

function placeCamera() {
  if (state.concept === "spatial") camera.position.set(11.8, 16.2, 15.7);
  else camera.position.set(0.01, 22, 9.6);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();
  positionLabels();
}
function resize() {
  if (!renderer || sceneWrap.hidden) return;
  const { width, height } = sceneWrap.getBoundingClientRect();
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
  positionLabels();
}
function positionLabels() {
  const { width, height } = sceneWrap.getBoundingClientRect();
  for (const { position, button } of labels.values()) {
    const p = position.clone().project(camera);
    button.style.left = `${((p.x + 1) * width) / 2}px`;
    button.style.top = `${((-p.y + 1) * height) / 2}px`;
  }
}
new ResizeObserver(resize).observe(sceneWrap);
placeCamera();
renderList();
let frames = 0;
let lastMeasure = performance.now();
function loop(now) {
  if (renderer && !sceneWrap.hidden && state.view === "office") {
    renderer.render(scene, camera);
    frames++;
    if (now - lastMeasure >= 1200) {
      const fps = Math.round((frames * 1000) / (now - lastMeasure));
      metric.textContent = `${fps} FPS · ${Math.round(performance.now() - started)} ms desde inicio`;
      frames = 0;
      lastMeasure = now;
    }
  } else {
    frames = 0;
    lastMeasure = now;
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
