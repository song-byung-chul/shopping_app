// HomePage.tsx App.tsx 소스코드를 HomePage.tsx 로 복사 옮김

//import { useEffect, useRef, useState } from "react";
//import { Link } from "react-router-dom";
//import { useProductContext } from "../contexts/ProductContext";
import { ProductList } from "../components/home";

/*
interface ProductType {
  //id: number;
  id: string;
  name: string;
  explanation: string;
  price: number;
}*/
// src/components/home/ProductItem.tsx 로 이동
/*
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
*/

function HomePage() {
  /*
  const products: ProductType[] = [
    {
      id: 0,
      name: "Iphone 13 Max",
      explanation: "디스플레이는...",
      price: 123000,
    },
  ];*/

  /*const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "Iphone 13 Max",
      explanation: "디스플레이는...",
      price: 123000,
    },
  ]);
  */

  /*
  //const [products, setProducts] = useProductContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState("");
  const [price, setPrice] = useState(0);
*/
  //console.log(products);

  /*
  const fakeId = useRef(0);
  const handleCreate = (newProduct: Omit<ProductType, "id">) => {
    fakeId.current += 1;
    setProducts([...products, { ...newProduct, id: fakeId.current }]);
  };*/
  /*
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
        setProducts((prev) => [...prev, data.product]);
      });
  };
*/
  /*
  const handleDelete = (id: number) =>
    setProducts(products.filter((product) => product.id !== id));
  */
  /*
  const handleDelete = (id: string) => {
    fetch(`/product/${id}`, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };
*/
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

  /*
  const handleUpdate = (updateProduct: ProductType) => {
    fetch(`/product/${updateProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then((response) => {
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.id === updateProduct.id ? updateProduct : product
          )
        );
      }
    });
  };
  */

  /*
  // API서버에서 상품목록 가져오기
  useEffect(() => {
    //fetch("http://localhost:3090/product") <== clent/package.json에 proxy설정
    fetch("/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
      });
  }, []);
*/
  return (
    <>
      <h1>쇼핑몰 앱 만들어보기 메인페이지</h1>
      <ProductList />
    </>

    /*
    <>
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

      /*
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
    */
    /*
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
    */
  );
}

export default HomePage;
