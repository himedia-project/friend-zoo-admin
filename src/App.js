import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import MemberPage from './pages/MemberPage';
import OrderPage from './pages/OrderPage';
import ContentPage from './pages/ContentPage';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomePage />} />
        {/* 로그인 */}
        <Route path="/login" element={<LoginPage />} />
        {/* 상품 */}
        <Route path="/product" element={<ProductPage />} />
        {/* 콘텐츠 */}
        <Route path="/content" element={<ContentPage />} />
        {/* 회원 */}
        <Route path="/member" element={<MemberPage />} />
        {/* 주문 */}
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
