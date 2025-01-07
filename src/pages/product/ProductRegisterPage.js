import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/Header';
import { register } from '../../api/productApi';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlertModal from '../../components/common/AlertModal';
import { getProductCategoryList } from '../../api/categoryApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    categoryId: '',
    stockNumber: '',
  });
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getProductCategoryList();
        setCategories(categoryList);
      } catch (error) {
        console.error('카테고리 목록을 불러오는데 실패했습니다:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Create preview URLs
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const checkValidation = () => {
    if (files.length === 0) {
      setAlertMessage('최소 1개 이상의 상품 이미지를 등록해주세요.');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkValidation()) {
      return;
    }

    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    files.forEach((file) => {
      productData.append('files', file);
    });

    try {
      await register(productData);
      setAlertMessage('상품이 성공적으로 등록되었습니다!');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage('상품 등록에 실패했습니다.');
      setShowAlert(true);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (alertMessage.includes('성공')) {
      navigate('/product');
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF0FB', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
              sx={{
                mr: 2,
                color: '#2A0934',
                '&:hover': { backgroundColor: 'rgba(42, 9, 52, 0.04)' },
              }}
            >
              뒤로가기
            </Button>
            <Typography
              variant="h4"
              sx={{ color: '#2A0934', fontWeight: 'bold' }}
            >
              상품 등록
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="상품명"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="상품 설명"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="가격"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">원</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="할인 가격"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">원</InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">카테고리</InputLabel>
                  <Select
                    labelId="category-label"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    label="카테고리"
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="재고 수량"
                  name="stockNumber"
                  type="number"
                  value={formData.stockNumber}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={15}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    color: '#FFB7F2',
                    borderColor: '#FFB7F2',
                    '&:hover': {
                      borderColor: '#ff9ee8',
                      backgroundColor: 'rgba(255, 183, 242, 0.1)',
                    },
                  }}
                >
                  이미지 업로드 *
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
              </Grid>

              {previewUrls.length > 0 && (
                <Grid item xs={12}>
                  <Box
                    sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}
                  >
                    {previewUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: '#FFB7F2',
                    '&:hover': { backgroundColor: '#ff9ee8' },
                    height: 48,
                  }}
                >
                  상품 등록하기
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <AlertModal
        open={showAlert}
        onClose={handleAlertClose}
        title="알림"
        message={alertMessage}
        isSuccess={alertMessage.includes('성공')}
        onConfirm={handleAlertClose}
      />
    </div>
  );
};

export default ProductRegisterPage;
