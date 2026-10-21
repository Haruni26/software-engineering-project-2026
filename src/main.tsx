import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './assets/css/index.css';
import { LandingPage } from './pages/landing';

const root = document.getElementById('root');

createRoot(root!).render(
	<StrictMode>
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
			</Routes>
		</Router>
	</StrictMode>,
);
