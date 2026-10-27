(() => {
  const progressApi = window.jordyProgress;
  const keeper = document.querySelector("#goalkeeper");
  const stadium = document.querySelector("#stadium");
  const message = document.querySelector("#penalty-message");
  const buttons = [...document.querySelectorAll("[data-shot]")];
  let shotInProgress = false;

  function renderScores() {
    const scores = progressApi.getSnapshot().penalties;
    document.querySelector("#penalty-goals").textContent = scores.goals;
    document.querySelector("#penalty-saves").textContent = scores.saves;
    document.querySelector("#penalty-shots").textContent = scores.shots;
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
      progressApi.recordPenalty(goal);
      renderScores();
      message.textContent = goal
        ? "¡GOOOL! La pelota pasó a Jordy · +25 monedas · +20 XP"
        : "¡Atajada! Jordy leyó tu tiro · +8 monedas · +10 XP";

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
  renderScores();
})();