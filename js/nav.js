window.onscroll = function () {
	var scrollPos = window.scrollY;

	if (scrollPos > 50) {
		document.getElementById('header').style.position = 'sticky';
		document.getElementById('header').style.top = '0px';
		document.getElementById('header').style.backgroundColor = 'white';
		document.getElementById('header').style.transition = '0.5s';
	} else {
		document.getElementById('header').style.top = '-64.8px';
	}
};

document.addEventListener('DOMContentLoaded', function () {
	const overlay = document.querySelector('.overlay');
	const overlayReverse = document.querySelector('.overlay-reverse');
	const body = document.body;

	overlay.classList.add('hidden');
	overlayReverse.classList.add('hidden');
	body.classList.add('hidden');

	setTimeout(() => {
		overlay.classList.remove('hidden');
		body.classList.remove('hidden');
		body.classList.add('show');
	}, 100);

	document.querySelectorAll('.page-transition').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			overlayReverse.classList.remove('hidden');
			body.classList.add('hidden');

			setTimeout(() => {
				window.location.href = link.href;
			}, 500);
		});
	});
});
