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

/*
  TODO:
  [] Перенести searchValue в redux
  [] Сделать сортировку
  [] Внедрить тестирование
  [] Проверить работу добавление товара в корзину на странице товара
  [] Декомпозиция кода, отделить бизнес-логику от UI
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
