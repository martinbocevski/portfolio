import "../styles/style.scss";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { getTHREE } from "./THREE";
import { getCounter } from "./counter.js";
import { getMenu } from "./menu.js";
import { getDraggableElement } from "./draggable-element.js";
import {
  getAboutContent,
  getCardStacking,
  getGSAPSlider,
  getLoader,
  getSVGLineAnimation,
  scrollTypeText,
} from "./animations.js";

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  if (document.querySelector(".slider-section")) {
    getGSAPSlider();
  }

  if (document.querySelector(".section-skills")) {
    getCardStacking();
  }
  ScrollTrigger.refresh();
});

if (document.querySelector(".loading-animation-container")) {
  getLoader();
}

// if (document.querySelector(".section-one")) {
//   scrollTypeText(
//     document.querySelector(".section-one"),
//     document.querySelector(".codeH"),
//     `C0nnecting <br/> Digital Fr0ntiers`
//   );
//   scrollTypeText(
//     document.querySelector(".section-one"),
//     document.querySelector(".descAnim"),
//     "I'm a Developer who loves turning ideas into interactive experiences. Whether it's building sleek interfaces or solving tough Frontend or even Backend puzzles, I’m all about creating things that connect people and technology in meaningful ways."
//   );
// }

getMenu();
if (document.querySelector(".hero_section")) {
  getTHREE();
}

if (document.querySelector(".section-about")) {
  getAboutContent();
}

if (document.querySelector(".section-about")) {
  if (window.innerWidth > 768) {
    getDraggableElement(".window-image", ".section-about");
    getDraggableElement(".window-text", ".section-about");
    getDraggableElement(".window-button", ".section-about");
  }
}
if (document.querySelector(".hero_section")) {
  getSVGLineAnimation();
}
