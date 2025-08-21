import gsap from "gsap";
import * as THREE from "three";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

gsap.registerPlugin(
  MotionPathPlugin,
  TextPlugin,
  ScrollTrigger,
  ScrollToPlugin
);

export let loadedMesh = null;

const preloadLoader = new GLTFLoader();
preloadLoader.load("../assets/three/logo/m-3d-logo.gltf", (gltf) => {
  loadedMesh = gltf.scene.children[0];
});

export const getFAQ = () => {
  const questionHead = document.querySelectorAll(".question-head");
  const questionBody = document.querySelectorAll(".question-body");
  const questionIcon = document.querySelectorAll(".question-icon");
  questionIcon.forEach((element) => {
    element.style.transform = "rotate(0deg)";
  });

  for (let i = 0; i < questionHead.length; i++) {
    questionHead[i].addEventListener("click", function () {
      questionBody[i].classList.toggle("active-body");
      if (questionIcon[i].style.transform == "rotate(0deg)") {
        questionIcon[i].style.transform = "rotate(45deg)";
      } else {
        questionIcon[i].style.transform = "rotate(0deg)";
      }
    });
  }
};

export const getLoader = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const counterElement = document.querySelector(".count-loading");
    const loaderInner = document.querySelector(".loader-inner");
    const codeProcessor = document.querySelector(".code-processor");
    const heroTitle = document.querySelector(".hero-title");
    const transitionBlock = document.querySelector(".transition");
    const leftLines = document.querySelector(".left-lines");
    const rightLines = document.querySelector(".right-lines");

    const codeProcessorText = `Access.check.....[100%] gathering Data.........
  Format.RM11S.......Done //..................... //......ViteReact
  Ready Form_Full.2368......yes set.12...............ok
  Checks.07............ok Database.......accessed
  oversight.......enabled Encryption.............`;
    const heroTitleText = `Take a deep <br/> dive int0 my <br/> creative mind`;

    let mm = gsap.matchMedia();

    // Disable scroll
    gsap.set("body", { overflow: "hidden" });

    // Timeline
    const tl = gsap.timeline();

    // Counter animation (random increments simulated with ease)
    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 5,
        ease: "power1.inOut",
        onUpdate: function () {
          const val = Math.round(this.targets()[0].value);
          counterElement.textContent = val;
          loaderInner.style.width = val + "%";
        },
      }
    );

    // Code typing animation (requires TextPlugin)
    tl.to(
      codeProcessor,
      {
        text: codeProcessorText,
        duration: 3.5,
        ease: "none",
      },
      "-=4.5"
    ); // overlaps typing with counter animation

    tl.to(transitionBlock, {
      width: "100vw",
      height: "100vh",
      duration: 0.2,
      ease: "none",
    });
    tl.to(transitionBlock, {
      backgroundColor: "#080910",
      duration: 0.5,
      ease: "none",
    });

    // Restore scroll
    tl.set("body", { overflow: "visible" });

    // Hide loader UI
    tl.to(".loading-animation-container", {
      opacity: 0,
      visibility: "hidden",
      duration: 0.7,
      ease: "power2.inOut",
    });

    tl.set(
      [".main-loader", ".main-disc-wrapper", ".frame"],
      {
        display: "none",
      },
      "<"
    );

    tl.to(
      "#header",
      {
        top: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "-=1.5"
    );

    mm.add("(min-width: 769px)", () => {
      // desktop setup code here...
      tl.to(
        leftLines,
        {
          left: "12rem",
          duration: 2,
          ease: "power2.inOut",
        },
        "-=2"
      );
      tl.to(
        rightLines,
        {
          right: "12rem",
          duration: 2,
          ease: "power2.inOut",
        },
        "-=2"
      );
    });

    mm.add("(max-width: 768px)", () => {
      // mobile setup code here...
      tl.to(
        leftLines,
        {
          left: "2rem",
          duration: 2,
          ease: "power2.inOut",
        },
        "-=2"
      );
      tl.to(
        rightLines,
        {
          right: "2rem",
          duration: 2,
          ease: "power2.inOut",
        },
        "-=2"
      );
    });
    // tl.to(
    //   ".scene",
    //   {
    //     width: "100%",
    //     height: "100%",
    //     duration: 2,
    //     ease: "power2.inOut",
    //   },
    //   "+=1"
    // );

    tl.to(heroTitle, {
      text: heroTitleText,
      duration: 2,
      ease: "none",
    }); // overlaps typing with counter animation

    if (loadedMesh) {
      tl.to(loadedMesh.scale, {
        x: 3.3,
        y: 3.3,
        z: 3.3,
        duration: 2,
        ease: "power2.inOut",
      });
    }
  });
};

export const getAboutContent = () => {
  const clickMeBtn = document.querySelector(".click-me");
  const windowText = document.querySelector(".window-text");
  const windowImage = document.querySelector(".window-image");
  const windowButton = document.querySelector(".window-button");

  clickMeBtn.addEventListener("click", function () {
    windowText.style.display = "block";
    setTimeout(() => {
      windowImage.style.display = "block";
    }, 200);
    setTimeout(() => {
      windowButton.style.display = "block";
    }, 300);
  });
};

export const scrollTypeText = (target, targetHeading, text) => {
  gsap.to(".connector", {
    opacity: 1,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: target,
      start: `top top+=20%`,
      // start: `top 80%`,
      end: "bottom bottom",
      toggleActions: "play none none none",
      once: true,
      // markers: true,
    },
  });
  const headerOffset = document.querySelector("#header").offsetHeight - 1;
  gsap.fromTo(
    targetHeading,
    { text: "" }, // start empty
    {
      text: text,
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        start: `top top+=20%`,
        // start: `top 80%`,
        end: "bottom bottom",
        toggleActions: "play none none none",
        once: true,
        // markers: true,
      },
    }
  );
};

export const getSVGLineAnimation = () => {
  const segments = 10;
  for (let i = 0; i < segments; i++) {
    const segment = document.querySelector(".gradient-line").cloneNode(true);
    segment.classList.add("segment-" + i);
    document.querySelector(".animation-svg").appendChild(segment);

    gsap.to(segment, {
      motionPath: {
        path: ".animation-path",
        align: ".animation-path",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      duration: 30,
      ease: "none",
      repeat: -1,
      delay: i * 0.06, // Stagger segments
    });
  }
};

export const getCardStacking = () => {
  let timeln = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-skills",
      pin: true,
      pinSpacing: true,
      start: "top top",
      end: "bottom 0%",
      scrub: true,
    },
  });

  let cards = gsap.utils.toArray(".card");

  cards.forEach((card, i) => {
    let prevCard = cards[i - 1];

    timeln.addLabel(`card${i + 1}`);

    if (prevCard) {
      timeln.to(
        prevCard,
        { scale: 0.95, xPercent: -0.5, opacity: 0.5 },
        "-=0.2"
      );
    }

    timeln.fromTo(
      card,
      { xPercent: 75, opacity: 0 },
      { xPercent: 0, opacity: 1 }
    );
  });
};
