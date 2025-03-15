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

// // Page Transition Trigger
// document.querySelectorAll('.page-transition').forEach((link) => {
// 	link.addEventListener('click', function (e) {
// 		e.preventDefault();

// 		const targetURL = this.getAttribute('href');
// 		const overlay = document.querySelector('.overlay');
// 		const body = document.body;

// 		overlay.classList.add('show');
// 		body.classList.add('hidden');

// 		setTimeout(() => {
// 			window.location.href = targetURL;
// 		}, 500);
// 	});
// });

// // Page Load Trigger
// document.addEventListener('DOMContentLoaded', function () {
// 	const overlay = document.querySelector('.overlay-reverse');
// 	const body = document.body;

// 	overlay.classList.add('show');
// 	body.classList.add('show');

// 	setTimeout(() => {
// 		body.classList.add('hidden');
// 		overlay.classList.add('hidden');
// 	}, 500);
// });

document.addEventListener('DOMContentLoaded', function () {
	const overlay = document.querySelector('.overlay'); // Regular overlay (fade-in)
	const overlayReverse = document.querySelector('.overlay-reverse'); // Reverse overlay (fade-out)
	const body = document.body;

	// Initially hide both overlays
	overlay.classList.add('hidden'); // Make sure overlay is hidden initially
	overlayReverse.classList.add('hidden'); // Make sure reverse overlay is hidden initially
	body.classList.add('hidden'); // Make sure body content is hidden initially

	// Show the overlay and body content when the page is ready
	setTimeout(() => {
		overlay.classList.remove('hidden'); // Show the regular overlay
		body.classList.remove('hidden'); // Show body content with fade-in
		body.classList.add('show'); // Fade-in body content
	}, 100); // Small delay for page rendering

	// When a link is clicked, trigger reverse overlay animation (fade-out)
	document.querySelectorAll('.page-transition').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault(); // Prevent default link behavior (page load)

			// Show reverse overlay and fade-out body content
			overlayReverse.classList.remove('hidden'); // Show reverse overlay
			body.classList.add('hidden'); // Fade-out body content

			// After the reverse fade-out animation finishes, navigate to the target page
			setTimeout(() => {
				window.location.href = link.href; // Redirect to the target page
			}, 500); // Wait for the fade-out animation (500ms) to complete
		});
	});
});
