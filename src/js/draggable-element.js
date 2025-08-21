import { gsap } from "gsap";
import { Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);

export const getDraggableElement = (element, parent) => {
  const windowContainer = document.querySelector(parent);
  let window = windowContainer.querySelector(element);

  document.addEventListener("DOMContentLoaded", () => {
    Draggable.create(window, {
      type: "x, y",
      bounds: windowContainer,
    });
  });
};
