import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/Navbar.jsx'
import Dashboard from './Pages/Dashboard'
// import Sidebar from './components/Sidebar.jsx'
import Analytics from './Pages/Analytics.jsx'
import Transections from './Pages/Transections.jsx'
import Layout from './layout/Layout.jsx'
import Budgets from './Pages/Budgets.jsx'
import HomePage from './Pages/HomePage.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ProtectedRoute from "./components/ProtectedRouter";
// import { fetchTransactions } from './redux/expenceSlice.js'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import { refreshAccessToken } from './redux/authSlice.js'
import Profile from './Pages/Profile.jsx'

const router = createBrowserRouter([

  // HOME PAGE
  {
    path: "/",
    element: <HomePage />
  },

  // LOGIN PAGE
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },

  // ALL PROTECTED DASHBOARD PAGES
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "analytics",
        element: <Analytics />
      },
      {
        path: "transaction",
        element: <Transections />
      },
      {
        path: "budget",
        element: <Budgets />
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  }

]);
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshAccessToken());
  }, [dispatch]);
  
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
