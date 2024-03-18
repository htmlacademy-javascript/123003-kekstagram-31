import { posts } from './create-posts.js';
import { getTemplate } from './utils.js';

const thumbnailsTemplate = getTemplate('picture');
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailsTemplate.cloneNode(true);
  thumbnail.dataset.id = id;
  thumbnail.querySelector('.picture__img').setAttribute('src', url);
  thumbnail.querySelector('.picture__img').setAttribute('alt', description);
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = () => {
  posts.forEach((post) => {
    const thumbnail = createThumbnail(post);
    thumbnailsFragment.appendChild(thumbnail);
  });

  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { thumbnailsContainer, renderThumbnails };
