import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { getList } from '../api/orderApi';
import PageComponent from '../components/common/PageComponent';
import Header from '../components/layouts/Header';
import { API_SERVER_HOST } from '../config/apiConfig';

const initState = {
  dtoList: [], // 주문 목록
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  prevPage: 0,
  nextPage: 0,
  next: false,
  totalCount: 0,
  current: 0,
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [year, setYear] = useState('');

  const fetchOrders = async () => {
    const params = {
      page: page,
      size: 10,
      sort: 'desc',
      name: searchTerm,
      year: year,
    };

    try {
      const response = await getList(params);
      console.log('response', response);
      setOrders(response.dtoList || []);
      setTotalPages(response.totalPage || 0);
    } catch (error) {
      console.error('주문 목록 로딩 실패:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, year]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                주문 관리
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#FFB7F2',
                  '&:hover': { backgroundColor: '#ff9ee8' },
                  mr: 1,
                }}
              >
                주문 등록
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
                  placeholder="주문상품명 및 주문코드 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={fetchOrders}>
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
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  주문코드
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  주문자
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  주문날짜
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  주문상태
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  주문총금액
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 'bold', color: '#2A0934' }}
                >
                  관리
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId} hover>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.orderCode}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    {order.orderStatus === 'ORDER' ? '주문중' : '취소'}
                  </TableCell>
                  <TableCell>{order.totalPrice.toLocaleString()}원</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" sx={{ color: '#FFB7F2' }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <PageComponent
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
};

export default OrderPage;
