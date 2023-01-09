import Header from './containers/header';
import ProductComponent from './containers/productComponent';
import ProductDetali from './containers/productDetali';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
         <Header />
         <Routes>
          <Route path='/' element={<ProductComponent />} />
          <Route path='/product/:productId' element={<ProductDetali />} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
