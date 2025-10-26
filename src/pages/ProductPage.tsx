// ProductPage.tsx

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
import { useCookies } from "react-cookie";
//import { Delete, Edit } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useCart } from "../hooks";

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
  //const [cookies, setCookies] = useCookies(["cart"]);
  //const cartItems = cookies.cart as ProductType[];
  const { addCarts } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  //const products = useProductContext();
  //const [products] = useProductContext();
  /*
  const foundProduct = products.find(
    (product) => product.id === parseInt(productId!, 10)
  );*/

  /*
  const handleAddCart = () => {
    const nextValue = cartItems ? [...cartItems, product] : [product];

    setCookies("cart", nextValue, { path: "/" });
    setIsModalOpen(true);
  };*/

  const handleAddCart = () => {
    if (product) {
      addCarts(product.id);
      setIsModalOpen(true);
    }
  };

  const handlePushPurchasePage = () => {
    if (productId) {
      navigate(`/purchase/${productId}`);
    }
  };

  const handlePushCartPage = () => {
    navigate("/cart");
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
            <Button
              variant="text"
              onClick={() => setIsDeleteModal(true)}
              color="error"
            >
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
          <Button variant="outlined" onClick={handleAddCart}>
            장바구니 담기
          </Button>
          <Button variant="contained" onClick={handlePushPurchasePage}>
            구매하기
          </Button>
        </ButtonGroup>
      </Container>

      <Dialog
        open={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          상품을 정말로 삭제하시겠습니까?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>이 작업은 되돌릴 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModal(false)}>아니요</Button>
          <Button autoFocus>네</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          장바구니에 성공적으로 추가했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            장바구니 페이지로 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>아니요</Button>
          <Button onClick={handlePushCartPage} autoFocus>
            네
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductPage;
