import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage/Login';
import Orders from './pages/ordersPage/Orders';
import Products from './pages/productsPage/Products';
import Users from './pages/usersPage/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </Router>
  );
}

export default App;
