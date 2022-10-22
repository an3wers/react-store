import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutPage from './pages/About';
import HomePage from './pages/Home';
import Cart from './pages/Cart';
import ProductPage from './pages/Product';

/*
API:
'https://fakestoreapi.com/products'
*/

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path=":productId" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
