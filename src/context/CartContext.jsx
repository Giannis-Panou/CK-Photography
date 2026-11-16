import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
	const [cart, setCart] = useState(() => readJSON('cart', []));

	useEffect(() => {
		writeJSON('cart', cart);
	}, [cart]);

	const value = useMemo(() => {
		const changeCount = (name, delta) =>
			setCart((items) =>
				items
					.map((p) => (p.name === name ? { ...p, count: p.count + delta } : p))
					.filter((p) => p.count > 0)
			);

		return {
			cart,
			total: cart.reduce((sum, p) => sum + p.price * p.count, 0),
			itemCount: cart.reduce((sum, p) => sum + p.count, 0),
			addToCart: (name, price) =>
				setCart((items) =>
					items.some((p) => p.name === name)
						? items.map((p) =>
								p.name === name ? { ...p, count: p.count + 1 } : p
						  )
						: [...items, { name, price, count: 1 }]
				),
			increaseQuantity: (name) => changeCount(name, 1),
			decreaseQuantity: (name) => changeCount(name, -1),
			removeItem: (name) =>
				setCart((items) => items.filter((p) => p.name !== name)),
		};
	}, [cart]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	return useContext(CartContext);
}
