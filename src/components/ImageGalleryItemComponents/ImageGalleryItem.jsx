import PropTypes from 'prop-types';
import { ListItem, Image } from './ImageGalleryItem.styled';


export const ImageGalleryItem = ({ picture, onImgClick }) => {
  return (
    <ListItem>
      <Image
        onClick={() => {
          onImgClick(picture.largeImageURL, picture.tags);
        }}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
