(() => {
  const STORAGE_KEY = "market-jordy-progress-v1";
  const INVENTORY_KEY = "market-jordy-inventory";
  const starterKit = { 1: 25, 6: 8, 5: 18, 9: 25, 11: 12 };
  const bonusKit = { 1: 4, 6: 2, 11: 2, 12: 3, 20: 1 };
  const defaults = { coins: 0, xp: 0, activeSeconds: 0, activeXpMinutes: 0, startedAt: Date.now(), rankAccountedSeconds: 0, playerName: "", starterKitGranted: false, penalties: { goals: 0, saves: 0, shots: 0 } };
  let progress = { ...defaults };
  try {
    progress = { ...defaults, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")) };
  } catch {
    progress = { ...defaults };
  }
  progress.penalties = { ...defaults.penalties, ...(progress.penalties || {}) };
  ["coins", "xp", "activeSeconds", "activeXpMinutes"].forEach((key) => { progress[key] = Math.max(0, Math.floor(Number(progress[key]) || 0)); });

  let showStarterKit = false;
  if (!progress.starterKitGranted) {
    let inventory = {};
    try { inventory = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "{}"); } catch { inventory = {}; }
    Object.entries(starterKit).forEach(([id, quantity]) => { inventory[id] = (Number(inventory[id]) || 0) + quantity; });
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    progress.coins += 750;
    progress.starterKitGranted = true;
    showStarterKit = true;
  }

  progress.startedAt = Number(progress.startedAt) || Date.now();
  progress.rankAccountedSeconds = Math.max(0, Number(progress.rankAccountedSeconds) || 0);
  progress.playerName = String(progress.playerName || "").slice(0, 18);
  const RANKING_KEY = "market-jordy-ranking-v1";
  function updateRanking() {
    if (!progress.playerName) return [];
    let ranking = [];
    try { ranking = JSON.parse(localStorage.getItem(RANKING_KEY) || "[]"); } catch { ranking = []; }
    const elapsed = Math.max(0, Math.floor((Date.now() - progress.startedAt) / 1000));
    const delta = Math.max(0, elapsed - progress.rankAccountedSeconds);
    if (delta) {
      const record = ranking.find((entry) => entry.name === progress.playerName);
      if (record) record.seconds += delta;
      else ranking.push({ name: progress.playerName, seconds: delta });
      progress.rankAccountedSeconds = elapsed;
      localStorage.setItem(RANKING_KEY, JSON.stringify(ranking));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
    return ranking.sort((a, b) => b.seconds - a.seconds).slice(0, 10);
  }
  function setPlayerName(name) {
    progress.playerName = String(name || "").trim().replace(/[<>]/g, "").slice(0, 18);
    updateRanking();
    save();
  }
  function resetGame() {
    updateRanking();
    progress.coins = 750;
    progress.xp = 0;
    progress.activeSeconds = 0;
    progress.activeXpMinutes = 0;
    progress.startedAt = Date.now();
    progress.rankAccountedSeconds = 0;
    progress.penalties = { ...defaults.penalties };
    progress.starterKitGranted = true;
    const inventory = { ...starterKit };
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    render();
    window.dispatchEvent(new CustomEvent("jordy-inventory-updated", { detail: { inventory } }));
  }
  const levelFor = (xp) => Math.floor(xp / 100) + 1;
  function render() {
    const level = levelFor(progress.xp);
    const xpInLevel = progress.xp % 100;
    const levelBadge = document.querySelector("#player-level");
    const coinBadge = document.querySelector("#player-coins");
    const gameLevel = document.querySelector("#game-level");
    const xpValue = document.querySelector("#xp-value");
    const xpBar = document.querySelector("#xp-bar");
    const hudLevel = document.querySelector("#xp-hud-level");
    const hudValue = document.querySelector("#xp-hud-value");
    const hudBar = document.querySelector("#xp-hud-bar");
    const pet = document.querySelector(".jordy-image");
    if (levelBadge) levelBadge.textContent = level;
    if (coinBadge) coinBadge.textContent = progress.coins;
    if (gameLevel) gameLevel.textContent = level;
    if (xpValue) xpValue.textContent = xpInLevel;
    if (xpBar) xpBar.style.width = xpInLevel + "%";
    if (hudLevel) hudLevel.textContent = level;
    if (hudValue) hudValue.textContent = xpInLevel + " / 100 XP";
    if (hudBar) hudBar.style.width = xpInLevel + "%";
    if (pet) pet.style.height = (68 + (Math.min(level, 15) - 1) * 2) + "%";
  }

  function save(levelBefore = levelFor(progress.xp)) {
    const level = levelFor(progress.xp);
    const levelsGained = Math.max(0, level - levelBefore);
    if (levelsGained) progress.coins += levelsGained * 15;
    const milestoneKits = Math.floor(level / 10) - Math.floor(levelBefore / 10);
    if (milestoneKits > 0) {
      let inventory = {};
      try { inventory = JSON.parse(localStorage.getItem(INVENTORY_KEY) || "{}"); } catch { inventory = {}; }
      Object.entries(bonusKit).forEach(([id, quantity]) => { inventory[id] = (Number(inventory[id]) || 0) + quantity * milestoneKits; });
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
      window.dispatchEvent(new CustomEvent("jordy-inventory-updated", { detail: { inventory } }));
      progress.coins += milestoneKits * 100;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    render();
    window.dispatchEvent(new CustomEvent("jordy-progress-updated", { detail: { ...progress, level, levelsGained, milestoneKits } }));
  }

  function awardXP(amount) {
    const before = levelFor(progress.xp);
    progress.xp += Math.max(0, Math.floor(Number(amount) || 0));
    save(before);
  }

  function addCoins(amount) {
    const before = levelFor(progress.xp);
    progress.coins += Math.max(0, Math.floor(Number(amount) || 0));
    save(before);
  }

  function spendCoins(amount) {
    const cost = Math.max(0, Math.ceil(Number(amount) || 0));
    if (progress.coins < cost) return false;
    progress.coins -= cost;
    save();
    return true;
  }

  function recordPenalty(isGoal) {
    const before = levelFor(progress.xp);
    progress.penalties.shots += 1;
    if (isGoal) {
      progress.penalties.goals += 1;
      progress.coins += 25;
      progress.xp += 20;
    } else {
      progress.penalties.saves += 1;
      progress.coins += 8;
      progress.xp += 10;
    }
    save(before);
  }

  function getSnapshot() { return JSON.parse(JSON.stringify(progress)); }
  window.jordyProgress = { awardXP, addCoins, spendCoins, recordPenalty, getSnapshot, render, setPlayerName, resetGame, updateRanking };

  if (showStarterKit) {
    const modal = document.querySelector("#starter-kit-modal");
    modal.hidden = false;
    document.querySelector("#starter-kit-close").addEventListener("click", () => { modal.hidden = true; });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  });
  window.addEventListener("pagehide", () => { updateRanking(); localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); });
  window.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    progress.activeSeconds += 1;
    const completedMinutes = Math.floor(progress.activeSeconds / 60);
    if (completedMinutes > progress.activeXpMinutes) {
      const before = levelFor(progress.xp);
      progress.xp += completedMinutes - progress.activeXpMinutes;
      progress.activeXpMinutes = completedMinutes;
      save(before);
    } else if (progress.activeSeconds % 10 === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, 1000);

  render();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
})();