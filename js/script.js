// Cart variables

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// Open cart

cartIcon.addEventListener("click", function openCart(e) {
    cart.classList.add("active");
})

// Close cart

closeCart.addEventListener("click", function closeCart(e) {
    cart.classList.remove("active");
})

// Cart logic

document.addEventListener("DOMContentLoaded", function(e) { 
    cartLogic();
});

function cartLogic() {

    // Item adding buttons initialize

    let addCartButtons = document.querySelectorAll(".add-cart");
    for (let i = 0; i < addCartButtons.length; i++) {
        let buttonAdd = addCartButtons[i];
        buttonAdd.addEventListener("click", addCartItem);
    }

    // Item removal buttons initialize

    let removeCartButtons = document.querySelectorAll(".cart-remove");
    for (let i = 0; i < removeCartButtons.length; i++) {
        let buttonRemove = removeCartButtons[i];
        buttonRemove.addEventListener("click", removeCartItem);
    }

    // Quantity changing input initialize

    let quantityInputs = document.querySelectorAll(".cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let quantityInput = quantityInputs[i];
        quantityInput.addEventListener("change", quantityChanged)
    }

    // Buy button initialize

    let buyButton = document.querySelector(".button-buy");
    buyButton.addEventListener("click", function buyFunction (e) {
        let cartContent = document.querySelector(".cart-content");
        while (cartContent.hasChildNodes()) {
            cartContent.firstChild.remove();
        }
        // for (let i = 0; i < cartBoxes.length; i++) {
        //     cartBoxes[i].remove();
        // }
        alert("Your order has been placed");
        updateTotal();
    });
}

// Item adding

function addCartItem(e) {
    let chosenItem = e.target.parentElement;
    let chosenItemTitle = chosenItem.querySelector(".product-title").innerHTML;
    let chosenItemPrice = chosenItem.querySelector(".price").innerHTML;
    let chosenItemImage = chosenItem.querySelector(".product-img").src;
    addProductToCart(chosenItemTitle, chosenItemPrice, chosenItemImage);
    updateTotal();
}

function addProductToCart(title, price, image) {
    let cartShopBox = document.createElement("div"); // Creating a div for the new item
    cartShopBox.classList.add("cart-box"); // Adding the corresponding class for the created div-*+

    let cartItems = document.querySelector(".cart-content");
    let cartItemsNames = document.querySelectorAll(".cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert("You have already added this item to your cart");
            return;
        }
    }

    let cartBoxContent = `
    <img src="${image}" alt="" class="cart-img" />
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity" />
    </div>
    
    <svg
    class="cart-remove"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    >
    <path
        d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"
    />
    </svg>
    `;

    cartShopBox.innerHTML = cartBoxContent; // Filling the created div with necessary HTML
    
    // Adding the title, price and image
    // cartShopBox.querySelector(".cart-product-title").innerHTML = title;
    // cartShopBox.querySelector(".cart-price").innerHTML = price;
    // cartShopBox.querySelector(".cart-img").src = image;

    cartItems.appendChild(cartShopBox); // Adding the filled div to the cart
    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem); // Adding the functionality to the remove button
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged); // Adding the functionality to the quantity input

    return;
}

// Item removal

function removeCartItem(e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity changing

function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Update total

function updateTotal() {
    let cartContent = document.querySelector(".cart-content");
    let cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantityElement = cartBox.querySelector(".cart-quantity");
        let quantity = quantityElement.value;
        total += quantity * price;
    }
    total = Math.round(total * 100 / 100); // Correct cents display
    document.querySelector(".total-price").innerHTML = `$${total}`;
}