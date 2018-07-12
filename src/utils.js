export const findListElement = node => {
  if (node && node.tagName && node.tagName.toLowerCase() !== 'li') {
    return findListElement(node.parentNode);
  } else {
    return node;
  }
};
