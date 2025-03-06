var windowSize = window.matchMedia('(max-width: 600px)');
const navbar = document.getElementById('defaultNavBar');
const title = document.getElementById('title');
const cartButton = document.getElementById('cartButton');
const wishButton = document.getElementById('wishButton');
const menu = document.getElementById('mobileMenu');
const footer = document.getElementById('footer');
const social = document.getElementById('social');
const itemDiv = document.getElementById('itemDiv');
const itemDisc = document.getElementById('itemDisc');
const imgWrapper = document.getElementById('imgWrapper');
const reviewDiv = document.getElementById('reviewDiv');
const ratingBar = document.querySelectorAll('.rating-bar');
const aboutDiv = document.querySelectorAll('#about');
const captionDiv = document.getElementById('captionDiv');
const captionTitle = document.getElementById('captionTitle');

function mobileView() {
	if (windowSize.matches) {
		// Navbar
		navbar.classList.remove('d-flex');
		navbar.classList.add('d-none');
		title.innerHTML = 'CK';
		title.classList.add('my-2');
		cartButton.classList.add(
			'd-flex',
			'flex-row',
			'text-decoration-none',
			'text-dark'
		);
		wishButton.classList.add(
			'd-flex',
			'flex-row',
			'text-decoration-none',
			'text-dark'
		);
		menu.classList.remove('d-none');
		menu.classList.add('d-block');

		// Footer
		if (footer) {
			footer.classList.remove('flex-row');
			footer.classList.add('flex-column');
			social.classList.add('my-2');
		}

		// Main Page
		if (captionDiv) {
			captionDiv.classList.remove(
				'position-absolute',
				'start-50',
				'translate-middle'
			);
		}

		// Item Page
		itemDiv.classList.remove('flex-row');
		itemDiv.classList.add('flex-column');
		itemDisc.classList.remove('w-50');
		imgWrapper.style.height = '400px';
		reviewDiv.classList.remove('w-75', 'mx-auto');
		ratingBar.forEach((bar) => {
			bar.classList.remove('mx-3');
			bar.classList.add('mx-2');
		});

		// About Page
		aboutDiv.forEach((div) => {
			div.classList.remove('flew-row');
			div.classList.add('flex-column');
		});
	}
}

document.addEventListener('DOMContentLoaded', mobileView);

document.addEventListener('DOMContentLoaded', function () {
	requestAnimationFrame(() => {
		mobileView();
	});
});
