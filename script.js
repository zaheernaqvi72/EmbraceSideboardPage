// Initializing the values for selected color, size, and quantity
let selectedColor = "";
let selectedSize = "";
let quantity = 1;  // Default quantity is set to 1

// Function to show the selected thumbnail image as the main image
function showImage(src) {
  document.getElementById("main-image").src = src;
}

// Function to show a tick mark on the selected color box
function showTick(selectedBox) {
  // Ensure the Button is clicked only once
  if (selectedBox.classList.contains("selected")) {
    return;
  }

  selectedColor = selectedBox.value;

  // Remove 'selected' class from all boxes and remove the image
  const colorBoxes = document.querySelectorAll(".color-box");
  colorBoxes.forEach((box) => {
    box.classList.remove("selected");
    box.parentElement.classList.remove("selected");
    const img = box.querySelector("img");
    if (img) {
      img.remove();
    }
  });

  // Add 'selected' class to the clicked box
  selectedBox.classList.add("selected");
  selectedBox.parentElement.classList.add("selected");

  // Create and append the img element
  const img = document.createElement("img");
  img.src = "./public/tick.png";
  img.alt = "tick";
  selectedBox.appendChild(img);
}

// Function to increment or decrement the quantity of items
function changeQuantity(delta) {
  const quantityElement = document.getElementById("quantity");
  let currentQuantity = parseInt(quantityElement.textContent);

  currentQuantity += delta;
  quantity = currentQuantity;

  // Ensure the quantity does not go below 1
  if (currentQuantity < 1) {
    currentQuantity = 1;
  }

  quantityElement.textContent = currentQuantity;

  // Update the decrement button state
  const decrementButton = document.getElementById("decrement");
  if (currentQuantity > 1) {
    decrementButton.classList.remove("disabled");
  } else {
    decrementButton.classList.add("disabled");
  }
}

// IIFE to calculate and display the discount percentage
(function calculatePercentageOff() {
  const discountedPriceElement = document.getElementById("discountedPrice");
  const originalPriceElement = document.getElementById("originalPrice");
  const discountPercentageElement = document.getElementById("discountPercentage");

  const discountedPrice = parseFloat(discountedPriceElement.getAttribute("data-price"));
  const originalPrice = parseFloat(originalPriceElement.getAttribute("data-price"));

  if (!isNaN(discountedPrice) && !isNaN(originalPrice) && originalPrice !== 0) {
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    discountPercentageElement.innerText = `${discountPercentage.toFixed(0)}% Off`;
  } else {
    discountPercentageElement.textContent = "Invalid prices";
  }
})();

// Function to handle size selection
function changedSize() {
  selectedSize = document.querySelector('input[name="size"]:checked').value;
}

// Function to handle adding items to the cart
function addToCart() {
  document.getElementById("cartMessage").classList.add('message');

  // Ensure both color and size are selected
  if (!selectedColor || !selectedSize) {
    alert("Please select a color and size");
    return;
  }

  // Update the cart message and button text
  const messageElement = document.getElementById("cartMessage");
  const button = document.querySelector(".group-button .add-to-cart");
  button.textContent = "Added to Cart";
  messageElement.textContent = `${quantity} Embrace Sideboard with ${selectedColor} color and ${selectedSize} size added to cart`;
  messageElement.style.display = "block";

  // Reset the button text and hide the message after 5 seconds
  setTimeout(() => {
    button.textContent = "Add To Cart";
    messageElement.style.display = "none";
  }, 5000);
}

// Exposing functions to the global scope for event handlers
window.changeQuantity = changeQuantity;
window.showTick = showTick;
window.addToCart = addToCart;
window.showImage = showImage;
window.changedSize = changedSize;
