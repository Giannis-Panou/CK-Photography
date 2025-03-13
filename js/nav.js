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