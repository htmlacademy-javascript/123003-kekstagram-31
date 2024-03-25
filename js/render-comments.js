const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPicture.querySelector('.social__comment');
const bigPictureShownLikesCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const bigPictureTotalLikesCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const commentsLoader = bigPicture.querySelector('.comments-loader');
let actualComments = [];
let actualCommentsCount = 0;
const COMMENTS_STEP = 5;
bigPictureComments.innerHTML = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = actualComments.slice(
    actualCommentsCount,
    actualCommentsCount + COMMENTS_STEP
  );
  const renderedCommentsLength = renderedComments.length + actualCommentsCount;

  renderedComments.forEach((comment) => {
    const commentTemplate = bigPictureComment.cloneNode(true);
    commentTemplate.querySelector('img').setAttribute('src', comment.avatar);
    commentTemplate.querySelector('img').setAttribute('alt', comment.name);
    commentTemplate.querySelector('.social__text').textContent =
      comment.message;
    commentsFragment.appendChild(commentTemplate);
  });

  bigPictureComments.appendChild(commentsFragment);

  bigPictureShownLikesCount.textContent = renderedCommentsLength;
  bigPictureTotalLikesCount.textContent = actualComments.length;

  if (renderedCommentsLength >= actualComments.length) {
    commentsLoader.classList.add('hidden');
  }

  actualCommentsCount += COMMENTS_STEP;
};

const clearComments = () => {
  actualCommentsCount = 0;
  bigPictureComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
};

const renderComments = ({ comments }) => {
  actualComments = comments;
  renderNextComments();
  commentsLoader.addEventListener('click', renderNextComments);
};

export { renderComments, clearComments };
