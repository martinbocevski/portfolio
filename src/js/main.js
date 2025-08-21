import "../styles/style.scss";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { getCube, getDisk, getTHREE } from "./THREE";
import { getCounter } from "./counter.js";
import { getMenu } from "./menu.js";
import { getDraggableElement } from "./draggable-element.js";
import {
  getAboutContent,
  getCardStacking,
  getFAQ,
  getLoader,
  getSVGLineAnimation,
  scrollTypeText,
} from "./animations.js";

gsap.registerPlugin(ScrollTrigger);

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

if (document.querySelector(".loading-animation-container")) {
  getLoader();
}

if (document.querySelector(".section-one")) {
  scrollTypeText(
    document.querySelector(".section-one"),
    document.querySelector(".codeH"),
    `C0nnecting <br/> Digital Fr0ntiers`
  );
  scrollTypeText(
    document.querySelector(".section-one"),
    document.querySelector(".descAnim"),
    "I'm a Developer who loves turning ideas into interactive experiences. Whether it's building sleek interfaces or solving tough Frontend or even Backend puzzles, I’m all about creating things that connect people and technology in meaningful ways."
  );
}

getMenu();
if (document.querySelector(".hero_section")) {
  getTHREE();
  // getDraggableElement();
}
// getCounter();
getFAQ();

if (document.querySelector(".section-about")) {
  getAboutContent();
}

if (document.querySelector(".section-about")) {
  getDraggableElement(".window-image", ".section-about");
  getDraggableElement(".window-text", ".section-about");
  getDraggableElement(".window-button", ".section-about");
  // getDraggableElement(".hero-three", ".hero_section");
}

if (document.querySelector(".about-hero_section")) {
  getDisk();
}
if (document.querySelector(".about-hero_section")) {
  getCube();
}
if (document.querySelector(".hero_section")) {
  getSVGLineAnimation();
}

if (document.querySelector(".section-skills")) {
  getCardStacking();
}
