// App.tsx  => 소스코드를 HomePage.tsx 로 복사 옮김
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

function App() {
  return (
    //<h1>쇼핑몰 앱 만들어보기</h1>
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;
