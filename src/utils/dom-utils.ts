export function setAttributes(
  element: Element,
  attributes: Record<string, string>
): void {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

export function createElement<K extends keyof HTMLElementTagNameMap | string>(
  tagName: K,
  id?: string | null
): HTMLElement {
  const element = document.createElement(tagName) as HTMLElement;
  if (id) {
    element.id = id;
  }
  return element;
}
