// ProductPage.tsx

import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import { useProductContext } from "../contexts/ProductContext";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ProductType } from "../types";
import { API_SERVER_DOMAIN } from "../constants";

/*
type ProductType = {
  id: string;
  name: string;
  explanation: string;
  price: number;
};
*/

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

  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  //const products = useProductContext();
  //const [products] = useProductContext();
  /*
  const foundProduct = products.find(
    (product) => product.id === parseInt(productId!, 10)
  );*/

  const handlePushPurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  //if (!foundProduct) {
  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  return (
    <>
      <Container maxWidth="sm">
        {/*
        <div>
      <h1>상품 상세 페이지</h1>
      <h1>{product?.name}</h1>
      <p>{product?.explanation}</p>
      <span>{product?.price}</span>
    </div>
         */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          {product?.thumbnail && (
            <img
              src={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
              alt={product?.name}
              style={{ width: "100%", maxWidth: 400 }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {product?.name}
          </Typography>
          <ButtonGroup orientation="horizontal">
            <Button variant="text" onClick={() => null} color="error">
              <Delete />
            </Button>
            <Button variant="text" onClick={() => null} color="info">
              <Edit />
            </Button>
          </ButtonGroup>
        </Box>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
          {product?.price.toLocaleString("KO-kr")}원
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 4 }}>
          {product?.explanation}
        </Typography>

        <ButtonGroup orientation="vertical" fullWidth>
          <Button variant="outlined">장바구니 담기</Button>
          <Button variant="contained" onClick={handlePushPurchasePage}>
            구매하기
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default ProductPage;
