import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { readJSON, writeJSON } from '../utils/storage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
	const [wishlist, setWishlist] = useState(() => readJSON('wishlist', []));

	useEffect(() => {
		writeJSON('wishlist', wishlist);
	}, [wishlist]);

	const value = useMemo(
		() => ({
			wishlist,
			wishCount: wishlist.length,
			isWished: (name) => wishlist.some((p) => p.name === name),
			toggleWish: (name, price) =>
				setWishlist((items) =>
					items.some((p) => p.name === name)
						? items.filter((p) => p.name !== name)
						: [...items, { name, price, count: 1 }]
				),
			removeWish: (name) =>
				setWishlist((items) => items.filter((p) => p.name !== name)),
		}),
		[wishlist]
	);

	return (
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	);
}

export function useWishlist() {
	return useContext(WishlistContext);
}
