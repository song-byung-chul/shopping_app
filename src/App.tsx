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
  onDelete: (id: number) => void;
  //onUpdate: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

function ProductItem({ product, onDelete, onUpdate }: ProductItemProps) {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

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
          onDelete(id);
        }}
      >
        삭제하기
      </button>

      <button
        type="button"
        onClick={() => {
          console.log("수정하기 : ", id);
          //setProducts(products.filter((product) => product.id !== id));
          setIsEditMode((prev) => !prev);
        }}
      >
        수정하기
      </button>

      {isEditMode && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate({
              id,
              name: editName,
              price: editPrice,
              explanation: editExplanation,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplanation}
            onChange={(event) => setEditExplanation(event.target.value)}
          />
          <input
            type="number"
            placeholder="상품 가격"
            value={editPrice}
            onChange={(event) => setEditPrice(parseInt(event.target.value, 10))}
          />
          <input type="submit" value="상품수정하기" />
        </form>
      )}
    </div>
  );
}

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

  const handleDelete = (id: number) =>
    setProducts(products.filter((product) => product.id !== id));
  /*
  const handleUpdate = (id: number) => {
    // 무엇인가를 업데이트하는 로직이다.
    const updateProduct = {
      id,
      name: "수정된 상품",
      explanation: "수정된 상품",
      price: 0,
    };
    setProducts(
      products.map((product) => (product.id === id ? updateProduct : product))
    );
  };
  */

  const handleUpdate = (updateProduct: {
    id: number;
    name: string;
    explanation: string;
    price: number;
  }) => {
    setProducts(
      products.map((product) =>
        product.id === updateProduct.id ? updateProduct : product
      )
    );
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

      {/*
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
    */}

      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}

export default App;
