var wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
var totalWish = parseFloat(localStorage.getItem('totalWish')) || 0;

function addToWishlist(button, itemName, itemPrice) {
	var item = {
		name: itemName,
		price: itemPrice,
		count: 1,
	};

	var wishlistImg = button.querySelector('.heart');

	var currentItem = wishlist.findIndex((p) => p.name === itemName);

	if (currentItem !== -1) {
		wishlist.splice(currentItem, 1);
		wishlistImg.src = '/images/icons/heart-regular.svg';
		totalWish -= itemPrice;
	} else {
		wishlist.push(item);
		wishlistImg.src = '/images/icons/heart-solid.svg';
		totalWish += itemPrice;
	}

	localStorage.setItem('wishlist', JSON.stringify(wishlist));
	localStorage.setItem('totalWish', totalWish);

	updateWishlist();
	calculateWishCount();
}

function removeWish(itemName) {
	var item = wishlist.find((p) => p.name === itemName);

	if (item) {
		totalWish -= item.price * item.count;
		wishlist = wishlist.filter((p) => p.name !== itemName);

		localStorage.setItem('wishlist', JSON.stringify(wishlist));
		localStorage.setItem('totalWish', totalWish);

		updateWishlist();
		calculateWishCount();
		updateWishlistButtons();
	}
}

function updateWishlist() {
	var wishlistItemsDiv = document.getElementById('wishlistItems');
	var totalWish = document.getElementById('totalWish');

	wishlistItemsDiv.innerHTML = '';

	wishlist.forEach((item) => {
		var wishlistItemDiv = document.createElement('div');
		wishlistItemDiv.classList.add('wishlist-item', 'my-3');

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
		removeButton.classList.add(
			'removeButton',
			'btn',
			'btn-danger',
			'border',
			'border-dark',
			'rounded-0',
			'text-light'
		);
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
	localStorage.setItem('totalWish', totalWish);
}

function calculateWishCount() {
	var totalWishCount = wishlist.reduce(
		(total, product) => total + product.count,
		0
	);
	document.getElementById('wishlistCount').innerText = totalWishCount;
}

function updateWishlistButtons() {
	var storedWish = localStorage.getItem('wishlist');
	var wishlist = storedWish ? JSON.parse(storedWish) : [];

	setTimeout(() => {
		document.querySelectorAll('button[data-item-name]').forEach((button) => {
			var itemName = button.getAttribute('data-item-name');
			var wishlistImg = button.querySelector('.heart');

			if (wishlistImg) {
				if (wishlist.some((item) => item.name === itemName)) {
					wishlistImg.src = '/images/icons/heart-solid.svg';
				} else {
					wishlistImg.src = '/images/icons/heart-regular.svg';
				}
			}
		});
	}, 1);
}

document.addEventListener('DOMContentLoaded', function () {
	updateWishlist();
	calculateWishCount();
	setInterval(updateWishlistButtons, 1);
});
