const ImageGalleryItem = ({ imagesArr, handleSetOpenModal }) => {
  const handleClick = (largeImageURL, tags) => {
    handleSetOpenModal(largeImageURL, tags);
  };
  return imagesArr.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      className="ImageGalleryItem"
      key={id}
      onClick={() => handleClick(largeImageURL, tags)}
    >
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  ));
};

export default ImageGalleryItem;
