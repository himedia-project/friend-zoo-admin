import React, { useEffect, useState } from 'react';
import Header from '../../components/layouts/Header';
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
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from '../../components/category/CategoryModal';
import {
  getProductCategoryList,
  getContentCategoryList,
  registerProductCategory,
  registerContentCategory,
  removeProductCategory,
  removeContentCategory,
} from '../../api/categoryApi';
import { API_SERVER_HOST } from '../../config/apiConfig';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertModal from '../../components/common/AlertModal';

const CategoryPage = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [contentCategories, setContentCategories] = useState([]);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryType, setCategoryType] = useState('');

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

  const handleProductSubmit = async (formData) => {
    try {
      await registerProductCategory(formData);
      fetchCategories(); // 목록 새로고침
    } catch (error) {
      console.error('상품 카테고리 등록 실패:', error);
    }
  };

  const handleContentSubmit = async (formData) => {
    try {
      await registerContentCategory(formData);
      fetchCategories(); // 목록 새로고침
    } catch (error) {
      console.error('콘텐츠 카테고리 등록 실패:', error);
    }
  };

  const handleDeleteClick = (category, type) => {
    setSelectedCategory(category);
    setCategoryType(type);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (categoryType === 'product') {
        await removeProductCategory(selectedCategory.categoryId);
      } else {
        await removeContentCategory(selectedCategory.categoryId);
      }
      setDeleteModalOpen(false);
      fetchCategories(); // 목록 새로고침
    } catch (error) {
      console.error('카테고리 삭제 실패:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF0FB', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* 상품 카테고리 섹션 */}
        <Box sx={{ mb: 4 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{ color: '#2A0934', fontWeight: 'bold' }}
            >
              상품 카테고리
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenProductModal(true)}
              sx={{
                bgcolor: '#FFB7F2',
                color: 'white',
                '&:hover': { bgcolor: '#ff99e6' },
              }}
            >
              카테고리 추가
            </Button>
          </Box>
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
                      <IconButton
                        size="small"
                        sx={{ color: '#ff8484' }}
                        onClick={() => handleDeleteClick(category, 'product')}
                      >
                        <DeleteIcon />
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography
              variant="h4"
              sx={{ color: '#2A0934', fontWeight: 'bold' }}
            >
              콘텐츠 카테고리
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenContentModal(true)}
              sx={{
                bgcolor: '#FFB7F2',
                color: 'white',
                '&:hover': { bgcolor: '#ff99e6' },
              }}
            >
              카테고리 추가
            </Button>
          </Box>
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
                      <IconButton
                        size="small"
                        sx={{ color: '#ff8484' }}
                        onClick={() => handleDeleteClick(category, 'content')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <CategoryModal
          open={openProductModal}
          handleClose={() => setOpenProductModal(false)}
          title="상품 카테고리 등록"
          onSubmit={handleProductSubmit}
        />

        <CategoryModal
          open={openContentModal}
          handleClose={() => setOpenContentModal(false)}
          title="콘텐츠 카테고리 등록"
          onSubmit={handleContentSubmit}
        />

        <AlertModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="카테고리 삭제"
          message="정말 삭제하시겠습니까?"
          isSuccess={false}
          onConfirm={handleDeleteConfirm}
        />
      </Container>
    </div>
  );
};

export default CategoryPage;
