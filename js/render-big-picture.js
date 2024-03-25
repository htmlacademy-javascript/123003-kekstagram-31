import { posts } from './create-posts.js';
import { thumbnailsContainer } from './render-thumbnails.js';
import { renderComments, clearComments } from './render-comments.js';

const renderModal = () => {
  const bigPicture = document.querySelector('.big-picture');
  const postCloseBtn = bigPicture.querySelector('.big-picture__cancel');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');

  const renderBigPicture = ({ url, likes, description }) => {
    bigPicture.querySelector('img').setAttribute('src', url);
    bigPictureLikes.textContent = likes;
    bigPictureDescription.textContent = description;
  };

  const closeBigPicture = () => {
    clearComments();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const openBigPicture = (pictureID) => {
    const currentPost = posts.find((post) => post.id === Number(pictureID));

    renderBigPicture(currentPost);
    renderComments(currentPost);

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
  };

  thumbnailsContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      openBigPicture(currentPicture.dataset.id);
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  });

  postCloseBtn.addEventListener('click', closeBigPicture);
};

export { renderModal };
