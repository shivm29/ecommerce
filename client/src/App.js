import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import './App.css'
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import User from './pages/Admin/User';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import UserDashboard from './pages/User/UserDashboard';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import Product from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import CategoriesPage from './pages/CategoriesPage';
import CategoryProduct from './pages/CategoryProduct';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* private route */}
        <Route path='/search' element={<SearchPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
        </Route>

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          {/* <Route path='admin/create-category' element={<CreateCategory />} /> */}
          <Route path='admin/users' element={<User />} />
          <Route path='admin/products' element={<Product />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} ></Route>

        </Route>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
