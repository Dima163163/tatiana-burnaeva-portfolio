export function one(selector, root = document) {
  return root?.querySelector(selector) ?? null;
}

export function all(selector, root = document) {
  return root ? [...root.querySelectorAll(selector)] : [];
}
