import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as HotToast } from 'react-hot-toast'
import { ThemeProvider } from './components/theme-provider'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        defaultTheme='system'
        storageKey='ui-theme'
      >
        <RouterProvider router={router} />
        <Toaster />
        <HotToast />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
