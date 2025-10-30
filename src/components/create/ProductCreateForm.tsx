// src/components/create/ProductCreateForm.tsx

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductType } from "../../types";
import { ThumbnailUploader } from ".";
import { useNavigate } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import { createProduct, modifyThumbnail } from "../../utils/api";

const ProductCreateForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createdProductId, setCreatedProductId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleExplanationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setExplanation(event.target.value);
  };

  const { request: createProductRequest } = useAsync(createProduct, {
    initialRequest: false,
  });

  const { request: thumbnailUploadRequest } = useAsync(modifyThumbnail, {
    initialRequest: false,
  });

  /*
  const uploadThumbnailRequest = (productId: string, thumbnail: File) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    return fetch(`/product/thumbnail/${productId}`, {
      method: "PATCH",
      body: formData,
    });
  };

  const createProductRequest = (newProduct: Omit<ProductType, "id">) => {
    return fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };
  */

  /*
  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await createProductRequest({
      name,
      explanation,
      price,
    });
    const data = await response.json();

    if (thumbnail) {
      await uploadThumbnailRequest(data.product.id, thumbnail);
    }

    setCreatedProductId(data.product.id);
    setIsModalOpen(true);
  };
  */

  const handlePushProductPage = () => {
    setIsModalOpen(false);
    navigate(`/product/${createdProductId}`);
  };

  /*
  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Omit<ProductType, "id"> = {
      name,
      explanation,
      price,
    };

    fetch("/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("log data : ", data);
        //setProducts((prev) => [...prev, data.product]);
      });
  }; 
  */

  const handleCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const createProductResponse = await createProductRequest({
      name,
      explanation,
      price,
    });

    if (thumbnail) {
      await thumbnailUploadRequest(
        createProductResponse.data.product.id,
        thumbnail
      );
    }

    setCreatedProductId(createProductResponse.data.product.id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          상품 생성
        </Typography>
        {/*
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

        <form onSubmit={handleCreate}>
        */}
        <form onSubmit={handleCreateProduct}>
          <TextField
            label="상품 이름"
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin="normal"
          />
          <TextField
            label="가격"
            type="number"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            margin="normal"
          />
          <TextField
            label="상품 설명"
            fullWidth
            multiline
            rows={4}
            value={explanation}
            onChange={handleExplanationChange}
            margin="normal"
          />
          <ThumbnailUploader
            value={thumbnail}
            onChange={(file) => {
              //console.log("file log : ", file);
              setThumbnail(file);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 6 }}
          >
            생성
          </Button>
        </form>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="resopnsive-dialog-title"
      >
        <DialogTitle id="resopnsive-dialog-title">
          상품을 성공적으로 추가했습니다.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            확인을 누르면 상품상세 페이지로 이동합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePushProductPage} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

//export {};
export default ProductCreateForm;
