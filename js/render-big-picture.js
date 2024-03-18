import { posts } from './create-posts.js';
import { thumbnailsContainer } from './render-thumbnails.js';

const renderBigPicture = () => {
  const bigPicture = document.querySelector('.big-picture');
  const socialCommentCount = document.querySelector('.social__comment-count');
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

  const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    socialCommentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  };
  const createBigPicture = (currentPost) => {
    bigPicture.querySelector('img').setAttribute('src', currentPost.url);
    bigPictureLikes.textContent = currentPost.likes;
    bigPictureShownLikesCount.textContent = currentPost.comments.length;
    bigPictureTotalLikesCount.textContent = currentPost.comments.length;
    bigPictureDescription.textContent = currentPost.description;
  };
  const createComments = (currentPost) => {
    bigPictureComments.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    currentPost.comments.forEach((comment) => {
      const commentTemplate = bigPictureComment.cloneNode(true);
      commentTemplate.querySelector('img').setAttribute('src', comment.avatar);
      commentTemplate.querySelector('img').setAttribute('alt', comment.name);
      commentTemplate.querySelector('.social__text').textContent =
        comment.message;
      commentsFragment.appendChild(commentTemplate);
    });
    bigPictureComments.appendChild(commentsFragment);
  };
  const openBigPicture = (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      const currentPost = posts.find(
        (post) => post.id === Number(currentPicture.dataset.id)
      );

      createBigPicture(currentPost);
      createComments(currentPost);

      bigPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      document.body.classList.add('modal-open');
    }
  };

  thumbnailsContainer.addEventListener('click', openBigPicture);

  postCloseBtn.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  });
};

export { renderBigPicture };
