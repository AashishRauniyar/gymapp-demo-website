import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import SignUp from './Pages/SignUp.jsx';
import SignIn from './Pages/SignIn.jsx';
import Profile from './Pages/Profile.jsx';



const router = createBrowserRouter(
  [
    {path : '/signUp',
    element: <SignUp />
    },
    {
    path: '/login',
    element: <SignIn />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/',
      element: <App />
    }
  ]
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
