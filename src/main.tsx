import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import App from './app/app'
createRoot(document.getElementById('root')!).render(<App />)
