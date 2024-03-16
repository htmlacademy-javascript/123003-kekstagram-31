function getRandomInteger(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = Math.round(min + Math.random() * (max - min));
  return randomValue;
}

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const getTemplate = (id) => {
  const template = document.getElementById(id);
  if (!template) {
    throw new Error(`Template ${id} not found`);
  }
  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error('Not template element');
  }
  return template.content.firstElementChild;
};

export { getRandomInteger, getRandomArrayElement, getTemplate };
