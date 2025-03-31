function saveItem(name, image, price) {
	const type = localStorage.getItem('itemType');
	const item = { name, image, price, type };
	localStorage.setItem('selectedItem', JSON.stringify(item));
	window.location.href = 'item.html';
}

function loadItem() {
	const item = JSON.parse(localStorage.getItem('selectedItem'));
	if (item) {
		document.getElementById('itemName').textContent = item.name;
		document.querySelectorAll('.itemImage').forEach((img) => {
			img.src = item.image;
		});
		document.getElementById('itemPrice').textContent = item.price;
	}

	document.querySelectorAll('.printImg').forEach((img) => {
		img.style.display = item.type === '1' ? 'block' : 'none';
	});
}

function setItemType() {
	if (window.location.pathname.includes('prints')) {
		localStorage.setItem('itemType', '1');
	} else if (window.location.pathname.includes('presets')) {
		localStorage.setItem('itemType', '2');
	}
}

document.addEventListener('DOMContentLoaded', setItemType);
