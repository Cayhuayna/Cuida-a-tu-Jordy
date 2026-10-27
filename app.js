const products = [
  { id: 1, name: "Miel pura de abeja", category: "Alimentos", seller: "Apiario La Colmena", price: 28, emoji: "🍯", color: "#ead8b7", badge: "Favorito" },
  { id: 2, name: "Café de altura", category: "Alimentos", seller: "Café Don Pepe", price: 35, emoji: "☕", color: "#d7c6b7", badge: "Local" },
  { id: 3, name: "Bolso tejido a mano", category: "Moda", seller: "Manos de Cayhuayna", price: 65, emoji: "👜", color: "#e5c4a6", badge: "Hecho a mano" },
  { id: 4, name: "Maceta de barro", category: "Hogar", seller: "Taller Tierra Viva", price: 30, emoji: "🪴", color: "#d4dfc4", badge: "Local" },
  { id: 5, name: "Jabón de hierbas", category: "Belleza", seller: "Botánica Natural", price: 24, emoji: "🧼", color: "#e5e2bd", badge: "Natural" },
  { id: 6, name: "Chocolate artesanal", category: "Alimentos", seller: "Cacao del Valle", price: 22, emoji: "🍫", color: "#ddc4b0", badge: "Favorito" },
  { id: 7, name: "Audífonos inalámbricos", category: "Tecnología", seller: "Conecta Cayhuayna", price: 120, emoji: "🎧", color: "#cbd8d7", badge: "Nuevo" },
  { id: 8, name: "Vela aromática", category: "Hogar", seller: "Luz de Casa", price: 25, emoji: "🕯️", color: "#ead9c2", badge: "Hecho a mano" },
  { id: 9, name: "Manzana de Cayhuayna", category: "Alimentos", seller: "Frutas Don Lucho", price: 5, emoji: "🍎", color: "#f0d4c7", badge: "Fresco" },
  { id: 10, name: "Sándwich casero", category: "Alimentos", seller: "La Esquina Rica", price: 18, emoji: "🥪", color: "#e8d9b7", badge: "Preparado hoy" },
  { id: 11, name: "Jugo natural", category: "Alimentos", seller: "Juguería Cayhuayna", price: 12, emoji: "🧃", color: "#f1dfb2", badge: "Natural" },
  { id: 12, name: "Agua fresca", category: "Alimentos", seller: "Aguas del Valle", price: 4, emoji: "🥤", color: "#d0e8df", badge: "Hidratante" },
  { id: 13, name: "Pelota de fútbol", category: "Juguetes", seller: "Deportes Cayhuayna", price: 75, emoji: "⚽", color: "#d9e4cf", badge: "¡A jugar!" },
  { id: 14, name: "Peluche abrazable", category: "Juguetes", seller: "Nube de Algodón", price: 55, emoji: "🧸", color: "#e7d8cf", badge: "Suavecito" },
  { id: 15, name: "Cama acogedora", category: "Hogar", seller: "Descanso Bonito", price: 90, emoji: "🛏️", color: "#d8dfed", badge: "Descanso" },
  { id: 16, name: "Cepillo suave", category: "Belleza", seller: "Botánica Natural", price: 20, emoji: "🪥", color: "#d2e5db", badge: "Aseo" },
  { id: 17, name: "Pera del huerto", category: "Alimentos", seller: "Huerto Cayhuayna", price: 9, emoji: "🍐", color: "#e4e9b8", badge: "Fresco" },
  { id: 18, name: "Sopa casera", category: "Alimentos", seller: "Cocina de Mamá Rosa", price: 26, emoji: "🍲", color: "#efd5ad", badge: "Calientita" },
  { id: 19, name: "Galletas de avena", category: "Alimentos", seller: "Horno del Barrio", price: 14, emoji: "🍪", color: "#ead1ac", badge: "Energía" },
  { id: 20, name: "Cometa colorida", category: "Juguetes", seller: "Deportes Cayhuayna", price: 48, emoji: "🪁", color: "#d6e6dc", badge: "Diversión" },
  { id: 21, name: "Perfume de lavanda", category: "Belleza", seller: "Botánica Natural", price: 32, emoji: "🪻", color: "#e4d9ec", badge: "Relajante" },
  { id: 30, name: "Poción saciante", category: "Laboratorio", seller: "Laboratorio Jordy", price: 280, emoji: "🧪", color: "#d8e9b7", badge: "2 horas" },
  { id: 31, name: "Poción de pausa", category: "Laboratorio", seller: "Laboratorio Jordy", price: 240, emoji: "⚗️", color: "#d2e5ed", badge: "26 minutos" },
  { id: 32, name: "Poción de inmunidad", category: "Laboratorio", seller: "Laboratorio Jordy", price: 380, emoji: "🛡️", color: "#e5dcf0", badge: "20 minutos" },
  { id: 33, name: "Poción desconocida", category: "Laboratorio", seller: "Laboratorio Jordy", price: 420, emoji: "❔", color: "#e9d5e4", badge: "Efecto sorpresa" },
];

