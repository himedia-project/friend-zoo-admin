import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CategoryModal = ({ open, handleClose, title, onSubmit }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (logo) {
      formData.append('file', logo);
    }

    await onSubmit(formData);
    setName('');
    setLogo(null);
    setPreview('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="카테고리명"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Box>
              <input
                accept="image/*"
                type="file"
                id="logo-upload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="logo-upload">
                <Button variant="outlined" component="span">
                  로고 이미지 업로드
                </Button>
              </label>
              {preview && (
                <Box mt={2}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: '#FFB7F2', '&:hover': { bgcolor: '#ff99e6' } }}
            >
              등록
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
