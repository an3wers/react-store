import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutPage from './pages/About';
import ProductsPage from './pages/Products';

/*
API:
'https://fakestoreapi.com/products'
*/

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
