// App.tsx  => 소스코드를 HomePage.tsx 로 복사 옮김
import { Route, Routes } from "react-router-dom";
import { HomePage, ProductPage, ProductCreatePage } from "./pages";
import { Layout } from "./components/shared";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create" element={<ProductCreatePage />} />
        <Route path="/:productId" element={<ProductPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
