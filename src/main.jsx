import { createRoot } from 'react-dom/client'
import '@fontsource/almarai/300.css';
import '@fontsource/almarai/400.css';
import '@fontsource/almarai/700.css';

import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
