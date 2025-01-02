import React, { useEffect, useState } from 'react';
import Header from '../components/layouts/Header';
import {
  Box,
  Container,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  getProductCategoryList,
  getContentCategoryList,
} from '../api/categoryApi';
import { API_SERVER_HOST } from '../config/apiConfig';

const CategoryPage = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [contentCategories, setContentCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const productData = await getProductCategoryList();
      const contentData = await getContentCategoryList();
      setProductCategories(productData);
      setContentCategories(contentData);
    } catch (error) {
      console.error('카테고리 목록 로딩 실패:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF0FB', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* 상품 카테고리 섹션 */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: '#2A0934', fontWeight: 'bold', mb: 3 }}
          >
            상품 카테고리
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fff5fc' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    카테고리명
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    로고
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
                {productCategories.map((category) => (
                  <TableRow key={category.categoryId} hover>
                    <TableCell>{category.categoryId}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.logo && (
                        <Box
                          component="img"
                          src={`${API_SERVER_HOST}/api/admin/product/view/${category.logo}`}
                          alt={category.name}
                          sx={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </TableCell>
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
        </Box>

        {/* 콘텐츠 카테고리 섹션 */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ color: '#2A0934', fontWeight: 'bold', mb: 3 }}
          >
            콘텐츠 카테고리
          </Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fff5fc' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    카테고리명
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                    로고
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
                {contentCategories.map((category) => (
                  <TableRow key={category.categoryId} hover>
                    <TableCell>{category.categoryId}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.logo && (
                        <Box
                          component="img"
                          src={`${API_SERVER_HOST}/api/admin/content/view/${category.logo}`}
                          alt={category.name}
                          sx={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      )}
                    </TableCell>
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
        </Box>
      </Container>
    </div>
  );
};

export default CategoryPage;
