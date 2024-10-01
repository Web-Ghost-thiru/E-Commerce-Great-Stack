import { Routes, Route } from 'react-router-dom';
import { WrapNavbar } from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import { useContext} from 'react';
import WishList from './Pages/WishList';
import OrderSuccessful from './Components/OrderSuccessful/OrderSuccessful';
import OrderPage from './Pages/OrderPage';
import { WrapCheckAuth } from './Components/CheckAuth/CheckAuth';
import { ShopContext } from './Context/ShopContext';

function App() {
  const {logined, setIsLogined} = useContext(ShopContext);

  return (
    <div>
  
      <WrapNavbar logined={logined} setIsLogined={setIsLogined} />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='product' element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/wishlist' element={
          <WrapCheckAuth>
          <WishList />
          </WrapCheckAuth>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orderplaced' element={<OrderSuccessful />} />
        <Route path='/orders' element={
          <WrapCheckAuth> 
            <OrderPage />
          </WrapCheckAuth>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
