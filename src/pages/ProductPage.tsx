// ProductPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

type ProductType = {
  id: string;
  name: string;
  explanation: string;
  price: number;
};

const ProductPage = () => {
  /*
  const params = useParams();
  useEffect(() => {
    console.log(params);
  });*/

  /*
  const context = useProductContext();

  useEffect(() => {
    console.log(context);
  }, [context]);
  */

  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  //const products = useProductContext();
  //const [products] = useProductContext();
  /*
  const foundProduct = products.find(
    (product) => product.id === parseInt(productId!, 10)
  );*/

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  //if (!foundProduct) {
  if (!product) {
    return <h1>존재하지 않는 상품입니다.</h1>;
  }

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <h1>{product?.name}</h1>
      <p>{product?.explanation}</p>
      <span>{product?.price}</span>
    </div>
  );
};

export default ProductPage;
