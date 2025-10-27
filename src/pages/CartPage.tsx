// c:/Dev/shopping_app/client/src/pages/CartPage.tsx

import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../components/cart";
import { useCart } from "../hooks";

const CartPage = () => {
  const navigate = useNavigate();
  //const [cookies] = useCookies(["cart"]);
  //const cartItems = (cookies.cart as ProductType[]) || null;
  const { carts } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 장바구니 총금액
  //const totalPrice = 0;
  const totalPrice = carts.reduce(
    (prev, cur) => prev + cur.price * cur.count,
    0
  );

  const handlePurchaseProduct = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handlePushHomePage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  /*
  if (!cartItems) {
    return <h3>장바구니에 담은 아이템이 없습니다.</h3>;
  }*/

  return (
    /*
    <ul>
      {cartItems.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <span>{item.price}</span>
          {item?.thumbnail && (
            <img src={item.thumbnail} alt={item.explanation} />
          )}
          <p>{item.explanation}</p>
        </li>
      ))}
    </ul>
    */
    <>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              장바구니
            </Typography>

            {!carts || carts.length === 0 ? (
              <Typography variant="body1">
                장바구니에 담긴 상품이 없습니다.
              </Typography>
            ) : (
              //<>CartIItem 컴포넌트를 구현해봅시다.</>
              carts?.map((cart) => <CartItem key={cart.id} cart={cart} />)
            )}
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              결제 정보
            </Typography>
            <Box
              sx={{
                position: "sticky",
                top: 20,
              }}
            >
              <Card sx={{ padding: 2 }}>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  총 상품 가격: {totalPrice}원
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  배송비: 평생 무료
                </Typography>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                  총 결제 금액: {totalPrice}원
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlePurchaseProduct}
                >
                  결제하기
                </Button>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={handlePushHomePage}
        aria-labelledby="resopnsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          성공적으로 구매했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>메인 페이지로 이동합니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushHomePage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
