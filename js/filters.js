function filterItems() {
	let items = [];
	fetch('../data/items.json')
		.then((response) => response.json())
		.then((data) => {
			if (window.location.pathname.includes('prints')) {
				items = data.prints;
			} else {
				items = data.presets;
			}
			const categoryFilter = document.getElementById('category-filter').value;
			const minPrice = document.getElementById('min-price').value;
			const maxPrice = document.getElementById('max-price').value;
			const itemsContainer = document.querySelector('.col-pr1');

			itemsContainer.innerHTML = '';

			let foundItems = false;

			items.forEach((item) => {
				const meetsCategory =
					categoryFilter === 'all' || item.category === categoryFilter;
				const meetsMinPrice =
					minPrice === '' || item.price >= parseInt(minPrice);
				const meetsMaxPrice =
					maxPrice === '' || item.price <= parseInt(maxPrice);

				if (meetsCategory && meetsMinPrice && meetsMaxPrice) {
					foundItems = true;

					const itemElement = document.createElement('div');
					itemElement.className = 'col-pr2';
					itemElement.innerHTML = `
                        <a href=item.html>
                            <img src="${item.image}" alt="${item.name}">
                            <p class="item-title">${item.title}</p>
                            
                        </a>
                        <a>
                            <button class="btn rounded-1 border-secondary bg-primary" onclick="addToCart('${
															item.name
														}', ${item.price})" 
                                data-item-name="${item.name}" 
                                data-item-price="${
																	item.price
																}"> <img src="../images/icons/shopping-basket.png" alt="cart icon" id='basket' /> Add to Cart  - ${item.price.toFixed(
						2
					)}€ </button>
                            <button class="btn rounded-1 border-secondary" onclick="addToWishlist('${
															item.name
														}', ${item.price})" 
                                data-item-name="${item.name}" 
                                data-item-price="${
																	item.price
																}"> <img src="../images/icons/heart-regular.svg" alt="" id='heart' />  </button>
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
		})
		.catch((error) => console.error('Error loading items:', error));
}

document.addEventListener('DOMContentLoaded', filterItems);

function openClose() {
	let sidebar = document.getElementById('sidebar');

	if (sidebar.style.width == '400px') {
		sidebar.style.width = '0';
		sidebar.style.overflow = 'hidden';
	} else {
		sidebar.style.width = '400px';
		sidebar.style.overflow = 'hidden';
	}
}

function animMenu(x) {
	x.classList.toggle('change');
}

function mobileFilters() {
	var windowSize = window.matchMedia('(max-width: 600px)');
	const minPrice = document.getElementById('min-price');
	const maxPrice = document.getElementById('max-price');
	const filtersLabel = document.getElementById('filtersLabel');
	const barsDiv = document.getElementById('bars');

	if (windowSize.matches) {
		// Filters
		minPrice.classList.add('w-75');
		maxPrice.classList.add('w-75');
		filtersLabel.classList.remove('mt-3');
		filtersLabel.classList.add('mt-4');
		barsDiv.classList.add('mb-1');
	}
}

document.addEventListener('DOMContentLoaded', function () {
	requestAnimationFrame(() => {
		mobileFilters();
	});
});
