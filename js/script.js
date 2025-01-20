const items = [
	{
		name: 'Flatiron NYC',
		category: 'portrait',
		image: '../images/items/portraits/print1.png',
		title: 'Flatiron NYC',
		price: 19.99,
	},
	{
		name: 'Fly Away',
		category: 'portrait',
		image: '../images/items/portraits/print2.png',
		title: 'Fly Away',
		price: 29.99,
	},
	{
		name: 'Neon City',
		category: 'portrait',
		image: '../images/items/portraits/print3.png',
		title: 'Neon City',
		price: 39.99,
	},
	{
		name: 'Neon Alley',
		category: 'portrait',
		image: '../images/items/portraits/print4.png',
		title: 'Neon Alley',
		price: 49.99,
	},
	{
		name: 'Into the Clouds',
		category: 'landscape',
		image: '../images/items/landscapes/land1.png',
		title: 'Into the Clouds',
		price: 19.99,
	},
	{
		name: 'Endless Green',
		category: 'landscape',
		image: '../images/items/landscapes/land2.png',
		title: 'Endless Green',
		price: 29.99,
	},
	{
		name: 'Below Zero',
		category: 'landscape',
		image: '../images/items/landscapes/land3.png',
		title: 'Below Zero',
		price: 39.99,
	},
	{
		name: 'Golden Mountain',
		category: 'landscape',
		image: '../images/items/landscapes/land4.png',
		title: 'Golden Mountain',
		price: 49.99,
	},
	{
		name: 'Urban Jungle',
		category: 'portrait',
		image: '../images/items/portraits/print5.png',
		title: 'Urban Jungle',
		price: 19.99,
	},
	{
		name: 'Gray Boulevard',
		category: 'portrait',
		image: '../images/items/portraits/print6.png',
		title: 'Gray Boulevard',
		price: 29.99,
	},
	{
		name: 'Among Giants',
		category: 'portrait',
		image: '../images/items/portraits/print7.png',
		title: 'Among Giants',
		price: 39.99,
	},
	{
		name: 'Taking a Shortcut',
		category: 'portrait',
		image: '../images/items/portraits/print8.png',
		title: 'Taking a Shortcut',
		price: 49.99,
	},
	{
		name: 'Villain Stronghold',
		category: 'landscape',
		image: '../images/items/landscapes/land5.png',
		title: 'Villain Stronghold',
		price: 19.99,
	},
	{
		name: 'Message from the Gods',
		category: 'landscape',
		image: '../images/items/landscapes/land6.png',
		title: 'Message from the Gods',
		price: 29.99,
	},
	{
		name: 'Blue Paradise',
		category: 'landscape',
		image: '../images/items/landscapes/land7.png',
		title: 'Blue Paradise',
		price: 39.99,
	},
	{
		name: 'Above the Clouds',
		category: 'landscape',
		image: '../images/items/landscapes/land8.png',
		title: 'Above the Clouds',
		price: 49.99,
	},
];

function filterItems() {
	const categoryFilter = document.getElementById('category-filter').value;
	const minPrice = document.getElementById('min-price').value;
	const maxPrice = document.getElementById('max-price').value;
	const itemsContainer = document.querySelector('.col-pr1');

	itemsContainer.innerHTML = '';

	let foundItems = false;

	items.forEach((item) => {
		const meetsCategory =
			categoryFilter === 'all' || item.category === categoryFilter;
		const meetsMinPrice = minPrice === '' || item.price >= parseInt(minPrice);
		const meetsMaxPrice = maxPrice === '' || item.price <= parseInt(maxPrice);

		if (meetsCategory && meetsMinPrice && meetsMaxPrice) {
			foundItems = true;

			const itemElement = document.createElement('div');
			itemElement.className = 'col-pr2';
			itemElement.innerHTML = `
            <a href=item.html>
            <img src="${item.image}" alt="${item.name}">
            <p class="item-title">${item.title}</p>
            <p class="item-price">${item.price.toFixed(2)}€</p>
            </a>
            <a>
            <button onclick="addToCart('${item.name}', ${
				item.price
			})" data-item-name="${item.name}" data-item-name="${
				item.name
			}" data-item-price="${item.price}"> Add to Cart </button>
            <button onclick="addToWishlist('${item.name}', ${
				item.price
			})" data-item-name="${item.name}" data-item-name="${
				item.name
			}" data-item-price="${item.price}"> Add to Wishlist </button>
            </a>
            `;

			itemsContainer.appendChild(itemElement);
		}
	});

	if (!foundItems) {
		const noItemMessage = document.createElement('p');
		noItemMessage.textContent = 'No Items Found.';
		itemsContainer.appendChild(noItemMessage);
	}
}

filterItems();

function openClose() {
	let sidebar = document.getElementById('sidebar');
	if (sidebar.style.width == '525px') {
		sidebar.style.width = '0';
	} else {
		sidebar.style.width = '525px';
	}
}

function animMenu(x) {
	x.classList.toggle('change');
}
