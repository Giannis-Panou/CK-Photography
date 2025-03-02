var prevScrollpos = window.scrollY;
window.onscroll = function () {
	var currentScrollPos = window.scrollY;

	if (prevScrollpos > currentScrollPos || prevScrollpos <= currentScrollPos) {
		document.querySelector('.navbar').style.top = '0px';
		document.querySelector('.navbar').style.backgroundColor = 'white';
		document.querySelector('.navbar').style.transition = '0.5s';
	} else {
		document.querySelector('.navbar').style.top = '-50px';
	}

	if (currentScrollPos <= 50) {
		document.querySelector('.navbar').style.backgroundColor =
			'rgba(0, 0, 0, 0.05)';
	}

	prevScrollpos = currentScrollPos;
};
