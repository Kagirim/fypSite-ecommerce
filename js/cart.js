// get the products from local storage and display them in the cart through table rows
document.addEventListener("DOMContentLoaded", function() {
    // Get the table body from table with class "table table-bordered"
    var cartTable = document.querySelector("table.table-bordered tbody");

    // initialise the cart items html
    var cartItemsHtml = "";

    // Loop through the cart items and create table rows for each item
    updatedItems().forEach(function (cartItem) {
        var name = cartItem.name;
        var price = cartItem.price;
        var discount = cartItem.discount;
        var image = cartItem.image;
        var quantity = cartItem.quantity;


        // build the cart items html
        cartItemsHtml += `
        <tr>
            <td> <img width="60" src=${image} alt=" "/></td>
            <td>${name}<br/></td>
            <td>
                <div class="input-append">
                    <input class="span1" style="max-width:34px" value=${quantity} id="appendedInputButtons" size="16" type="text">
                        <button class="btn" type="button">
                            <i class="icon-minus"></i>
                        </button>
                        <button class="btn" type="button">
                            <i class="icon-plus"></i>
                        </button>
                        <button class="btn btn-danger" type="button">
                            <i class="icon-remove icon-white"></i>
                        </button>
                </div>
            </td>
            <td>${price}</td>
            <td>${discount}</td>
            <td>--</td>
            <td>${price - discount}</td>
        </tr>`;
    }
    );

    // grand total
    var grandTotal = grand_total(total_price_discount(updatedItems())[0], total_price_discount(updatedItems())[1]);
    
    // build the cart footer row
    cartItemsHtml += `
            <tr>
                <td colspan="6" style="text-align:right">Total Price:	</td>
                <td>${total_price_discount()[0]}</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right">Total Discount:	</td>
                <td>${total_price_discount()[1]}</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right">--</td>
                <td>--</td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right"><strong>TOTAL (${total_price_discount()[0]} - ${total_price_discount()[1]}) =</strong></td>
                <td class="label label-important" style="display:block"> <strong> $ ${grandTotal} </strong></td>
            </tr>

            <tr>
				<td> 
					<form class="form-horizontal">
						<div class="control-group">
							<label class="control-label"><strong> VOUCHERS CODE: </strong> </label>
								<div class="controls">
									<input type="text" class="input-medium" placeholder="CODE">
										<button type="submit" class="btn"> ADD </button>
								</div>
						</div>
					</form>
				</td>
			</tr>
        </tbody>
    </table>
    `

    // append the cart footer
    cartTable.innerHTML += cartItemsHtml;

    // select icon-minus inputs
    var minusButton = document.querySelectorAll(".input-append .btn i.icon-minus");
    
    // Add click event listeners to the minus buttons
    minusButton.forEach(function (btn){
        btn.addEventListener("click", (event) => {
            // get the input field element from this element
            var quantityInput = event.target.parentNode.parentNode.querySelector("input.span1");

            // get the current quality value from teh input field
            var currentQuantity = parseInt(quantityInput.value);
            
            // decrement the current value if greater than 1
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
            }
        });
        
    })

    // Add click event listeners to the plus buttons
    document.querySelectorAll(".input-append .btn i.icon-plus").forEach(function (btn) {
        btn.addEventListener("click", (event) => {
            // get the input element holding the value
            var quantityInput = event.target.parentNode.parentNode.querySelector("input.span1");

            // extract the value and convert into int
            var currentQuantity = parseInt(quantityInput.value);

            // increment the current quantity
            currentQuantity ++;

            // set the quantity on the input value
            quantityInput.value = currentQuantity;

            // Update the total price and total discount
            updateTotalPriceAndDiscount();
        });
    })

    // Add click event listeners to the remove buttons
    document.querySelectorAll(".icon-remove").forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            var tableRow = event.target.parentNode.parentNode.parentNode.parentNode;
            tableRow.remove();

            // get the name of the item to be deleted
            var itemName = tableRow.querySelector("td:nth-child(2)").textContent;

            // delete the item from local storage
            deleteItemFromStorage(itemName);

            // update the cart count
            updateCartCount();

            // Update the total price and total discount
            updateTotalPriceAndDiscount();
            
        });
        
    });

    // function to Get the total price and total discount
    function total_price_discount() {
        var totalPrice = 0;
        var totalDiscount = 0;

        updatedItems().forEach(function (item) {
            totalPrice += item.price;
            totalDiscount += item.discount;
        });

        return [totalPrice, totalDiscount];

    }

    //calculate grand total
    function grand_total(totalPrice, totalDiscount) {

        var grandTotal = totalPrice - totalDiscount;
        return grandTotal;

    }

    // delete an item from local storage
    function deleteItemFromStorage(itemName) {
        updatedItems().forEach(function (cartItem, index) {
            if (cartItem.name === itemName) {
                updatedItems().splice(index, 1);
            }
        });

        saveCartItemsToStorage(updatedItems());
    }

    // set the cart count in the header
    function updateCartCount() {
        var cartCount = document.querySelector("#myCart img");
        cartCount.textContent = updatedItems().length;
        cartCount.textContent += " Items in your cart"
    }

    // update the total price and total discount
    function updateTotalPriceAndDiscount() {
        // get the table rows that contain the total price, total discount and grand total
        var totalPriceRow = document.querySelector("table.table-bordered tbody tr:nth-last-child(3) td:nth-last-child(1)");
        var totalDiscountRow = document.querySelector("table.table-bordered tbody tr:nth-last-child(2) td:nth-last-child(1)");
        var grandTotalRow = document.querySelector("table.table-bordered tbody tr:last-child td:last-child");

        console.log(totalPriceRow);
        console.log(totalDiscountRow);
        console.log(grandTotalRow);

    }

    
    // update the total price and total discount
    function updatedItems() {
        var cartItems = getCartItemsFromStorage();
        
        return cartItems;

    }

    // get the object from local storage
    function getCartItemsFromStorage() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        return cartItems;

    }

    // save the objects to local storage
    function saveCartItemsToStorage(cartItems) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

});