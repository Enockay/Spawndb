import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Landing from '../pages/Landing';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import DatabaseDetail from '../pages/DatabaseDetail';
import CreateDatabase from '../pages/CreateDatabase';
import Billing from '../pages/Billing';
import StripeSuccess from '../pages/StripeSuccess';
import StripeCancel from '../pages/StripeCancel';

const router = createBrowserRouter([
  { path: '/',                 element: <Landing /> },
  { path: '/signup',           element: <Signup /> },
  { path: '/login',            element: <Login /> },
  { path: '/forgot-password',  element: <ForgotPassword /> },
  { path: '/reset-password',   element: <ResetPassword /> },
  { path: '/stripe/success',   element: <StripeSuccess /> },
  { path: '/stripe/cancel',    element: <StripeCancel /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard',          element: <Dashboard /> },
      { path: '/databases/new',      element: <CreateDatabase /> },
      { path: '/databases/:id',      element: <DatabaseDetail /> },
      { path: '/billing',            element: <Billing /> },
    ],
  },
]);

export default router;
