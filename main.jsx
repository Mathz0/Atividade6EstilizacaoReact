import React from 'react'
import { createRoot } from 'react-dom/client'

//remova os comentários para testar as diferentes abordagens

// Global CSS
import App from './global/AppGlobal'

// CSS Modules
//import App from './modules/AppModules'

// Tailwind
//import App from './tailwind/AppTailwind'

// styled-components
//import App from './styled/AppStyled'

import './index.css'
createRoot(document.getElementById('root')).render(<App />)
