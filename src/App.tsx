// App.tsx  => 소스코드를 HomePage.tsx 로 복사 옮김
import { Route, Routes } from "react-router-dom";
import { HomePage, ProductPage } from "./pages";
import { ProductCreateForm } from "./components/create";
import Button from "@mui/material/Button";

function App() {
  return (
    <>
      <h1> 테스트</h1>
      <Button>안녕하세요</Button>
    </>

    /*
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="create" element={<ProductCreateForm />} />
      <Route path="/:productId" element={<ProductPage />} />
    </Routes>
    */
  );
}

export default App;
