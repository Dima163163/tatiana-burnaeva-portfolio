export function one(selector, root = document) {
  return root.querySelector(selector);
}

export function all(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}
