// App.tsx

import { useRef, useState } from "react";

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button
        type="button"
        onClick={() => {
          console.log("삭제하기 : ", id);
          //setProducts(products.filter((product) => product.id !== id));
        }}
      >
        삭제하기
      </button>

      <button
        type="button"
        onClick={() => {
          console.log("수정하기 : ", id);
          //setProducts(products.filter((product) => product.id !== id));
        }}
      >
        수정하기
      </button>
    </div>
  );
};

function App() {
  /*
  const products: ProductType[] = [
    {
      id: 0,
      name: "Iphone 13 Max",
      explanation: "디스플레이는...",
      price: 123000,
    },
  ];*/

  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "Iphone 13 Max",
      explanation: "디스플레이는...",
      price: 123000,
    },
  ]);
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  //console.log(products);

  const fakeId = useRef(0);
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fakeId.current += 1;
    setProducts([...products, { ...newProduct, id: fakeId.current }]);
  };

  return (
    <>
      <h1>쇼핑몰 앱 만들어보기</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreate({ name, explanation, price });
          //console.log("=== 제출 ===", name, price, explanation);
          //setProducts([...products, { id: fakeId, name, explanation, price }]);
        }}
      >
        <input
          type="text"
          placeholder="상품 이름"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="상품 설명"
          onChange={(event) => setExplanation(event.target.value)}
        />
        <input
          type="number"
          placeholder="상품 가격"
          onChange={(event) => setPrice(parseInt(event.target.value, 10))}
        />
        <input type="submit" value="상품 만들기" />
      </form>

      {products.map(({ id, name, price, explanation }) => (
        <div key={id}>
          <div>{id}</div>
          <div>{name}</div>
          <div>{price}</div>
          <div>{explanation}</div>

          <button
            type="button"
            onClick={() => {
              console.log("삭제 : ", id);
              setProducts(products.filter((product) => product.id !== id));
            }}
          >
            삭제하기
          </button>

          <button
            type="button"
            onClick={() => {
              console.log("수정 : ", id);
              setProducts(products.filter((product) => product.id !== id));
            }}
          >
            수정하기
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
