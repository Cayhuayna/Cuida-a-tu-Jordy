const products = [
  { id: 1, name: "Miel pura de abeja", category: "Alimentos", seller: "Apiario La Colmena", price: 24.9, emoji: "🍯", color: "#ead8b7", badge: "Favorito" },
  { id: 2, name: "Café de altura", category: "Alimentos", seller: "Café Don Pepe", price: 32, emoji: "☕", color: "#d7c6b7", badge: "Local" },
  { id: 3, name: "Bolso tejido a mano", category: "Moda", seller: "Manos de Cayhuayna", price: 48, emoji: "👜", color: "#e5c4a6", badge: "Hecho a mano" },
  { id: 4, name: "Maceta de barro", category: "Hogar", seller: "Taller Tierra Viva", price: 18.5, emoji: "🪴", color: "#d4dfc4", badge: "Local" },
  { id: 5, name: "Jabón de hierbas", category: "Belleza", seller: "Botánica Natural", price: 12, emoji: "🧼", color: "#e5e2bd", badge: "Natural" },
  { id: 6, name: "Chocolate artesanal", category: "Alimentos", seller: "Cacao del Valle", price: 16.9, emoji: "🍫", color: "#ddc4b0", badge: "Favorito" },
  { id: 7, name: "Audífonos inalámbricos", category: "Tecnología", seller: "Conecta Cayhuayna", price: 59.9, emoji: "🎧", color: "#cbd8d7", badge: "Nuevo" },
  { id: 8, name: "Vela aromática", category: "Hogar", seller: "Luz de Casa", price: 21, emoji: "🕯️", color: "#ead9c2", badge: "Hecho a mano" },
];

const money = (value) => `S/ ${value.toFixed(2)}`;
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
};
function setPageView(view) {
  document.body.dataset.view = view;
  document.querySelectorAll(".category-nav [data-view]").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
  document.querySelector("#scene-label").textContent = viewNames[view] || viewNames.jordy;
  if (view === "market" || view === "food" || view === "homegoods" || view === "care") {
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
