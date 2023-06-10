import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/image-gallery-item/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ pictures, error, onOpenModal }) => {
  return (
    <GalleryList>
      <ImageGalleryItem pictures={pictures} error={error} onOpenModal={onOpenModal}/>
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};

