import '@/assets/css/index.css';
import { Footer, Header, ScrollToTop } from '@/components';
import { AudioProvider, ThemeProvider } from '@/contexts';
import { AboutPage, AnimalsPage, ContactPage, ExplorePage, LandingPage, TreesPage } from '@/pages';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const root = document.getElementById('root');

createRoot(root!).render(
	<StrictMode>
		<ThemeProvider>
			<AudioProvider>
				<Router>
					<Header />

					<Routes>
						<Route path='/' element={<LandingPage />} />
						<Route path='/explore' element={<ExplorePage />} />
						<Route path='/animals' element={<AnimalsPage />} />
						<Route path='/trees' element={<TreesPage />} />
						<Route path='/visit' element={<LandingPage />} />
						<Route path='/kids' element={<LandingPage />} />
						<Route path='/kids/talking-trees' element={<LandingPage />} />
						<Route path='/kids/nature-matching' element={<LandingPage />} />
						<Route path='/kids/animal-quiz' element={<LandingPage />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/conservation' element={<LandingPage />} />
						<Route path='/contact' element={<ContactPage />} />
						<Route path='/legal/privacy' element={<LandingPage />} />
						<Route path='/legal/accessibility' element={<LandingPage />} />
					</Routes>

					<Footer />
					<ScrollToTop />
				</Router>
			</AudioProvider>
		</ThemeProvider>
	</StrictMode>,
);