const money = (value) => `🪙 ${Math.ceil(value)}`;
const filtersEl = document.querySelector("#filters");
const productsEl = document.querySelector("#products");
const searchInput = document.querySelector("#search-input");
const sortSelect = document.querySelector("#sort-select");
const emptyState = document.querySelector("#empty-state");
let activeCategory = "Todos";
let cart = JSON.parse(localStorage.getItem("marketcayhuayna-cart") || "{}");
let toastTimer;

function renderFilters() {
  const categories = ["Todos", ...new Set(products.map((product) => product.category))];
  filtersEl.innerHTML = categories.map((category) => `<button class="filter-button ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
  filtersEl.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    renderFilters();
    renderProducts();
  }));
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let visible = products.filter((product) => (activeCategory === "Todos" || product.category === activeCategory)
    && `${product.name} ${product.category} ${product.seller}`.toLocaleLowerCase("es").includes(query));
  if (sortSelect.value === "price-low") visible.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "price-high") visible.sort((a, b) => b.price - a.price);
  productsEl.innerHTML = visible.map((product) => `<article class="product-card">
    <div class="product-image" style="background:${product.color}"><span class="product-badge">${product.badge}</span><span class="emoji" role="img" aria-label="${product.name}">${product.emoji}</span></div>
    <div class="product-info"><span class="product-category">${product.category}</span><h3>${product.name}</h3><span class="product-seller">por ${product.seller}</span>
      <div class="product-bottom"><strong class="product-price">${money(product.price)}</strong><button class="add-button" data-add="${product.id}" aria-label="Añadir ${product.name} al carrito">+</button></div>
    </div></article>`).join("");
  emptyState.hidden = visible.length > 0;
  productsEl.querySelectorAll("[data-add]").forEach((button) => button.addEventListener("click", () => addToCart(Number(button.dataset.add))));
}

function saveCart() {
  localStorage.setItem("marketcayhuayna-cart", JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  const product = products.find((item) => item.id === id);
  showToast(`${product.name} se añadió al carrito`);
}

function renderCart() {
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
  document.querySelector("#cart-count").textContent = count;
  document.querySelector("#drawer-count").textContent = `(${count})`;
  const itemsEl = document.querySelector("#cart-items");
  const empty = document.querySelector("#cart-empty");
  const footer = document.querySelector("#cart-footer");
  empty.style.display = count ? "none" : "flex";
  footer.style.display = count ? "block" : "none";
  itemsEl.innerHTML = entries.map(([id, quantity]) => {
    const product = products.find((item) => item.id === Number(id));
    if (!product) return "";
    return `<div class="cart-row"><div class="cart-thumb" style="background:${product.color}">${product.emoji}</div><div><h3>${product.name}</h3><p>${money(product.price)}</p><div class="quantity"><button data-quantity="${id}" data-delta="-1" aria-label="Quitar uno">−</button><span>${quantity}</span><button data-quantity="${id}" data-delta="1" aria-label="Añadir uno">+</button></div></div><strong class="cart-line-price">${money(product.price * quantity)}</strong></div>`;
  }).join("");
  const subtotal = entries.reduce((sum, [id, quantity]) => sum + products.find((p) => p.id === Number(id)).price * quantity, 0);
  document.querySelector("#cart-subtotal").textContent = money(subtotal);
  const coins = window.jordyProgress?.getSnapshot().coins ?? 0;
  document.querySelector("#cart-balance").textContent = `🪙 ${coins}`;
  const insufficient = Boolean(window.jordyProgress && coins < subtotal);
  document.querySelector("#checkout-button").disabled = insufficient;
  document.querySelector("#cart-economy-note").textContent = insufficient ? `Te faltan ${Math.ceil(subtotal - coins)} monedas para esta compra` : "Compra con monedas del juego · No es dinero real";
  itemsEl.querySelectorAll("[data-quantity]").forEach((button) => button.addEventListener("click", () => {
    const id = button.dataset.quantity;
    cart[id] = (cart[id] || 0) + Number(button.dataset.delta);
    if (cart[id] <= 0) delete cart[id];
    saveCart();
  }));
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setCartOpen(open) {
  document.querySelector("#cart-drawer").classList.toggle("open", open);
  document.querySelector("#cart-drawer").setAttribute("aria-hidden", String(!open));
  document.querySelector("#cart-overlay").hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
}

const viewNames = {
  jordy: "TU COMPAÑERO DEL MERCADO",
  inventory: "INVENTARIO DE JORDY",
  market: "EL MERCADO DE JORDY",
  food: "MERCADO · ALIMENTOS",
  homegoods: "MERCADO · HOGAR",
  care: "MERCADO · ASEO",
  penalty: "MINIJUEGO · PENALES",
  laboratory: "LABORATORIO DE JORDY",
  ranking: "RANKING DE CUIDADORES",
};
function setPageView(view) {
  document.body.dataset.view = view;
  document.querySelectorAll(".category-nav [data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
  document.querySelector("#scene-label").textContent = viewNames[view] || viewNames.jordy;
  if (view === "market" || view === "food" || view === "homegoods" || view === "care" || view === "laboratory" || view === "ranking") {
    document.querySelector("#catalogo").scrollTop = 0;
  }
}
document.querySelectorAll(".category-nav [data-view]").forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  setPageView(link.dataset.view);
}));
document.querySelector("#fullscreen-toggle").addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  } catch {
    showToast("El navegador no permitió activar pantalla completa");
  }
});
document.addEventListener("fullscreenchange", () => {
  const active = Boolean(document.fullscreenElement);
  document.querySelector("#fullscreen-label").textContent = active ? "Salir de pantalla completa" : "Pantalla completa";
  document.querySelector("#fullscreen-toggle").setAttribute("aria-label", active ? "Salir de pantalla completa" : "Activar pantalla completa");
});

document.querySelector("#search-form").addEventListener("submit", (event) => { event.preventDefault(); setPageView("market"); activeCategory = "Todos"; renderFilters(); renderProducts(); });
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
document.querySelectorAll("[data-nav-category]").forEach((link) => link.addEventListener("click", () => {
  activeCategory = link.dataset.navCategory;
  renderFilters();
  renderProducts();
}));
document.querySelector("#cart-toggle").addEventListener("click", () => setCartOpen(true));
document.querySelector("#close-cart").addEventListener("click", () => setCartOpen(false));
document.querySelector("#cart-overlay").addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setCartOpen(false); });
document.querySelector("#checkout-button").addEventListener("click", () => {
  const bought = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  if (!bought.length) return;
  const subtotal = bought.reduce((sum, [id, quantity]) => sum + products.find((product) => product.id === Number(id)).price * quantity, 0);
  if (!window.jordyProgress?.spendCoins(subtotal)) {
    const balance = window.jordyProgress?.getSnapshot().coins ?? 0;
    showToast(`Te faltan ${Math.max(0, Math.ceil(subtotal - balance))} monedas para comprar eso`);
    return;
  }
  const inventory = JSON.parse(localStorage.getItem("market-jordy-inventory") || "{}");
  bought.forEach(([id, quantity]) => { inventory[id] = (inventory[id] || 0) + quantity; });
  localStorage.setItem("market-jordy-inventory", JSON.stringify(inventory));
  window.dispatchEvent(new CustomEvent("jordy-inventory-updated", { detail: { inventory } }));
  cart = {};
  saveCart();
  setCartOpen(false);
  document.querySelector("#inventario").scrollIntoView({ behavior: "smooth", block: "center" });
  showToast("Productos añadidos al inventario de Jordy");
});

renderFilters();
renderProducts();
renderCart();
setPageView("jordy");

window.addEventListener("jordy-progress-updated", (event) => {
  renderCart();
  if (event.detail.levelsGained > 0) showToast("¡Subiste al nivel " + event.detail.level + "! Monedas extra" + (event.detail.milestoneKits ? " y kit bono recibido 🎁" : ""));
});