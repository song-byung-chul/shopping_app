// App.tsx  => 소스코드를 HomePage.tsx 로 복사 옮김
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  ProductPage,
  ProductCreatePage,
  PurchasePage,
} from "./pages";
import { Layout } from "./components/shared";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create" element={<ProductCreatePage />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="purchase/:productId" element={<PurchasePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
