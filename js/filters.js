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
					itemElement.classList.add(
						'animated',
						'animatedFadeInDown',
						'fadeInDown'
					);
					itemElement.innerHTML = `
                        <a href=item.html class='page-transition' onclick="saveItem('${
													item.name
												}', '${item.image}', ${item.price})">
							<img src="${item.image}" alt="${item.name}">
							<p class="item-title text-uppercase">${item.title}</p>
							<p class="item-price fw-semibold">${item.price.toFixed(2)}€</p>
                        </a>
						<div class='item-buttons'>
							<button 
							class="btn btn-primary rounded-0 border-secondary" 
							onclick="addToCart('${item.name}', ${item.price})"
							id='cartItemButton'
							data-item-name="${item.name}" 
							data-item-price="${item.price}"> 
							<img src="/images/icons/shopping-basket.png" alt="cart icon" id='basket' />
							Add to Cart</button>
							
							<button
							class="btn btn-light rounded-0 border-secondary"
							onclick="addToWishlist(this, '${item.name}', ${item.price})" 
							data-item-name="${item.name}" 
							data-item-price="${item.price}"> 
							<img src="/images/icons/heart-regular.svg" alt="heart icon" class='heart' id='heart' />  </button>
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
		.catch((error) => console.error('Error loading items:', error))
		.finally(() => {
			const itemsContainer = document.querySelector('.col-pr1');
			waitForImages(itemsContainer).then(() => {
				adjustFooterPosition();
			});
		});
}

document.addEventListener('DOMContentLoaded', filterItems);

// Footer Adjustment
function adjustFooterPosition() {
	const footer = document.querySelector('footer');
	if (!footer) return;

	const viewportHeight = window.innerHeight;
	const pageHeight = document.documentElement.scrollHeight;

	if (pageHeight <= viewportHeight) {
		footer.style.position = 'absolute';
		footer.style.bottom = '0';
		footer.style.left = '0';
		footer.style.width = '100%';
	} else {
		footer.style.position = 'relative';
	}
}

window.addEventListener('resize', adjustFooterPosition);

new MutationObserver(adjustFooterPosition).observe(document.body, {
	childList: true,
	subtree: true,
});

// Wait for all images in a container to load
function waitForImages(container) {
	const images = container.querySelectorAll('img');

	if (images.length === 0) {
		return Promise.resolve();
	}

	const promises = Array.from(images).map((img) => {
		if (img.complete) return Promise.resolve();
		return new Promise((resolve) => {
			img.addEventListener('load', resolve);
			img.addEventListener('error', resolve);
		});
	});

	return Promise.all(promises);
}

function openClose() {
	let sidebar = document.getElementById('sidebar');

	if (sidebar.style.width == '400px') {
		sidebar.style.width = '0';
		sidebar.style.overflow = 'hidden';
	} else {
		sidebar.style.width = '400px';
		sidebar.style.overflow = 'visible';
	}
}

function animMenu(x) {
	x.classList.toggle('change');
}
