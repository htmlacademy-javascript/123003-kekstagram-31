import { posts } from './create-posts.js';
import { thumbnailsContainer } from './render-thumbnails.js';

const renderModal = () => {
  const bigPicture = document.querySelector('.big-picture');
  const commentsLoader = document.querySelector('.comments-loader');
  const postCloseBtn = document.querySelector('.big-picture__cancel');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureShownLikesCount = bigPicture.querySelector(
    '.social__comment-shown-count'
  );
  const bigPictureTotalLikesCount = bigPicture.querySelector(
    '.social__comment-total-count'
  );
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  const bigPictureComment = bigPicture.querySelector('.social__comment');
  let currentCommentsCount = 0;
  const COMMENTS_LOAD_QUANTITY = 5;
  let currentPost;

  const closeBigPicture = () => {
    currentCommentsCount = 0;
    currentPost = 0;
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  const renderBigPicture = ({ comments, url, likes, description }) => {
    bigPicture.querySelector('img').setAttribute('src', url);
    bigPictureLikes.textContent = likes;
    bigPictureShownLikesCount.textContent = comments.length;
    bigPictureTotalLikesCount.textContent = comments.length;
    bigPictureDescription.textContent = description;
  };

  const renderComments = ({ comments }) => {
    bigPictureComments.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();

    for (let i = 0; i < COMMENTS_LOAD_QUANTITY + currentCommentsCount; i++) {
      const commentTemplate = bigPictureComment.cloneNode(true);

      commentTemplate
        .querySelector('img')
        .setAttribute('src', comments[i].avatar);
      commentTemplate
        .querySelector('img')
        .setAttribute('alt', comments[i].name);
      commentTemplate.querySelector('.social__text').textContent =
        comments[i].message;
      commentsFragment.appendChild(commentTemplate);
    }

    if (comments.length > currentCommentsCount + COMMENTS_LOAD_QUANTITY) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }

    bigPictureShownLikesCount.textContent =
      currentCommentsCount + COMMENTS_LOAD_QUANTITY;
    currentCommentsCount += COMMENTS_LOAD_QUANTITY;
    bigPictureComments.appendChild(commentsFragment);
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

  commentsLoader.addEventListener('click', renderComments(currentPost));

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture();
    }
  });
  postCloseBtn.addEventListener('click', closeBigPicture);
};
