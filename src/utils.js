export const findListElement = node => {
  if (node && node.tagName && node.tagName.toLowerCase() !== 'li') {
    return findListElement(node.parentNode);
  } else {
    return node;
  }
};

export const addClass = (node, cssClass) => {
  node.classList.add(cssClass);
};

export const removeClass = (node, cssClass) => {
  node.classList.remove(cssClass);
};
