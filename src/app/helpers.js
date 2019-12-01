export const writeImgUrl = imgPath => {
  const imgSegments = imgPath.split('/');
  return (IMG_URL + imgSegments[imgSegments.length - 1]);
};

