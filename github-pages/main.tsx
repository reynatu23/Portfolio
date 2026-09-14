import { createRoot } from 'react-dom/client';
import Portfolio from '../app/Portfolio';
import '../app/globals.css';
import '../app/cd-studio.css';
import '../app/neo-studio.css';

createRoot(document.getElementById('root')!).render(<Portfolio />);
