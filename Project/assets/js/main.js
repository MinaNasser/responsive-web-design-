// Function to fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Function to render products on the home page
function renderProducts(products) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'bg-white p-4 rounded-lg shadow-md';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
      <h2 class="text-xl font-bold mb-2">${product.name}</h2>
      <p class="text-gray-600 mb-2">$${product.price.toFixed(2)}</p>
      <a href="/product-details.html?id=${product.id}" class="btn btn-primary">View Details</a>
    `;
    productsContainer.appendChild(productElement);
  });
}

// Function to render product details
function renderProductDetails(product) {
  const productDetailsContainer = document.getElementById("product-details");
  productDetailsContainer.innerHTML = `
    <div class="flex flex-col md:flex-row">
      <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-6">
      <div>
        <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
        <p class="text-gray-600 mb-4">$${product.price.toFixed(2)}</p>
        <p class="mb-4">${product.description}</p>
        <button id="add-to-cart" class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  `;

  // Add event listener for the "Add to Cart" button
  document.getElementById("add-to-cart").addEventListener("click", () => addToCart(product));
}

// Function to add a product to the cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// Function to render cart items
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "flex items-center justify-between border-b py-4";
    itemElement.innerHTML = `
      <div class="flex items-center">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover mr-4">
        <div>
          <h3 class="font-bold">${item.name}</h3>
          <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = total.toFixed(2);

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) => removeFromCart(e.target.dataset.id));
  });
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Function to handle form submission
function handleFormSubmit(formId, submitFunction) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      await submitFunction(data);
    });
  }
}

// Function to handle login
async function handleLogin(data) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      window.location.href = "/";
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred during login. Please try again.");
  }
}

// Function to handle registration
async function handleRegister(data) {
  if (data.password !== data["confirm-password"]) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Registration successful! Please log in.");
      window.location.href = "../pages/login.html";
    } else {
      alert("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again.");
  }
}

// Function to handle checkout
async function handleCheckout(data) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const order = {
    ...data,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  };

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "/";
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("An error occurred during checkout. Please try again.");
  }
}

// Initialize the page
async function initPage() {
  const path = window.location.pathname;

  if (path === "/" || path === "../../index.html") {
    const products = await fetchProducts();
    renderProducts(products);
  } else if (path === "/product-details.html") {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = await fetchProducts().then((products) => products.find((p) => p.id === productId));
    if (product) {
      renderProductDetails(product);
    } else {
      alert("Product not found");
    }
  } else if (path === "/cart.html") {
    renderCart();
  } else if (path === "/checkout.html") {
    renderCart();
    handleFormSubmit("checkout-form", handleCheckout);
  } else if (path === "/login.html") {
    handleFormSubmit("login-form", handleLogin);
  } else if (path === "/register.html") {
    handleFormSubmit("register-form", handleRegister);
  }
}

// Run the initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPage);
