// c:/Dev/shopping_app/client/src/components/home/ProductItem.tsx
// ProductItem.tsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../types";
import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_SERVER_DOMAIN } from "../../constants";

interface ProductItemProps {
  product: ProductType;
  //onDelete: (id: string) => void;
  //onUpdate: (id: number) => void;
  //onUpdate: (product: ProductType) => void;
}

//const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
const ProductItem = ({ product }: ProductItemProps) => {
  /*
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);
  */

  const navigate = useNavigate();
  const handlePushProductPage = () => {
    navigate(`/product/${product.id}`);
  };
  const handlePushPurchasePage = () => {
    navigate(`/purchase/${product.id}`);
  };

  return (
    /*
      <div>
        <div>{product.thumbnail && <img src={product.thumbnail} />}</div>
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
              onChange={(event) =>
                setEditPrice(parseInt(event.target.value, 10))
              }
            />
            <input type="submit" value="상품수정하기" />
          </form>
        )}
      </div>
      */
    //<Grid item xs={12} sm={6} md={4}> //<<== 안됨...
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{ maxWidth: 345, padding: 3, height: 300 }}
        onClick={handlePushProductPage}
      >
        {product.thumbnail && (
          <CardMedia
            sx={{ height: 140 }}
            image={`${API_SERVER_DOMAIN}/${product.thumbnail}`}
            title={product.name}
          />
        )}
        <CardContent sx={{ padding: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 30,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.explanation}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
          <Button
            size="small"
            onClick={handlePushPurchasePage}
            variant="contained"
          >
            구매하기
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductItem;
