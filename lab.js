(() => {
  const inventoryKey = "market-jordy-inventory";
  const need = { 30: 1, 31: 1, 32: 1 };
  const getInventory = () => { try { return JSON.parse(localStorage.getItem(inventoryKey) || "{}"); } catch { return {}; } };
  const recipeStatus = document.querySelector("#lab-recipe-status");
  function renderRecipe() {
    const inventory = getInventory();
    const ready = Object.entries(need).every(([id, count]) => (Number(inventory[id]) || 0) >= count);
    const button = document.querySelector("#craft-secret");
    button.disabled = !ready;
    recipeStatus.textContent = ready ? "Ingredientes listos: 1 saciante + 1 pausa + 1 inmunidad." : "Necesitas 1 Poción saciante, 1 Poción de pausa y 1 Poción de inmunidad. Se compran en el mercado.";
    const effects = (JSON.parse(localStorage.getItem("market-jordy-care") || "{}").effects || {});
    const now = Date.now();
    const labels = [["hungerUntil", "Saciedad"], ["energyUntil", "Energía protegida"], ["immunityUntil", "Inmunidad"]];
    const active = labels.filter(([key]) => effects[key] > now).map(([key, label]) => {
      const mins = Math.ceil((effects[key] - now) / 60000);
      return '<span class="effect-chip">✨ ' + label + ': ' + mins + ' min</span>';
    });
    document.querySelector("#lab-effects").innerHTML = active.join("") || '<span class="effect-chip">Sin efectos activos</span>';
  }
  document.querySelector("#craft-secret").addEventListener("click", () => {
    const inventory = getInventory();
    if (!Object.entries(need).every(([id, count]) => (Number(inventory[id]) || 0) >= count)) return renderRecipe();
    Object.entries(need).forEach(([id, count]) => { inventory[id] -= count; if (!inventory[id]) delete inventory[id]; });
    inventory[34] = (Number(inventory[34]) || 0) + 1;
    localStorage.setItem(inventoryKey, JSON.stringify(inventory));
    window.dispatchEvent(new CustomEvent("jordy-inventory-updated", { detail: { inventory } }));
    recipeStatus.textContent = "¡Elixir secreto creado! Está en el inventario de Jordy ✨";
    renderRecipe();
  });
  document.querySelector("#lab-shop-link").addEventListener("click", () => {
    document.body.dataset.view = "market";
    document.querySelectorAll(".category-nav [data-view]").forEach(link => link.classList.toggle("active", link.dataset.view === "market"));
    document.querySelector("#scene-label").textContent = "EL MERCADO DE JORDY";
    const categoryButton = Array.from(document.querySelectorAll("#filters button")).find(button => button.dataset.category === "Laboratorio");
    if (categoryButton) categoryButton.click();
  });
  window.addEventListener("jordy-inventory-updated", renderRecipe);
  window.setInterval(renderRecipe, 15000);
  renderRecipe();
})();