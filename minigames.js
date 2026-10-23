(() => {
  const STORAGE_KEY = "market-jordy-progress-v1";
  const initialProgress = {
    coins: 0,
    xp: 0,
    penalties: { goals: 0, saves: 0, shots: 0 },
  };
  let progress;
  try {
    progress = { ...initialProgress, ...(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")) };
  } catch {
    progress = { ...initialProgress };
  }
  progress.penalties = { ...initialProgress.penalties, ...(progress.penalties || {}) };
  progress.coins = Math.max(0, Number(progress.coins) || 0);
  progress.xp = Math.max(0, Number(progress.xp) || 0);

  const keeper = document.querySelector("#goalkeeper");
  const stadium = document.querySelector("#stadium");
  const message = document.querySelector("#penalty-message");
  const buttons = [...document.querySelectorAll("[data-shot]")];
  let shotInProgress = false;

  function renderProgress() {
    const level = Math.floor(progress.xp / 100) + 1;
    const xpInLevel = progress.xp % 100;
    document.querySelector("#player-level").textContent = level;
    document.querySelector("#player-coins").textContent = progress.coins;
    document.querySelector("#game-level").textContent = level;
    document.querySelector("#xp-value").textContent = xpInLevel;
    document.querySelector("#xp-bar").style.width = `${xpInLevel}%`;
    document.querySelector("#penalty-goals").textContent = progress.penalties.goals;
    document.querySelector("#penalty-saves").textContent = progress.penalties.saves;
    document.querySelector("#penalty-shots").textContent = progress.penalties.shots;
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    renderProgress();
  }

  function takeShot(direction) {
    if (shotInProgress) return;
    shotInProgress = true;
    buttons.forEach((button) => { button.disabled = true; });
    stadium.classList.remove("shot-left", "shot-center", "shot-right");
    keeper.classList.remove("dive-left", "dive-center", "dive-right");
    void stadium.offsetWidth;

    const keeperDirection = ["left", "center", "right"][Math.floor(Math.random() * 3)];
    stadium.classList.add(`shot-${direction}`);
    keeper.classList.add(`dive-${keeperDirection}`);
    message.textContent = "¡Allá va! Jordy se lanza…";

    window.setTimeout(() => {
      const goal = direction !== keeperDirection;
      progress.penalties.shots += 1;
      progress.xp += goal ? 20 : 10;
      if (goal) {
        progress.penalties.goals += 1;
        progress.coins += 10;
        message.textContent = "¡GOOOL! La pelota pasó a Jordy · +10 monedas · +20 XP";
      } else {
        progress.penalties.saves += 1;
        progress.coins += 3;
        message.textContent = "¡Atajada! Jordy leyó tu tiro · +3 monedas · +10 XP";
      }
      saveProgress();

      window.setTimeout(() => {
        stadium.classList.remove("shot-left", "shot-center", "shot-right");
        keeper.classList.remove("dive-left", "dive-center", "dive-right");
        message.textContent = "¡Jordy está listo! ¿A qué lado pateas?";
        buttons.forEach((button) => { button.disabled = false; });
        shotInProgress = false;
      }, 1150);
    }, 600);
  }

  buttons.forEach((button) => button.addEventListener("click", () => takeShot(button.dataset.shot)));
  saveProgress();
})();
