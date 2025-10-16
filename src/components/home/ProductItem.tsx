// ProductItem.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";

interface ProductItemProps {
  product: ProductType;
  //onDelete: (id: number) => void;
  onDelete: (id: string) => void;
  //onUpdate: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
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
};

export default ProductItem;
