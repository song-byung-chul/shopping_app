// c:/Dev/shopping_app/client/src/components/purchase/PurchaseForm.tsx
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseForm = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchaseProduct = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const handlePushHomePage = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handlePurchaseProduct}>
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

      <Dialog
        open={isModalOpen}
        onClose={handlePushHomePage}
        aria-labelledby="resopnsive-dialog-title"
      >
        <DialogTitle is=" responsive-dialog-title">
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
export default PurchaseForm;
