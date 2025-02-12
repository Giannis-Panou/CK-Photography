var wishlist = [];
var totalWish = 0;

function addToWishlist(itemName, itemPrice) {
	var item = {
		name: itemName,
		price: itemPrice,
		count: 1,
	};

	var storedWish = localStorage.getItem('wishlist');
	wishlist = storedWish ? JSON.parse(storedWish) : [];

	var currentItem = wishlist.find((p) => p.name === itemName);

	if (currentItem) {
		alert('This item is already in your wishlist.');
	} else {
		wishlist.push(item);
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
		localStorage.setItem('totalWish', totalWish);
		updateWishlist();
		calculateWishCount();
		alert('This item has been added to your wishlist.');
	}

	totalWish += itemPrice;

	saveWishlist();
}

function removeWish(itemName) {
	var item = wishlist.find((p) => p.name === itemName);

	if (item) {
		totalWish -= item.price * item.count;
		wishlist = wishlist.filter((p) => p.name !== itemName);

		localStorage.setItem('wishlist', JSON.stringify(wishlist));
		localStorage.setItem('totalWish', totalWish);

		saveWishlist();
		updateWishlist();
		calculateWishCount();
	}
}

function updateWishlist() {
	var storedWish = localStorage.getItem('wishlist');
	wishlist = storedWish ? JSON.parse(storedWish) : [];
	totalWish = parseFloat(localStorage.getItem('totalWish')) || 0;

	var wishlistItemsDiv = document.getElementById('wishlistItems');
	var totalWish = document.getElementById('totalWish');

	wishlistItemsDiv.innerHTML = '';

	wishlist.forEach((item) => {
		var wishlistItemDiv = document.createElement('div');
		wishlistItemDiv.classList.add('wishlist-item');
		wishlistItemDiv.classList.add('my-3');

		var nameOfItem = document.createElement('div');
		nameOfItem.classList.add('my-1');
		nameOfItem.innerText = item.name;

		var priceOfItem = document.createElement('div');
		priceOfItem.classList.add('mb-2');
		priceOfItem.innerText = new Intl.NumberFormat('el-GR', {
			style: 'currency',
			currency: 'EUR',
		}).format(item.price);

		var itemCountDiv = document.createElement('div');
		itemCountDiv.classList.add('my-1');
		itemCountDiv.innerHTML = 'Quantity: ' + item.count;

		var removeButton = document.createElement('button');
		removeButton.classList.add('removeButton');
		removeButton.classList.add('btn');
		removeButton.classList.add('btn-danger');
		removeButton.classList.add('border');
		removeButton.classList.add('border-dark');
		removeButton.classList.add('rounded-1');
		removeButton.innerText = 'Remove';
		removeButton.onclick = function () {
			removeWish(item.name);
		};

		wishlistItemDiv.appendChild(nameOfItem);
		wishlistItemDiv.appendChild(priceOfItem);
		wishlistItemDiv.appendChild(removeButton);
		wishlistItemsDiv.appendChild(wishlistItemDiv);
	});

	if (Math.abs(totalWish) < 0.001) {
		totalWish = 0;
	}
	totalWish.innerHTML = new Intl.NumberFormat('el-GR', {
		style: 'currency',
		currency: 'EUR',
	}).format(totalWish);
}

function openWishlist() {
	var wishlistModal = document.getElementById('wishlistModal');
	wishlistModal.style.display = 'block';
}

function closeWishlist() {
	var wishlistModal = document.getElementById('wishlistModal');
	wishlistModal.style.display = 'none';
}

function saveWishlist() {
	localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function calculateWishCount() {
	var totalWishCount = wishlist.reduce(
		(total, product) => total + product.count,
		0
	);
	document.getElementById('wishlistCount').innerText = totalWishCount;
}

document.addEventListener('DOMContentLoaded', function () {
	updateWishlist();
	calculateWishCount();
});
