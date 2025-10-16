// src/components/create/ProductCreateForm.tsx

import { useState } from "react";
import { ProductType } from "../../types";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("log data : ", data);
        //setProducts((prev) => [...prev, data.product]);
      });
  };

  return (
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
  );
};

//export {};
export default ProductCreateForm;
