// Path: js/main.js
"use strict";
!function(){
    var n=$("html"),
    t=function(){
        $(".btn-menu").on("click",
        function(t){
            t.preventDefault(),
            n.toggleClass("menu-opened")
        })},
        
        e=function(){
            t()
        };
        
        e()
    }();

 // Get the cart items from local storage
 var cartItems = getCartItemsFromStorage();

// Add a click event listener to all the buy buttons
document.addEventListener("DOMContentLoaded", function() {
    var buyButtons = document.querySelectorAll('a.btn[data-name][data-price]');
    
    // Add a click event listener to all the buy buttons
    buyButtons.forEach(function(buyButton) {
        buyButton.addEventListener("click", function(event) {
            var productButton = event.target;
            var productName = productButton.getAttribute("data-name");
            var productPrice = parseInt(productButton.getAttribute("data-price"));
            var discountAmount = productPrice * 0.1;

            // Navigate to the parent element and find the image element
            var productImage = productButton.parentNode.parentNode.previousElementSibling.querySelector("img").getAttribute("src");

            // check if item is in cartItems and increment quantity if it is
            // else add item to cartItems
            // loop through the cart items and add the quantity to the cart count
            var itemExists = false;

            var productQuantity = 1;

            // if (itemExists) {
                
            cartItems.forEach(function(item) {
                if (item.name === productName) {
                    itemExists = true;
                    productQuantity = item.quantity + 1;
                }
            });
            
            // Create a cart item object
            var cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: productQuantity,
                discount: discountAmount
            };

            // if the item does not exist in the cart items array
            // push the cart item to the cart items array
            if (!itemExists) {
                cartItems.push(cartItem);
            }

            // save the cart items to local storage
            saveCartItemsToStorage(cartItems);
        });
    });
     
 });

// update the cart count in both the header and in the footer
updateCartCount();

// update the cart count in the header
function updateCartCount() {
    // get the cart items from local storage
    var cartItems = getCartItemsFromStorage();

    // get the cart count element
    var cartCountElement = document.querySelector('#myCart');

    // set the cart count to the cart count element
    cartCountElement.textContent = cartItems.length.toString() + " Items in your cart";
}

// Get existing cart items from local storage and save them to local storage
function saveCartItemsToStorage(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// get the object from local storage
function getCartItemsFromStorage() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return cartItems;
}