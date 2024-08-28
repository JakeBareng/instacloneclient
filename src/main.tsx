import ReactDOM from 'react-dom/client'
import { RouterProvider} from 'react-router-dom'
import './index.css'
import { AuthProvider } from './hooks/useAuth.tsx'
import { router } from './routes.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
,)
