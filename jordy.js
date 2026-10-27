(() => {
const catalog = [
  { id: 1, name: "Miel pura de abeja", category: "Alimentos", emoji: "🍯", color: "#ead8b7", deltas: { food: 1, energy: 1, clean: 0, joy: 2, health: 0.5 }, effect: "+1% alimentación · +1% energía · +0% aseo · +2% ánimo · +0.5% salud", comment: "¡Qué rica miel! Me siento con más energía 🍯" },
  { id: 2, name: "Café de altura", category: "Alimentos", emoji: "☕", color: "#d7c6b7", deltas: { food: 3, energy: 9, clean: 0, joy: -3, health: -4 }, effect: "+3% alimentación · +9% energía · 0% aseo · −3% ánimo · −4% salud", comment: "¡Ese cafecito sí despierta! ☕" },
  { id: 3, name: "Bolso tejido a mano", category: "Moda", emoji: "👜", color: "#e5c4a6", care: "joy", amount: 22, effect: "+22 ánimo", comment: "¡Qué bonito regalo! Me encanta 👜" },
  { id: 4, name: "Maceta de barro", category: "Hogar", emoji: "🪴", color: "#d4dfc4", care: "energy", amount: 20, effect: "+20 energía", comment: "Esta maceta hace mi habitación más acogedora 🪴" },
  { id: 5, name: "Jabón de hierbas", category: "Belleza", emoji: "🧼", color: "#e5e2bd", deltas: { energy: -1, clean: 67, joy: -4, health: 8 }, effect: "−1% energía · +67% aseo · −4% ánimo · +8% salud", comment: "Ay… no me gusta bañarme, pero ya estoy limpio 😖🧼" },
  { id: 6, name: "Chocolate artesanal", category: "Alimentos", emoji: "🍫", color: "#ddc4b0", deltas: { food: 3, energy: 14, clean: -2, joy: 16, health: -7 }, effect: "+3% alimentación · +14% energía · −2% aseo · +16% ánimo · −7% salud", comment: "¡Chocolate artesanal! Qué rico, me alegra el día 🍫" },
  { id: 7, name: "Audífonos inalámbricos", category: "Tecnología", emoji: "🎧", color: "#cbd8d7", deltas: { energy: 8, clean: -3, joy: 18, health: -2 }, effect: "+8% energía · −3% aseo · +18% ánimo · −2% salud", comment: "¡Mi música favorita suena genial! 🎧" },
  { id: 8, name: "Vela aromática", category: "Hogar", emoji: "🕯️", color: "#ead9c2", care: "joy", amount: 18, effect: "+18 ánimo", comment: "Qué bien huele mi hogar 🕯️" },
  { id: 9, name: "Manzana de Cayhuayna", category: "Alimentos", emoji: "🍎", color: "#f0d4c7", deltas: { food: 12, energy: 2, clean: 0, joy: 3, health: 2 }, effect: "+12% alimentación · +2% energía · +3% ánimo · +2% salud", comment: "¡Qué crujiente! Esta manzana está buenísima 🍎" },
  { id: 10, name: "Sándwich casero", category: "Alimentos", emoji: "🥪", color: "#e8d9b7", deltas: { food: 20, energy: 5, clean: -2, joy: 6, health: 3 }, effect: "+20% alimentación · +5% energía · −2% aseo · +6% ánimo · +3% salud", comment: "¡Un sándwich completito! Ya no tengo hambre 🥪" },
  { id: 11, name: "Jugo natural", category: "Alimentos", emoji: "🧃", color: "#f1dfb2", deltas: { food: 7, energy: 12, clean: -1, joy: 5, health: 2 }, effect: "+7% alimentación · +12% energía · −1% aseo · +5% ánimo · +2% salud", comment: "¡Qué rico jugo! Me refrescó un montón 🧃" },
  { id: 12, name: "Agua fresca", category: "Alimentos", emoji: "🥤", color: "#d0e8df", deltas: { food: 4, energy: 6, clean: 5, joy: 3, health: 4 }, effect: "+4% alimentación · +6% energía · +5% aseo · +3% ánimo · +4% salud", comment: "¡Glup, glup! Ya estoy bien hidratado 🥤" },
  { id: 13, name: "Pelota de fútbol", category: "Juguetes", emoji: "⚽", color: "#d9e4cf", deltas: { energy: -5, clean: -3, joy: 15, health: 1 }, effect: "−5% energía · −3% aseo · +15% ánimo · +1% salud", comment: "¡Pásamela! Me encanta jugar a la pelota ⚽" },
  { id: 14, name: "Peluche abrazable", category: "Juguetes", emoji: "🧸", color: "#e7d8cf", deltas: { energy: 3, clean: 1, joy: 12, health: 3 }, effect: "+3% energía · +1% aseo · +12% ánimo · +3% salud", comment: "¡Qué suavecito! Ahora tengo un nuevo amigo 🧸" },
  { id: 15, name: "Cama acogedora", category: "Hogar", emoji: "🛏️", color: "#d8dfed", deltas: { energy: 25, clean: 2, joy: 5, health: 6 }, effect: "+25% energía · +2% aseo · +5% ánimo · +6% salud", comment: "¡Esta cama es comodísima! Voy a descansar 🛏️" },
  { id: 16, name: "Cepillo suave", category: "Belleza", emoji: "🪥", color: "#d2e5db", deltas: { energy: -1, clean: 35, joy: 4, health: 1 }, effect: "−1% energía · +35% aseo · +4% ánimo · +1% salud", comment: "¡Cepillado listo! Me siento más aseado 🪥" },
  { id: 17, name: "Pera del huerto", category: "Alimentos", emoji: "🍐", color: "#e4e9b8", deltas: { food: 9, energy: 2, clean: 0, joy: 4, health: 2 }, effect: "+9% alimentación · +2% energía · +4% ánimo · +2% salud", comment: "¡Dulce y jugosa! 🍐" },
  { id: 18, name: "Sopa casera", category: "Alimentos", emoji: "🍲", color: "#efd5ad", deltas: { food: 22, energy: 4, clean: -1, joy: 8, health: 5 }, effect: "+22% alimentación · +4% energía · −1% aseo · +8% ánimo · +5% salud", comment: "Esta sopita calentita me hizo bien 🍲" },
  { id: 19, name: "Galletas de avena", category: "Alimentos", emoji: "🍪", color: "#ead1ac", deltas: { food: 8, energy: 7, clean: -1, joy: 5, health: 1 }, effect: "+8% alimentación · +7% energía · −1% aseo · +5% ánimo · +1% salud", comment: "¡Crujientes y ricas! 🍪" },
  { id: 20, name: "Cometa colorida", category: "Juguetes", emoji: "🪁", color: "#d6e6dc", deltas: { energy: -7, clean: -2, joy: 20, health: 1 }, effect: "−7% energía · −2% aseo · +20% ánimo · +1% salud", comment: "¡Mira cómo vuela la cometa! 🪁" },
  { id: 21, name: "Perfume de lavanda", category: "Belleza", emoji: "🪻", color: "#e4d9ec", deltas: { energy: 2, clean: 22, joy: 8, health: 0 }, effect: "+2% energía · +22% aseo · +8% ánimo", comment: "Huele a lavanda y calma un montón 🪻" },
  { id: 30, name: "Poción saciante", category: "Laboratorio", emoji: "🧪", color: "#d8e9b7", potion: "hunger", effect: "Evita que baje la alimentación durante 2 horas", comment: "¡Barriga llena por mucho tiempo! 🧪" },
  { id: 31, name: "Poción de pausa", category: "Laboratorio", emoji: "⚗️", color: "#d2e5ed", potion: "energy", effect: "Evita que baje la energía durante 26 minutos", comment: "Puedo seguir despierto un rato más ⚗️" },
  { id: 32, name: "Poción de inmunidad", category: "Laboratorio", emoji: "🛡️", color: "#e5dcf0", potion: "immunity", effect: "Evita daño a la salud durante 20 minutos", comment: "¡Me siento protegido! 🛡️" },
  { id: 33, name: "Poción desconocida", category: "Laboratorio", emoji: "❔", color: "#e9d5e4", potion: "unknown", effect: "Efecto aleatorio: puede ayudar o salir mal", comment: "No sé qué va a pasar… ¡glup! ❔" },
  { id: 34, name: "Elixir secreto", category: "Laboratorio", emoji: "✨", color: "#e8dfaa", potion: "secret", effect: "Saciedad 2 h + energía protegida 26 min + inmunidad 20 min", comment: "¡La fórmula secreta funciona! ✨" },
];

const defaults = { food: 72, energy: 78, clean: 74, joy: 80, health: 100, updatedAt: Date.now(), dayStartedAt: Date.now(), energyClockAt: Date.now(), energyDrainMs: 0, sleepRecoveryMs: 0 };
let state = JSON.parse(localStorage.getItem("market-jordy-care") || "null") || defaults;
if (typeof state.health !== "number") state.health = 100;
state.dayStartedAt = Number(state.dayStartedAt) || Number(state.updatedAt) || Date.now();
state.energyClockAt = Number(state.energyClockAt) || Number(state.updatedAt) || Date.now();
state.energyDrainMs = Math.max(0, Number(state.energyDrainMs) || 0);
state.sleepRecoveryMs = Math.max(0, Number(state.sleepRecoveryMs) || 0);
const decayStart = Date.now();
state.lastDecay ||= {};
["food", "energy", "clean", "joy"].forEach((key) => { if (!Number.isFinite(state.lastDecay[key])) state.lastDecay[key] = decayStart; });
state.lastDamage ||= {};
state.damageTier ||= {};
["food", "energy", "clean"].forEach((key) => {
  if (!Number.isFinite(state.lastDamage[key])) state.lastDamage[key] = decayStart;
  if (typeof state.damageTier[key] !== "string") state.damageTier[key] = "";
});
localStorage.setItem("market-jordy-care", JSON.stringify(state));
let inventory = JSON.parse(localStorage.getItem("market-jordy-inventory") || "{}");
let toastTimer;
let petAnimation;
let gameOver = false;
let bubbleOverrideUntil = 0;
let idleQueue = [];
let idleMessageShowing = false;
let idleMessageToken = 0;
let idleViewActive = false;
const idlePrompts = [
  { text: "Ya es hora mano", interval: 30_000 },
  { text: "Cara de malo", interval: 45_000 },
  { text: "¿Te meneo la patita?", interval: 120_000 },
];
let idleNextAt = idlePrompts.map((prompt) => Date.now() + prompt.interval);

function clamp(value) { return Math.max(0, Math.min(100, value)); }
function clampHealth(value) { return Math.max(0, Math.min(200, value)); }
function saveState() { state.updatedAt = Date.now(); localStorage.setItem("market-jordy-care", JSON.stringify(state)); renderNeeds(); showDeathScreen(); }

function showDeathScreen() {
  if (gameOver || Number(state.health) > 0) return;
  gameOver = true;
  document.body.classList.add("game-over");
  document.querySelector("#death-overlay").hidden = false;
  document.querySelector("#death-reset").focus();
}

function resetJordy() {
  const now = Date.now();
  window.jordyProgress?.resetGame();
  state = { ...defaults, updatedAt: now, dayStartedAt: now, energyClockAt: now, energyDrainMs: 0, sleepRecoveryMs: 0, lastDecay: {}, lastDamage: {}, damageTier: {} };
  ["food", "energy", "clean", "joy"].forEach((key) => { state.lastDecay[key] = now; });
  ["food", "energy", "clean"].forEach((key) => { state.lastDamage[key] = now; state.damageTier[key] = ""; });
  gameOver = false;
  document.body.classList.remove("game-over");
  document.querySelector("#death-overlay").hidden = true;
  saveState();
  document.querySelector("#pet-thought").textContent = "¡Volví! Gracias por darme otra oportunidad ♡";
}

function applyTime() {
  const now = Date.now();
  const rates = { energy: [12000, 1], food: [21000, 4], clean: [14000, 1], joy: [30000, 3] };
  let changed = false;
  const sleepTotal = (time) => {
    const elapsed = Math.max(0, time - state.dayStartedAt);
    const hour = 60 * 60 * 1000;
    const sleepPerDay = 15 * 60 * 1000;
    const withinHour = elapsed % hour;
    return Math.floor(elapsed / hour) * sleepPerDay + Math.max(0, Math.min(sleepPerDay, withinHour - 45 * 60 * 1000));
  };
  Object.entries(rates).forEach(([key, [interval, loss]]) => {
    if (key === "energy") {
      const from = Math.min(now, Number(state.energyClockAt) || now);
      const elapsed = Math.max(0, now - from);
      const slept = Math.max(0, sleepTotal(now) - sleepTotal(from));
      const awake = Math.max(0, elapsed - slept);
      state.sleepRecoveryMs += slept;
      const recovery = Math.floor(state.sleepRecoveryMs / 60000);
      if (recovery > 0) { state.energy = clamp(Number(state.energy || 0) + recovery); state.sleepRecoveryMs %= 60000; changed = true; }
      if ((state.effects?.energyUntil || 0) <= now) {
        state.energyDrainMs += awake;
        const drain = Math.floor(state.energyDrainMs / interval);
        if (drain > 0) { state.energy = clamp(Number(state.energy || 0) - drain * loss); state.energyDrainMs %= interval; changed = true; }
      }
      state.energyClockAt = now;
      return;
    }
    if (key === "food" && (state.effects?.hungerUntil || 0) > now) { state.lastDecay[key] = now; return; }
    const cycles = Math.floor((now - state.lastDecay[key]) / interval);
    if (cycles > 0) {
      state[key] = clamp(Number(state[key] || 0) - cycles * loss);
      state.lastDecay[key] += cycles * interval;
      changed = true;
    }
  });
  const damageRules = {
    food: (value) => value <= 0 ? ["zero", 5000, 45] : value <= 15 ? ["low", 5000, 18] : null,
    energy: (value) => value <= 0 ? ["zero", 15000, 12] : value <= 10 ? ["low", 20000, 6] : null,
    clean: (value) => value <= 0 ? ["zero", 14000, 7] : value <= 10 ? ["low", 15000, 13] : null,
  };
  Object.entries(damageRules).forEach(([key, rule]) => {
    const tier = rule(Number(state[key] || 0));
    const tierName = tier ? tier[0] : "";
    if (state.damageTier[key] !== tierName) {
      state.damageTier[key] = tierName;
      state.lastDamage[key] = now;
      changed = true;
      return;
    }
    if (!tier || Number(state.health) <= 0) return;
    if ((state.effects?.immunityUntil || 0) > now) { state.lastDamage[key] = now; return; }
    const [, interval, damage] = tier;
    const cycles = Math.floor((now - state.lastDamage[key]) / interval);
    if (cycles > 0) {
      state.health = clampHealth(Number(state.health) - cycles * damage);
      state.lastDamage[key] += cycles * interval;
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem("market-jordy-care", JSON.stringify(state));
    renderNeeds();
  }
  showDeathScreen();
}

function caption(value, high, mid, low) { return value >= 70 ? high : value >= 35 ? mid : low; }

function renderNeeds() {
  const needs = [
    ["food", "food", "food-caption", "Está satisfecho", "Tiene un poco de hambre", "¡Necesita comer algo!"],
    ["energy", "energy", "energy-caption", "Está lleno de energía", "Le vendría bien descansar", "Está muy cansado"],
    ["clean", "clean", "clean-caption", "Se siente fresquito", "Quiere asearse un poco", "¡Hora de un baño!"],
    ["joy", "joy", "joy-caption", "Está de buen humor", "Quiere un poco de atención", "¡Está algo aburrido!"],
  ];
  needs.forEach(([key, bar, captionId, high, mid, low]) => {
    const value = clamp(Math.round(state[key]));
    document.querySelector(`#${key}-value`).textContent = `${value}%`;
    document.querySelector(`#${bar}-bar`).style.width = `${value}%`;
    document.querySelector(`#${captionId}`).textContent = caption(value, high, mid, low);
  });
  const hp = clampHealth(Number(state.health));
  document.querySelector("#health-value").textContent = `${Number.isInteger(hp) ? hp : hp.toFixed(1)}% / 200%`;
  document.querySelector("#health-bar").style.width = `${hp / 2}%`;
  document.querySelector("#health-caption").textContent = hp >= 120 ? "Se siente muy saludable" : hp >= 60 ? "Se siente saludable" : "Necesita que lo cuides";
  const elapsedWorld = Math.max(0, Date.now() - state.dayStartedAt);
  const dayNumber = Math.floor(elapsedWorld / 3600000) + 1;
  const isSleeping = elapsedWorld % 3600000 >= 45 * 60 * 1000;
  const dayBadge = document.querySelector("#game-day");
  const sleepLabel = document.querySelector("#sleep-status");
  if (dayBadge) dayBadge.textContent = dayNumber;
  const headerDay = document.querySelector("#game-day-header");
  const headerSleep = document.querySelector("#sleep-status-header");
  if (headerDay) headerDay.textContent = dayNumber;
  if (headerSleep) headerSleep.textContent = isSleeping ? "Durmiendo 😴" : "Despierto";
  if (sleepLabel) sleepLabel.textContent = isSleeping ? "Durmiendo 😴" : "Despierto";
  const miniDay = document.querySelector("#mini-day");
  if (miniDay) miniDay.textContent = "Día " + dayNumber + (isSleeping ? " · Durmiendo 😴" : " · Despierto");
  document.body.classList.toggle("jordy-sleeping", isSleeping);
  const lowest = Math.min(state.food, state.energy, state.clean, state.joy);
  document.querySelector("#mood-label").textContent = caption(lowest, "Jordy está feliz", "Jordy quiere un poquito de cuidado", "Jordy necesita tu ayuda");
  if (Date.now() >= bubbleOverrideUntil) {
    document.querySelector("#pet-thought").textContent = lowest < 35 ? "¿Me ayudas un poquito?" : lowest < 70 ? "¿Qué hacemos hoy?" : "¡Hola! Me siento genial.";
  }
}

function showNextIdleMessage() {
  if (idleMessageShowing || !idleQueue.length || gameOver) return;
  idleMessageShowing = true;
  const token = ++idleMessageToken;
  document.querySelector("#pet-thought").textContent = idleQueue.shift();
  bubbleOverrideUntil = Date.now() + 3800;
  setTimeout(() => {
    if (token !== idleMessageToken) return;
    idleMessageShowing = false;
    showNextIdleMessage();
  }, 3800);
}

function tickIdleMessages() {
  const now = Date.now();
  if (gameOver || document.body.dataset.view !== "jordy") {
    idleViewActive = false;
    idleQueue = [];
    idleMessageShowing = false;
    idleMessageToken += 1;
    bubbleOverrideUntil = 0;
    idleNextAt = idlePrompts.map((prompt) => now + prompt.interval);
    return;
  }
  if (!idleViewActive) {
    idleViewActive = true;
    idleNextAt = idlePrompts.map((prompt) => now + prompt.interval);
  }
  idlePrompts.forEach((prompt, index) => {
    if (now < idleNextAt[index]) return;
    idleQueue.push(prompt.text);
    const elapsedIntervals = Math.floor((now - idleNextAt[index]) / prompt.interval) + 1;
    idleNextAt[index] += elapsedIntervals * prompt.interval;
  });
  showNextIdleMessage();
}

function showToast(text) {
  const toast = document.querySelector("#toast");
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function useProduct(id) {
  if (gameOver || Number(state.health) <= 0) return;
  const product = catalog.find((item) => item.id === Number(id));
  if (!product || !inventory[id]) return;
  inventory[id] -= 1;
  if (inventory[id] <= 0) delete inventory[id];
  localStorage.setItem("market-jordy-inventory", JSON.stringify(inventory));
  if (product.potion) {
    const now = Date.now();
    state.effects ||= {};
    if (product.potion === "hunger") state.effects.hungerUntil = now + 2 * 60 * 60 * 1000;
    if (product.potion === "energy") state.effects.energyUntil = now + 26 * 60 * 1000;
    if (product.potion === "immunity") state.effects.immunityUntil = now + 20 * 60 * 1000;
    if (product.potion === "secret") {
      state.effects.hungerUntil = now + 2 * 60 * 60 * 1000;
      state.effects.energyUntil = now + 26 * 60 * 1000;
      state.effects.immunityUntil = now + 20 * 60 * 1000;
    }
    if (product.potion === "unknown") {
      const outcomes = [
        { text: "¡Brillo mágico! Recuperé salud ✨", apply: () => { state.health = clampHealth(state.health + 45); state.joy = clamp(state.joy + 20); } },
        { text: "¡Me siento renovado! ⚡", apply: () => { state.energy = clamp(state.energy + 40); state.food = clamp(state.food + 20); } },
        { text: "¡Uy! Me cayó pesada 🤢", apply: () => { state.health = clampHealth(state.health - 35); state.joy = clamp(state.joy - 18); } },
        { text: "¡Sobreviví por poquito! 😵", apply: () => { state.health = clampHealth(state.health - 75); state.energy = clamp(state.energy - 35); } },
        { text: "¡La poción salió fatal! 💀", apply: () => { state.health = 0; } },
      ];
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      outcome.apply();
      product.comment = outcome.text;
    }
  } else if (product.deltas) {
    Object.entries(product.deltas).forEach(([need, delta]) => {
      state[need] = need === "health" ? clampHealth(Number(state[need] || 0) + delta) : clamp(Number(state[need] || 0) + delta);
    });
  } else {
    state[product.care] = clamp(state[product.care] + product.amount);
    if (product.care === "food") state.joy = clamp(state.joy + 4);
    if (product.care === "energy") state.joy = clamp(state.joy + 3);
  }
  saveState();
  renderInventory();
  const thoughts = { food: "¡Qué rico! Gracias 🍽️", energy: "Me siento descansado ☀️", clean: "¡Qué fresquito! ✨", joy: "¡Esto me encanta! ♡" };
  document.querySelector("#pet-thought").textContent = product.comment || thoughts[product.care];
  const petSprite = document.querySelector(".jordy-image");
  petSprite.classList.remove("pet-react");
  void petSprite.offsetWidth;
  petSprite.classList.add("pet-react");
  window.setTimeout(() => petSprite.classList.remove("pet-react"), 950);
  const coinReward = product.category === "Alimentos" ? 3 : 2;
  window.jordyProgress?.addCoins(coinReward);
  window.jordyProgress?.awardXP(product.category === "Alimentos" ? 5 : 2);
  showToast(`${product.name}: ${product.effect} · +${coinReward} monedas · +${product.category === "Alimentos" ? 5 : 2} XP`);
}

function renderInventory() {
  const grid = document.querySelector("#inventory-grid");
  const items = catalog.filter((item) => inventory[item.id] > 0);
  document.querySelector("#inventory-empty").hidden = items.length > 0;
  grid.innerHTML = items.map((item) => `<article class="inventory-item"><div class="inventory-emoji" style="background:${item.color}">${item.emoji}</div><div class="inventory-info"><span>${item.category}</span><h3>${item.name}</h3><small>${item.effect}</small></div><div class="inventory-use"><b>×${inventory[item.id]}</b><button data-use="${item.id}">Usar</button></div></article>`).join("");
  grid.querySelectorAll("[data-use]").forEach((button) => button.addEventListener("click", () => useProduct(button.dataset.use)));
}

document.querySelector("#pet-button").addEventListener("click", () => {
  if (gameOver || Number(state.health) <= 0) return;
  state.joy = clamp(Number(state.joy || 0) + 2);
  state.clean = clamp(Number(state.clean || 0) - 2);
  saveState();
  window.jordyProgress?.awardXP(1);
  window.jordyProgress?.addCoins(1);
  const jordy = document.querySelector(".jordy-image");
  if (petAnimation) petAnimation.cancel();
  if (jordy.animate) {
    petAnimation = jordy.animate([
      { transform: "translateX(-50%) translateY(0) rotate(0) scale(1)" },
      { transform: "translateX(-50%) translateY(-30px) rotate(-6deg) scale(1.045)", offset: 0.32 },
      { transform: "translateX(-50%) translateY(0) rotate(4deg) scale(1.015)", offset: 0.68 },
      { transform: "translateX(-50%) translateY(-8px) rotate(0) scale(1)" },
    ], { duration: 780, easing: "cubic-bezier(.2,.75,.3,1)" });
  }
  const room = document.querySelector("#pet-room");
  room.querySelector(".mood-gain")?.remove();
  const gain = document.createElement("span");
  gain.className = "mood-gain";
  gain.textContent = "+2 ánimo · −2 aseo";
  room.appendChild(gain);
  gain.addEventListener("animationend", () => gain.remove(), { once: true });
  document.querySelector("#pet-thought").textContent = "¡Je, je! Eso me gusta ♡";
  showToast(`Acariciaste a Jordy · +2% ánimo · −2% aseo`);
});

document.querySelector("#death-reset").addEventListener("click", resetJordy);

window.addEventListener("jordy-inventory-updated", (event) => {
  inventory = event.detail.inventory;
  renderInventory();
});

document.querySelector("#sleep-button").addEventListener("click", (event) => {
  if (gameOver || Number(state.health) <= 0 || event.currentTarget.disabled) return;
  const button = event.currentTarget;
  button.disabled = true;
  let seconds = 5;
  button.innerHTML = `<span>☾</span> Descansando ${seconds}…`;
  document.querySelector("#pet-thought").textContent = "Zzz… una siestita me hará bien 😴";
  const timer = window.setInterval(() => {
    seconds -= 1;
    if (seconds > 0) {
      button.innerHTML = `<span>☾</span> Descansando ${seconds}…`;
      return;
    }
    window.clearInterval(timer);
    if (!gameOver) {
      window.dispatchEvent(new CustomEvent("jordy-sound", { detail: { type: "sleep" } }));
      state.energy = clamp(Number(state.energy || 0) + 12);
      state.joy = clamp(Number(state.joy || 0) + 2);
      saveState();
      window.jordyProgress?.addCoins(2);
      window.jordyProgress?.awardXP(5);
      document.querySelector("#pet-thought").textContent = "¡Qué buena siesta! Me siento con más energía ✨";
      showToast("Siesta completa · +12% energía · +2% ánimo · +2 monedas · +5 XP");
    }
    button.innerHTML = "<span>☾</span> Siesta rápida";
    button.disabled = false;
  }, 1000);
});

window.addEventListener("pagehide", () => localStorage.setItem("market-jordy-care", JSON.stringify(state)));
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") localStorage.setItem("market-jordy-care", JSON.stringify(state)); });
applyTime();
renderNeeds();
renderInventory();
showDeathScreen();
setInterval(applyTime, 1000);
setInterval(tickIdleMessages, 1000);
})();