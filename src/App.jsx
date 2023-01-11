import Header from './containers/header';
import ProductComponent from './containers/productComponent';
import ProductDetail from './containers/productDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
         <Header />
         <Routes>
          <Route path='/' element={<ProductComponent />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
