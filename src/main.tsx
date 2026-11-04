import '@/assets/css/index.css';
import { Footer, Header, ScrollToTop } from '@/components';
import { ThemeProvider } from '@/context';
import { ExplorePage, LandingPage } from '@/pages';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const root = document.getElementById('root');

createRoot(root!).render(
	<StrictMode>
		<ThemeProvider>
			<Router>
				<Header />

				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/explore' element={<ExplorePage />} />
					<Route path='/animals' element={<LandingPage />} />
					<Route path='/trees' element={<LandingPage />} />
					<Route path='/visit' element={<LandingPage />} />
					<Route path='/kids' element={<LandingPage />} />
					<Route path='/kids/talking-trees' element={<LandingPage />} />
					<Route path='/kids/nature-matching' element={<LandingPage />} />
					<Route path='/kids/animal-quiz' element={<LandingPage />} />
					<Route path='/about' element={<LandingPage />} />
					<Route path='/conservation' element={<LandingPage />} />
					<Route path='/contact' element={<LandingPage />} />
					<Route path='/legal/privacy' element={<LandingPage />} />
					<Route path='/legal/accessibility' element={<LandingPage />} />
				</Routes>

				<Footer />
				<ScrollToTop />
			</Router>
		</ThemeProvider>
	</StrictMode>,
);
