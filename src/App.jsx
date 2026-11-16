import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Instagram from './pages/Instagram';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="work" element={<Work />} />
				<Route path="projects" element={<Projects />} />
				<Route path="projects/:slug" element={<Project />} />
				<Route path="instagram" element={<Instagram />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
