// ProductPage.tsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";

function ProductPage() {
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
  //const products = useProductContext();
  const [products] = useProductContext();
  const foundProduct = products.find(
    (product) => product.id === parseInt(productId!, 10)
  );

  if (!foundProduct) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <h1>{foundProduct?.name}</h1>
      <p>{foundProduct?.explanation}</p>
      <span>{foundProduct?.price}</span>
    </div>
  );
}

export default ProductPage;
