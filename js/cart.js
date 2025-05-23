var cart = [];
var totalAmount = 0;

function addToCart(itemName, itemPrice) {
	var item = {
		name: itemName,
		price: itemPrice,
		count: 1,
	};

	var storedItems = localStorage.getItem('cart');
	cart = storedItems ? JSON.parse(storedItems) : [];

	var currentItem = cart.find((p) => p.name === itemName);

	if (currentItem) {
		currentItem.count++;
	} else {
		cart.push(item);
	}

	totalAmount += itemPrice;
	localStorage.setItem('cart', JSON.stringify(cart));
	localStorage.setItem('totalAmount', totalAmount);
	saveCart();
	updateCart();
	calculateItemCount();
}

function increaseQuantity(itemName) {
	var item = cart.find((p) => p.name === itemName);

	if (item) {
		item.count++;
		totalAmount += item.price;

		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('totalAmount', totalAmount);

		saveCart();
		updateCart();
		calculateItemCount();
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

		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('totalAmount', totalAmount);

		saveCart();
		updateCart();
		calculateItemCount();
	}
}

function removeItem(itemName) {
	var item = cart.find((p) => p.name === itemName);

	if (item) {
		totalAmount -= item.price * item.count;
		cart = cart.filter((p) => p.name !== itemName);

		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('totalAmount', totalAmount.toFixed(2));

		saveCart();
		updateCart();
		calculateItemCount();
	}
}

function updateCart() {
	var storedItems = localStorage.getItem('cart');
	cart = storedItems ? JSON.parse(storedItems) : [];
	totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

	var cartItemsDiv = document.getElementById('cartItems');
	var totalAmountSpan = document.getElementById('totalAmount');

	cartItemsDiv.innerHTML = '';

	cart.forEach((item) => {
		var cartItemDiv = document.createElement('li');
		cartItemDiv.classList.add('cart-item');
		cartItemDiv.classList.add('my-3');
		cartItemDiv.classList.add('list-unstyled');

		var nameOfItem = document.createElement('div');
		nameOfItem.classList.add('my-1');
		nameOfItem.innerText = item.name;

		var totalItemPrice = item.price * item.count;
		var priceOfItem = document.createElement('div');
		priceOfItem.classList.add('mb-2');
		priceOfItem.innerText = new Intl.NumberFormat('el-GR', {
			style: 'currency',
			currency: 'EUR',
		}).format(totalItemPrice);

		var itemCountDiv = document.createElement('div');
		itemCountDiv.classList.add('my-1');
		itemCountDiv.innerHTML = 'Quantity: ' + item.count;

		var increaseButton = document.createElement('button');
		increaseButton.classList.add(
			'increaseButton',
			'btn',
			'btn-light',
			'border',
			'border-secondary',
			'rounded-0',
			'me-2'
		);
		increaseButton.innerText = '+';
		increaseButton.onclick = function () {
			increaseQuantity(item.name);
		};

		var decreaseButton = document.createElement('button');
		decreaseButton.classList.add(
			'decreaseButton',
			'btn',
			'btn-light',
			'border',
			'border-secondary',
			'rounded-0',
			'me-2'
		);

		decreaseButton.innerText = '-';
		decreaseButton.onclick = function () {
			decreaseQuantity(item.name);
		};

		var removeButton = document.createElement('button');
		removeButton.classList.add(
			'removeButton',
			'btn',
			'btn-danger',
			'border',
			'border-secondary',
			'rounded-0',
			'me-2',
			'text-light'
		);

		removeButton.innerText = 'Remove';
		removeButton.onclick = function () {
			removeItem(item.name);
		};

		cartItemDiv.appendChild(nameOfItem);
		cartItemDiv.appendChild(itemCountDiv);
		cartItemDiv.appendChild(priceOfItem);
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

function saveCart() {
	localStorage.setItem('cart', JSON.stringify(cart));
	localStorage.setItem('totalAmount', totalAmount.toFixed(2));
}

document.addEventListener('DOMContentLoaded', function () {
	updateCart();
	calculateItemCount();
});
