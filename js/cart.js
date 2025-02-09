var cart = [];
var totalAmount = 0;

function addToCart(itemName, itemPrice) {
	var item = {
		name: itemName,
		price: itemPrice,
		count: 1,
	};

	var currentItem = cart.find((p) => p.name === itemName);

	if (currentItem) {
		currentItem.count++;
	} else {
		cart.push(item);
	}

	totalAmount += itemPrice;
	updateCart();
	calculateItemCount();
	console.log('Added to cart:', itemName, 'Price:', itemPrice);
}

function increaseQuantity(itemName) {
	var item = cart.find((p) => p.name === itemName);

	if (item) {
		item.count++;
		totalAmount += item.price;
		updateCart();
	}
}

function decreaseQuantity(itemName) {
	var item = cart.find((p) => p.name === itemName);

	if (item) {
		if (item.count > 1) {
			item.count--;
			totalAmount -= item.price;
		} else {
			totalAmount -= item.price;
			cart = cart.filter((p) => p.name !== itemName);
		}

		updateCart();
		calculateItemCount();
	}
}

function removeItem(itemName) {
	var item = cart.find((p) => p.name === itemName);

	if (item) {
		totalAmount -= item.price * item.count;
		cart = cart.filter((p) => p.name !== itemName);

		updateCart();
		calculateItemCount();
	}
}

function updateCart() {
	var cartItemsDiv = document.getElementById('cartItems');
	var totalAmountSpan = document.getElementById('totalAmount');

	cartItemsDiv.innerHTML = '';
	cart.forEach((item) => {
		var cartItemDiv = document.createElement('div');
		cartItemDiv.classList.add('cart-item');

		var nameOfItem = document.createElement('div');
		nameOfItem.innerText = item.name;

		var priceOfItem = document.createElement('div');
		priceOfItem.innerText = new Intl.NumberFormat('el-GR', {
			style: 'currency',
			currency: 'EUR',
		}).format(item.price);

		var itemCountDiv = document.createElement('div');
		itemCountDiv.innerHTML = 'Quantity: ' + item.count;

		var increaseButton = document.createElement('button');
		increaseButton.innerText = '+';
		increaseButton.onclick = function () {
			increaseQuantity(item.name);
		};

		var decreaseButton = document.createElement('button');
		decreaseButton.innerText = '-';
		decreaseButton.onclick = function () {
			decreaseQuantity(item.name);
		};

		var removeButton = document.createElement('button');
		removeButton.innerText = 'Remove';
		removeButton.onclick = function () {
			removeItem(item.name);
		};

		cartItemDiv.appendChild(nameOfItem);
		cartItemDiv.appendChild(priceOfItem);
		cartItemDiv.appendChild(itemCountDiv);
		cartItemDiv.appendChild(increaseButton);
		cartItemDiv.appendChild(decreaseButton);
		cartItemDiv.appendChild(removeButton);
		cartItemsDiv.appendChild(cartItemDiv);
	});

	if (Math.abs(totalAmount) < 0.001) {
		totalAmount = 0;
	}
	totalAmountSpan.innerHTML = new Intl.NumberFormat('el-GR', {
		style: 'currency',
		currency: 'EUR',
	}).format(totalAmount);
}

function openCart() {
	var cartModal = document.getElementById('cartModal');
	cartModal.style.display = 'block';
}

function closeCart() {
	var cartModal = document.getElementById('cartModal');
	cartModal.style.display = 'none';
}

function checkout() {
	alert('Order Confirmed!');

	cart = [];
	totalAmount = 0;

	updateCart();
	closeCart();
	calculateItemCount();
}

function calculateItemCount() {
	var totalItemCount = cart.reduce(
		(total, product) => total + product.count,
		0
	);

	document.getElementById('cartItemCount').innerText = totalItemCount;
}

document.addEventListener('DOMContentLoaded', function () {
	updateCart();
});
