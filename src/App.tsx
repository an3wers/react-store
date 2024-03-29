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
  [х] Перенести searchValue в redux
  [x] Сделать сортировку
  [] Тестирование
  [x] Проверить работу добавление товара в корзину на странице товара
  [] Декомпозировать Home
  [] Избавиться от лишних useMemo()
  [x] Типизировать createAsyncThunk()
  [x] Поправить верстку категорий и сортировки с поиском
  [x] Заменить иконки
  [x] Фикс focus-стилей инпутов и кнопок
  [x] Сохранение состояния корзины в LS
  [] Заполнить страницу About
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
