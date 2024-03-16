import { NAMES, DESCRIPTIONS, MESSAGES } from './data';
import { getRandomInteger, getRandomArrayElement } from './utils';

const POSTS_COUNT = 25;
const likesCount = {
  MIN: 15,
  MAX: 200,
};

const avatarCount = {
  MIN: 1,
  MAX: 6,
};

const commentsQuantity = {
  MIN: 0,
  MAX: 30,
};

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(
    avatarCount.MIN,
    avatarCount.MAX
  )}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPost = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(likesCount.MIN, likesCount.MAX),
  comments: Array.from(
    { length: getRandomInteger(commentsQuantity.MIN, commentsQuantity.MAX) },
    (_, index) => createComment(index + 1)
  ),
});

const createPosts = () =>
  Array.from({ length: POSTS_COUNT }, (_, index) => createPost(index + 1));

const posts = createPosts();

export { posts };
