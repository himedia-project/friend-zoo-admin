import React, { useEffect, useState } from 'react';
import Header from '../../components/layouts/Header';
import { getList } from '../../api/productApi';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    const params = {
      page: 1,
      size: 10,
      sort: 'id',
      name: searchTerm,
      categoryId: '',
    };

    try {
      const response = await getList(params);
      setProducts(response.dtoList || []);
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: '#FFF0FB', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="h4"
                sx={{ color: '#2A0934', fontWeight: 'bold' }}
              >
                상품 관리
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#FFB7F2',
                  '&:hover': { backgroundColor: '#ff9ee8' },
                }}
              >
                상품 등록
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Card sx={{ mb: 4, backgroundColor: 'white', borderRadius: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="상품명 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={fetchProducts}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                  size="small"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fff5fc' }}>
                <TableCell>ID</TableCell>
                <TableCell>카테고리</TableCell>
                <TableCell>상품명</TableCell>
                <TableCell>가격</TableCell>
                <TableCell>할인가격</TableCell>
                <TableCell>재고</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>등록일</TableCell>
                <TableCell>수정일</TableCell>
                {/* <TableCell align="center">관리</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price?.toLocaleString()}원</TableCell>
                  <TableCell>
                    {product.discountPrice?.toLocaleString()}원
                  </TableCell>
                  <TableCell>{product.stockNumber}</TableCell>
                  <TableCell>{product.uploadFileNames[0]}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>{product.modifiedAt}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" sx={{ color: '#FFB7F2' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#ff8484' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default ProductPage;
