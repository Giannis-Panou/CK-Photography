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
							<p class="item-title text-uppercase">${item.title}</p>
							<p class="item-price fw-semibold">${item.price.toFixed(2)}€</p>
                        </a>
						<div>
							<button 
							class="btn btn-primary rounded-1 border-secondary" 
							onclick="addToCart('${item.name}', ${item.price})" 
							data-item-name="${item.name}" 
							data-item-price="${item.price}"> 
							<img src="../images/icons/shopping-basket.png" alt="cart icon" id='basket' />
							Add to Cart</button>
							
							<button
							class="btn btn-light rounded-1 border-secondary"
							onclick="addToWishlist(this, '${item.name}', ${item.price})" 
							data-item-name="${item.name}" 
							data-item-price="${item.price}"> 
							<img src="../images/icons/heart-regular.svg" alt="heart icon" class='heart' id='heart' />  </button>
						</div>
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
