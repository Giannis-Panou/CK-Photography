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
		footer.style.position = 'static';
	}
}

window.addEventListener('DOMContentLoaded', () => {
	setTimeout(adjustFooterPosition, 300);
});
window.addEventListener('resize', adjustFooterPosition);

new MutationObserver(adjustFooterPosition).observe(document.body, {
	childList: true,
	subtree: true,
});
