import React, { useEffect, useState } from 'react';
import Header from '../../components/layouts/Header';
import { getList, remove } from '../../api/productApi';
import { API_SERVER_HOST, FRONT_USER_HOST } from '../../config/apiConfig';
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
import PageComponent from '../../components/common/PageComponent';
import AlertModal from '../../components/common/AlertModal';
import { registerProductExcel, downloadProductExcel } from '../../api/excelApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadModal from '../../components/common/UploadModal';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import ProgressModal from '../../components/common/ProgressModal';

const initState = {
  dtoList: [], // product 목록
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  prevPage: 0,
  nextPage: 0,
  next: false,
  totalCount: 0,
  current: 0,
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const params = {
      page: page,
      size: 10,
      sort: 'desc',
      name: searchTerm,
      categoryId: null,
    };

    try {
      const response = await getList(params);
      setProducts(response.dtoList || []);
      setTotalPages(response.totalPage || 0);
    } catch (error) {
      console.error('상품 목록 로딩 실패:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (product) => {
    console.log('handleDeleteClick product', product);
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await remove(selectedProduct.id);
      setDeleteModalOpen(false);
      fetchProducts(); // 목록 새로고침
    } catch (error) {
      console.error('상품 삭제 실패:', error);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setShowProgressModal(true);
      setUploadProgress(0);

      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      // 파일 업로드 요청 with progress tracking
      await registerProductExcel(formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        },
      });

      // 업로드 완료 후 처리
      setShowProgressModal(false);
      setShowUploadModal(false);
      setUploadModalOpen(true); // 성공 알림 모달
      await fetchProducts(); // 목록 새로고침
    } catch (error) {
      console.error('엑셀 업로드 실패:', error);
      setShowProgressModal(false);
      setAlertMessage('엑셀 업로드 중 오류가 발생했습니다.');
      setShowAlert(true);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDownload = async () => {
    console.log('handleDownload selectedProducts:', selectedProducts);
    if (selectedProducts.length === 0) {
      setAlertMessage('상품 체크를 먼저 해주셔야 합니다!');
      setShowAlert(true);
      return;
    }

    try {
      const response = await downloadProductExcel(selectedProducts);
      // 소문자로 된 헤더 키를 사용

      // 응답 헤더 확인을 위한 로깅
      console.log('Download response headers:', response.headers);

      const contentDisposition = response.headers['content-disposition'];
      let filename = 'products.xlsx'; // 기본 파일명
      console.log('Content-Disposition:', contentDisposition); // 디버깅용

      if (contentDisposition) {
        const matches = contentDisposition.match(/filename="(.+)"/);
        if (matches && matches[1]) {
          filename = decodeURIComponent(matches[1]);
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Excel download failed:', error);
      setAlertMessage('다운로드 중 오류가 발생했습니다.');
      setShowAlert(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF0FB', minHeight: '100vh' }}>
      <Header />
      <Container
        maxWidth={false}
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 3, md: 4, lg: 6 }, // 반응형 패딩
          maxWidth: { xl: '1400px' }, // 큰 화면에서 최대 너비
        }}
      >
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
                  mr: 1,
                }}
                onClick={() => navigate('/product/register')}
              >
                상품 등록
              </Button>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: '#217346',
                  '&:hover': { backgroundColor: '#1a5c38' },
                  mr: 1,
                }}
                onClick={() => setShowUploadModal(true)}
              >
                엑셀 업로드
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{
                  backgroundColor: '#217346',
                  '&:hover': { backgroundColor: '#1a5c38' },
                  mr: 1,
                }}
                onClick={handleDownload}
              >
                엑셀 다운로드
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
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  <Checkbox
                    checked={selectedProducts.length === products.length}
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  카테고리
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  상품명
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  가격
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  할인가격
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  재고
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  이미지
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  등록일
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2A0934' }}>
                  수정일
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
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.categoryName}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#FFB7F2',
                      },
                    }}
                    // onClick={() =>
                    //   window.open(
                    //     `${FRONT_USER_HOST}/product/${product.id}`,
                    //     '_blank',
                    //   )
                    // }
                  >
                    {product.name}
                  </TableCell>
                  <TableCell>{product.price?.toLocaleString()}원</TableCell>
                  <TableCell>
                    {product.discountPrice?.toLocaleString()}원
                  </TableCell>
                  <TableCell>{product.stockNumber}</TableCell>
                  <TableCell>
                    {product.uploadFileNames && product.uploadFileNames[0] && (
                      <Box
                        component="img"
                        src={`${API_SERVER_HOST}/api/admin/product/view/${product.uploadFileNames[0]}`}
                        alt={product.name}
                        sx={{
                          width: 50,
                          height: 50,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell>{product.modifiedAt}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" sx={{ color: '#FFB7F2' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: '#ff8484' }}
                      onClick={() => handleDeleteClick(product)}
                    >
                      <DeleteIcon />
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
      <AlertModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="상품 삭제"
        message="정말 삭제하시겠습니까?"
        isSuccess={false}
        onConfirm={handleDeleteConfirm}
      />
      <AlertModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="엑셀 업로드"
        message="업로드가 완료되었습니다!"
        isSuccess={true}
        onConfirm={() => setUploadModalOpen(false)}
      />
      <AlertModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        title="알림"
        message={alertMessage}
        isSuccess={false}
        onConfirm={() => setShowAlert(false)}
      />
      <UploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleFileUpload}
      />
      <ProgressModal open={showProgressModal} progress={uploadProgress} />
    </div>
  );
};

export default ProductPage;
