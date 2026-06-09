import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px",
            },

            iconTheme: {
              primary: "#fff",
              secondary: "#ef4444",
            },
          }
        }}
      />
    </Provider>
  </StrictMode>,
)
