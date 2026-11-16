import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Item from './pages/Item';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Journal from './pages/Journal';
import JournalPost from './pages/JournalPost';

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="prints" element={<Shop key="prints" type="prints" />} />
				<Route path="presets" element={<Shop key="presets" type="presets" />} />
				<Route path="item/:name" element={<Item />} />
				<Route path="journal" element={<Journal />} />
				<Route path="journal/:slug" element={<JournalPost />} />
				<Route path="about" element={<About />} />
				<Route path="checkout" element={<Checkout />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
