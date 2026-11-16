import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Registers Bootstrap's data-bs-* handlers (modals, offcanvas, dropdowns, carousel)
import 'bootstrap';
// Self-hosted fonts for the alternative type pairings (only downloaded when used)
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource-variable/inter';
import './styles/index.scss';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { PageTransitionProvider } from './context/PageTransition';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<CartProvider>
					<WishlistProvider>
						<ToastProvider>
							<PageTransitionProvider>
								<App />
							</PageTransitionProvider>
						</ToastProvider>
					</WishlistProvider>
				</CartProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
