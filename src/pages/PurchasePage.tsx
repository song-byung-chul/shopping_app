// c:/Dev/shopping_app/client/src/pages/PurchasePage.tsx

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ProductType } from "../types";
import { API_SERVER_DOMAIN } from "../constants";
import { PurchaseForm } from "../components/purchase";
import { getProduct } from "../utils/api";

type ParamsType = {
  productId: string;
};

const PurchasePage = () => {
  const { productId } = useParams<ParamsType>();
  const [product, setProduct] = useState<ProductType | null>(null);

  /*
  useEffect(() => {
    fetch(`/product/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.product));
  }, [productId]);
  */
  // API(api.ts)를 한곳에 묶어서 관리하기(Axios를 활용한 버전)
  useEffect(() => {
    if (productId) {
      getProduct(productId).then((response) =>
        setProduct(response.data.product)
      );
    }
  }, [productId]);

  if (!product) {
    return <h1>찾으시는 상품이 없습니다.</h1>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        구매하기
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ display: "flex", marginBottom: 2 }}>
            {product?.thumbnail && (
              <CardMedia
                sx={{ width: 100, height: 100, marginRight: 2 }}
                image={`${API_SERVER_DOMAIN}/${product?.thumbnail}`}
                title="Product"
              />
            )}
            <CardContent sx={{ padding: 0 }}>
              <Typography gutterBottom variant="h6">
                {product?.name}
              </Typography>
            </CardContent>
          </Card>
          <PurchaseForm />
          {/*
          <form>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField label="구매자 이름" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="구매자 이메일" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="배송 주소" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>결제정보</InputLabel>
                  <Select label="결제 정보">
                    <MenuItem value={10}>신용카드 / 체크카드</MenuItem>
                    <MenuItem value={20}>무통장입금</MenuItem>
                    <MenuItem value={30}>휴대폰 결제</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  구매완료
                </Button>
              </Grid>
            </Grid>
          </form>
          */}
        </Grid>
      </Grid>
    </Container>
  );
};
export default PurchasePage;
