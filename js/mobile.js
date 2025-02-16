var windowSize = window.matchMedia('(max-width: 600px)');
const navbar = document.getElementById('defaultNavBar');
const title = document.getElementById('title');
const cartButton = document.getElementById('cartButton');
const wishButton = document.getElementById('wishButton');
const menu = document.getElementById('mobileMenu');
const footer = document.getElementById('footer');
const social = document.getElementById('social');
const itemDiv = document.getElementById('itemDiv');

function mobileView() {
	if (windowSize.matches) {
		console.log('works');
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

		footer.classList.remove('flex-row');
		footer.classList.add('flex-column');

		social.classList.add('my-2');

		itemDiv.classList.remove('flex-row');
		itemDiv.classList.add('flex-column');
	}
}

document.addEventListener('DOMContentLoaded', function () {
	mobileView();
});
