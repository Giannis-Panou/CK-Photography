function adjustFooterPosition() {
	const footer = document.querySelector('footer');
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

window.addEventListener('load', () => {
	requestAnimationFrame(() => {
		setTimeout(adjustFooterPosition, 100);
	});
});
window.addEventListener('resize', adjustFooterPosition);

new MutationObserver(adjustFooterPosition).observe(document.body, {
	childList: true,
	subtree: true,
});
