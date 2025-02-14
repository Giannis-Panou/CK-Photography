var windowSize = window.matchMedia('(max-width: 600px)');
const navbar = document.getElementById('defaultNavBar');
const title = document.getElementById('title');
const menu = document.getElementById('mobileMenu');
const footer = document.getElementById('footer');
const social = document.getElementById('social');

function mobileView() {
	if (windowSize.matches) {
		navbar.classList.remove('d-flex');
		navbar.classList.add('d-none');

		title.innerHTML = 'CK';

		menu.classList.remove('d-none');
		menu.classList.add('d-block');

		footer.classList.remove('flex-row');
		footer.classList.add('flex-column');

		social.classList.add('my-2');
	}
}

document.addEventListener('DOMContentLoaded', function () {
	mobileView();
});
