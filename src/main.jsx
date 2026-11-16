import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Registers Bootstrap's data-bs-* handlers (the appearance dropdown)
import 'bootstrap';
// Self-hosted fonts for the alternative type pairings (only downloaded when used)
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/syne';
import './styles/index.scss';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { PageTransitionProvider } from './context/PageTransition';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<ToastProvider>
					<PageTransitionProvider>
						<App />
					</PageTransitionProvider>
				</ToastProvider>
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
);
