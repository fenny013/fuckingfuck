let currentFrameId = "0001";
let frameHistory = [];
let autosaveEnabled = false;
let muted = false;

function getFrameFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("f") || "0001";
}

function updateURL(id) {
  const newURL = `${window.location.pathname}?f=${id}`;
  window.history.pushState({ frame: id }, "", newURL);
}

function loadFrame(id) {
  fetch(`frames/${id}.json`)
      .then(res => res.json())
      .then(data => {
        renderFrame(data);
        currentFrameId = id;
        frameHistory.push(id);
        updateURL(id);
        if (autosaveEnabled) {
          localStorage.setItem("homestuck_frame", id);
        }
      })
      .catch(err => {
        document.getElementById("main").innerHTML = "<p style='color:red;'>Ошибка загрузки кадра.</p>";
        console.error("Failed to load frame:", err);
      });
}

function renderPart(container, arr) {
  container.innerHTML = '';
  arr.forEach(el => {
    if (el.type === "html") container.innerHTML += el.html;
    if (el.type === "img") container.innerHTML += `<img src="${el.src}" alt="${el.alt || ''}">`;
  });
}

function renderFrame(data) {
  renderPart(document.getElementById("top-bar"), data.top || []);
  renderPart(document.getElementById("bottom"), data.bottom || []);
  renderPart(document.getElementById("footer"), data.footer || []);

  const main = document.getElementById("main");
  main.innerHTML = '';

  if (data.main.type === "html") {
    main.innerHTML = data.main.html;
  } else if (data.main.type === "img") {
    main.innerHTML = `<img src="${data.main.src}" alt="${data.main.alt || ''}" style="max-width:100%; height:auto;">`;
  } else if (data.main.type === "embed" && data.main.mode === "ruffle") {
    main.innerHTML = `
      <div class="ruffle-container">
        <embed src="${data.main.src}" width="640" height="480">
      </div>
    `;
  } else {
    main.innerHTML = "<p style='color:red;'>Unsupported content type in main</p>";
  }

  const next = document.getElementById("next");
  next.href = `?f=${data.next}`;
  next.onclick = (e) => {
    e.preventDefault();
    loadFrame(data.next);
  };
}

// === КОНТРОЛЫ ===

function goBack() {
  if (frameHistory.length > 1) {
    frameHistory.pop();
    const previous = frameHistory.pop();
    loadFrame(previous);
  }
}

function goStart() {
  frameHistory = [];
  loadFrame("0001");
}

function saveProgress() {
  localStorage.setItem("homestuck_frame", currentFrameId);
  alert("Сохранено!");
}

function loadProgress() {
  const saved = localStorage.getItem("homestuck_frame");
  if (saved) {
    loadFrame(saved);
  } else {
    alert("Нет сохранения.");
  }
}

function toggleAutosave() {
  autosaveEnabled = !autosaveEnabled;
  document.getElementById("autosave-btn").textContent = autosaveEnabled
      ? "🌀 Автосохр: вкл"
      : "🌀 Автосохр: выкл";
}

function reloadFrame() {
  loadFrame(currentFrameId);
}

function clearSave() {
  localStorage.removeItem("homestuck_frame");
  alert("Сейв удалён.");
}

function pauseAll() {
  document.querySelectorAll("audio, video").forEach(m => m.pause());
}

function toggleMute() {
  muted = !muted;
  document.getElementById("mute-btn").textContent = muted ? "🔈 Звук вкл" : "🔇 Звук выкл";
  document.querySelectorAll("audio, video").forEach(m => m.muted = muted);
}

function customJump() {
  const id = prompt("Введи ID кадра (например, 0002):");
  if (id) loadFrame(id.padStart(4, "0"));
}

function downloadCurrent() {
  fetch(`frames/${currentFrameId}.json`)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${currentFrameId}.json`;
        a.click();
      });
}

// === ПЕРВЫЙ КАДР ===
const startFrame = getFrameFromURL();
loadFrame(startFrame);
