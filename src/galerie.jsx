import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Modal, Button, Backdrop, styled } from '@mui/material';
import Titre from './components/title';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useMediaQuery } from '@mui/material';



const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)', // Add the backdrop filter for background blur
};

function StandardImageList() {
  const isMediumScreen = useMediaQuery('(min-width: 351px) and (max-width: 600px)');
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLastImage, setIsLastImage] = React.useState(false);
  const [isFirstImage, setIsFirstImage] = React.useState(false);

  const openImageModal = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
    setOpenModal(true);
  };

  const closeImageModal = () => {
    setSelectedImage('');
    setOpenModal(false);
  };

  const showNextImage = () => {
    if (currentIndex < itemData.length - 1) {
      openImageModal(itemData[currentIndex + 1].img, currentIndex + 1);
    } else {
      setIsLastImage(true);
    }
  };

  const showPreviousImage = () => {
    if (currentIndex > 0) {
      openImageModal(itemData[currentIndex - 1].img, currentIndex - 1);
    } else {
      setIsFirstImage(true);
    }
  };
  React.useEffect(() => {
    if (isLastImage) {
      const timer = setTimeout(() => {
        setIsLastImage(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isLastImage]);

  React.useEffect(() => {
    if (isFirstImage) {
      const timer = setTimeout(() => {
        setIsFirstImage(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isFirstImage]);


  return (
    <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'} alignItems={'center'} paddingTop={isMediumScreen ? 2 : 3}>
      {itemData.map((item, index) => (
        <ImageListItem key={item.img} style={{ margin: '10px' }} onClick={() => openImageModal(item.img, index)}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            style={{ borderRadius: '15px', width: '150px', height: '250px', marginBottom: '15px' }}
          />
        </ImageListItem>
      ))}

      <StyledModal open={openModal} onClose={closeImageModal} closeAfterTransition BackdropComponent={Backdrop}>
        <Box sx={modalStyle}>
          <img src={selectedImage} alt="A beautiful landscape" style={{ maxWidth: '100%' }} />
          <Button onClick={showPreviousImage} variant="contained" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '50%', padding: '10px 0px 10px 0px' }}>
            <ChevronLeftIcon sx={{ fontSize: 35 }} />
          </Button>
          <Button onClick={showNextImage} variant="contained" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '50%', padding: '10px 0px 10px 0px' }}>
            <ChevronRightIcon sx={{ fontSize: 35 }} />
          </Button>
          {isLastImage && (
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.8)', color: '#fff', textAlign: 'center', padding: '10px' }}>
              This is the last image
            </div>
          )}
          {isFirstImage && (
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.8)', color: '#fff', textAlign: 'center', padding: '10px' }}>
              This is the First image
            </div>
          )}
        </Box>

      </StyledModal>
    </Box>
  );
}

const Galerie = () => {
  return (
    <Box>
      <Titre titre="Galerie" />
      <Box padding={1} paddingTop={15}>
        <StandardImageList />
      </Box>
    </Box>
  );
};

export default Galerie;