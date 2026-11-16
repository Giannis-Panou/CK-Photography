const euro = new Intl.NumberFormat('el-GR', {
	style: 'currency',
	currency: 'EUR',
});

export function formatPrice(amount) {
	// Avoid showing "-0,00 €" from floating point drift
	return euro.format(Math.abs(amount) < 0.001 ? 0 : amount);
}
