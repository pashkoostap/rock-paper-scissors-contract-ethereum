export default class DOMService {
  static addClass(node, cssClass) {
    node.classList.add(cssClass);
  }

  static removeClass(node, cssClass) {
    node.classList.remove(cssClass);
  }
}
