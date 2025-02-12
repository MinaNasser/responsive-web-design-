
// https://api.escuelajs.co/api/v1/products
// Function to fetch products from API https://fakestoreapi.com/products
// Function to fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products; // Ensure that you're accessing the 'products' key
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Function to render products on the home page


async function renderProducts() {
  const products = await fetchProducts();
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = ""; // Clear previous content

  // Check if there are products
  if (products && products.length > 0) {
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add(
      "tw-bg-white",
        "tw-p-4",
        "tw-rounded-lg",
        "tw-shadow-md",
        "tw-mb-4",
        "tw-flex",
        "tw-flex-col",
        "tw-items-center",
        "tw-justify-center",
        "tw-text-center"
        
      );

      // Check if there is an image
      let imagesHTML = "";
      if (product.images && product.images.length > 0) {
        imagesHTML = `<img src="${product.images[0]}" alt="${product.title}" class="tw-w-full tw-h-64 tw-rounded-lg tw-object-cover tw-overflow-hidden tw-border tw-mb-4">`; // Take the first image
      } else {
        imagesHTML = `<p>No images available.</p>`;
      }

      // Calculate stars for rating
      const stars = Math.round(product.rating); // Round to the nearest integer
      let starsHTML = "";
      for (let i = 0; i < 5; i++) {
        if (i < stars) {
          starsHTML += `<span class="text-yellow-400">★</span>`; // Full stars
        } else {
          starsHTML += `<span class="text-gray-300">★</span>`; // Empty stars
        }
      }

      // Set the product HTML
      productElement.innerHTML = `
        <a href="../pages/product-details.html?id=${product.id}">
          <div class="tw-flex tw-flex-col tw-items-center">
            ${imagesHTML}
          </div>
          <div class="tw-mt-8 tw-text-center">
            <h4 class="tw-font-bold tw-text-xl">${product.title}</h4>
            <p class="tw-mt-2 tw-text-gray-600">$${product.price}</p>
            <div class="tw-mt-2 tw-text-gray-600">
              ${starsHTML} <!-- Display stars here -->
            </div>
            <div class="tw-mt-5">
              <button type="button" class="tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-transparent tw-bg-gray-800 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-leading-4 tw-text-white tw-shadow-sm hover:tw-bg-gray-900">
                Add to Cart
              </button>
            </div>
          </div>
        </a>
      `;

      // Append the product to the container
      productsContainer.appendChild(productElement);
    });
  } else {
    productsContainer.innerHTML = "<p>No products found.</p>";
  }
}

// Call the renderProducts function to display the products
renderProducts();

// Function to render product details
async function renderProductDetails(productId) {
  const products = await fetchProducts();
  const product = products.find((p) => p.id === parseInt(productId));

  if (product) {
    const productDetailsContainer = document.getElementById("product-details");

    // Calculate stars for rating
    const stars = Math.round(product.rating); // Round to the nearest integer
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      if (i < stars) {
        starsHTML += `<span class="text-yellow-400">★</span>`; // Full stars
      } else {
        starsHTML += `<span class="text-gray-300">★</span>`; // Empty stars
      }
    }

    // Set the product details HTML
    productDetailsContainer.innerHTML = `
      <div class="flex flex-col md:flex-row">
        <img src="${product.images[0]}" alt="${product.title}" class="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0 md:mr-6">
        <div>
          <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
          <p class="text-gray-600 mb-4">$${product.price}</p>
          <p class="mb-4">${product.description}</p>

          <!-- Display rating stars -->
          <div class="mb-4">
            <span class="text-gray-600">Rating: </span>
            ${starsHTML}
            <span class="text-gray-600">(${product.reviews.length} reviews)</span>
          </div>

          <button id="add-to-cart" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    `;

    // Add event listener for the "Add to Cart" button
    document
      .getElementById("add-to-cart")
      .addEventListener("click", () => addToCart(product));
  }
}

// Function to handle adding product to cart
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
async function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = ""; // Reset previous content
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
  } else {
    // Display each cart item
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "flex items-center justify-between border-b py-4";
      itemElement.innerHTML = `
        <div class="flex items-center">
          <img 
          src="${item.images[0]}" 
          alt="${item.name}" 
          class="img-fluid d-block rounded border shadow-sm bg-light" 
          style="width: 64px; height: 64px; object-fit: cover;"
        />


          <div>
            <h3 class="font-bold">${item.name}</h3>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-danger remove-item" data-id="${
            item.id
          }">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);

      total += item.price * item.quantity;
    });
  }

  // Display the total price
  cartTotal.textContent = total.toFixed(2);

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (e) =>
      removeFromCart(e.target.dataset.id)
    );
  });
}

// Function to remove an item from the cart
async function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove the product from the cart by ID
  cart = cart.filter((item) => item.id !== productId);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Reload the cart after modification
  renderCart();
}

// Call the renderCart function to display cart items
renderCart();

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
  } else if (path === "../pages/p1roduct-details.html") {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = await fetchProducts().then((products) =>
      products.find((p) => p.id === productId)
    );
    if (product) {
      renderProductDetails(product);
    } else {
      alert("Product not found");
    }
  } else if (path === "../pages/cart.html") {
    renderCart();
  } else if (path === "../pages/checkout.html") {
    renderCart();
    handleFormSubmit("checkout-form", handleCheckout);
  } else if (path === "../pages/login.html") {
    handleFormSubmit("login-form", handleLogin);
  } else if (path === "../pages/register.html") {
    handleFormSubmit("register-form", handleRegister);
  }
}

// Run the initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", initPage);
