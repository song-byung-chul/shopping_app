// ProductList.tsx

import { useEffect, useState } from "react";
//import { ProductType } from "../../types";
import { ProductItem } from ".";
import { CircularProgress, Grid } from "@mui/material";
import { NotFoundPage } from "../../pages";
import { getProducts } from "../../utils/api";
import useAsync from "../../hooks/useAsync";

const ProductList = () => {
  const { loading, data } = useAsync(getProducts);
  if (loading) return <CircularProgress />;
  if (!data) return <NotFoundPage />;

  /*
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);


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

  // API서버에서 상품목록 가져오기
  /*
  useEffect(() => {
    setIsLoading(true);
    //fetch("http://localhost:3090/product") <== clent/package.json에 proxy설정
    fetch("/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
      })
      .finally(() => setIsLoading(false));
  }, []);
  */

  // API(api.ts)를 한곳에 묶어서 관리하기(Axios를 활용한 버전)
  /* useAsync.ts 로 인해 블럭 처리
  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then((response) => setProducts(response.data.products))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }
    */

  return (
    <Grid container spacing={3}>
      {/*
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          //onDelete={handleDelete}
          //onUpdate={handleUpdate}
        />
      ))}
      */}

      {data.data.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;
