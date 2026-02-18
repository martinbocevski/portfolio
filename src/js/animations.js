import gsap from "gsap";
import * as THREE from "three";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/all";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";

import euroHeroImg from "../assets/euro-hero.jpg";
import vibefuelHeroImg from "../assets/vibe-hero.png";
import tat2HeroImg from "../assets/tat2-spirits-cover.png";
import rackbeatHeroImg from "../assets/Rackbeat-cover.png";
import viddeHeroImg from "../assets/Vidde-cover.png";
import atvHeroImg from "../assets/atv-buggy-hero.webp";
import sigridHeroImg from "../assets/SIG-cover.png";
import sociallyHeroImg from "../assets/socially-powerful-cover.png";

gsap.registerPlugin(
  MotionPathPlugin,
  TextPlugin,
  ScrollTrigger,
  ScrollToPlugin,
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
      },
    );

    // Code typing animation (requires TextPlugin)
    tl.to(
      codeProcessor,
      {
        text: codeProcessorText,
        duration: 3.5,
        ease: "none",
      },
      "-=4.5",
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
      "<",
    );

    tl.to(
      "#header",
      {
        top: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "-=1.5",
    );

    if (leftLines) {
      mm.add("(min-width: 769px)", () => {
        // desktop setup code here...
        tl.to(
          leftLines,
          {
            left: "12rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "-=2",
        );
        tl.to(
          rightLines,
          {
            right: "12rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "-=2",
        );
      });
    }

    if (leftLines) {
      mm.add("(max-width: 768px)", () => {
        // mobile setup code here...
        tl.to(
          leftLines,
          {
            left: "2rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "-=2",
        );
        tl.to(
          rightLines,
          {
            right: "2rem",
            duration: 2,
            ease: "power2.inOut",
          },
          "-=2",
        );
      });
    }
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

    if (heroTitle) {
      tl.to(heroTitle, {
        text: heroTitleText,
        duration: 2,
        ease: "none",
      }); // overlaps typing with counter animation
    }

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
    },
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
  let cards = gsap.utils.toArray(".card");
  const pinDistance = (window.innerHeight * cards.length) / 2;

  let timeln = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-skills",
      pin: true,
      pinSpacing: true,
      start: "top top",
      // end: "bottom 0%",
      end: `+=${pinDistance}px`,
      scrub: 1,
    },
  });

  // console.log(cards.length);

  cards.forEach((card, i) => {
    let prevCard = cards[i - 1];

    timeln.addLabel(`card${i + 1}`);

    if (prevCard) {
      timeln.to(
        prevCard,
        { scale: 0.95, xPercent: -0.5, opacity: 1 },
        "-=0.25",
      );
    }

    timeln.fromTo(
      card,
      { xPercent: 75, opacity: 0 },
      { xPercent: 0, opacity: 1 },
    );
  });
};

export const getGSAPSlider = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const slides = [
    {
      title: "Euroconsumers",
      description:
        "Euroconsumers is a leading, independent, multinational consumer organization representing over 6 million people across Belgium, Italy, Portugal, Spain, and Brazil. It unites national consumer groups to defend consumer rights, provide innovative information/services, and promote fair, sustainable markets.",
      image: euroHeroImg,
      page: "/portfolio/pages/euroconsumers.html",
    },
    {
      title: "Vibefuel",
      description:
        "VibeFuel is a brand of plant-based, vegan nootropic supplements designed to enhance focus, energy, and cognitive performance.",
      image: vibefuelHeroImg,
      page: "/portfolio/pages/vibefuel.html",
    },
    {
      title: "TAT2 Spirits",
      description:
        "TAT2 Spirits is a New York-based brand offering premium, ready-to-drink (RTD) cocktails, primarily known for its sugar-free Kentucky Bourbon Old Fashioned.",
      image: tat2HeroImg,
      page: "/portfolio/pages/tat2-spirits.html",
    },
    {
      title: "Rackbeat",
      description:
        "Rackbeat is a cloud-based warehouse management system (WMS) and inventory management platform designed for small-to-medium-sized businesses (SMBs) in the Nordics.",
      image: rackbeatHeroImg,
      page: "/portfolio/pages/rackbeat.html",
    },
    {
      title: "Vidde",
      description:
        "Vidde (Vidde Mobility) is a Swedish company that has developed the world's first circular electric snowmobile, known as the Alfa.",
      image: viddeHeroImg,
      page: "/portfolio/pages/vidde.html",
    },
    {
      title: "ATV Dubrovnik",
      description:
        "ATV Dubrovnik is offering guided all-terrain vehicle (quad bike) safari tours in the countryside surrounding Dubrovnik, Croatia.",
      image: atvHeroImg,
      page: "/portfolio/pages/atv-dubrovnik.html",
    },
    {
      title: "SIGRID",
      description:
        "Sigrid is a software assurance and quality analysis platform developed by the Software Improvement Group (SIG) to evaluate, monitor, and improve source code quality, security, and maintainability.",
      image: sigridHeroImg,
      page: "/portfolio/pages/sigrid.html",
    },
    {
      title: "Socially Powerful",
      description:
        "Socially Powerful is a global, data-driven influencer marketing and social agency founded in 2017 with offices in London, New York, Dubai, and Beijing.",
      image: sociallyHeroImg,
      page: "/portfolio/pages/socially-powerful.html",
    },
  ];

  const pinDistance = window.innerHeight * (slides.length - 1);
  const progressBar = document.querySelector(".slider-progress");
  const sliderImages = document.querySelector(".slider-images");
  const sliderTitle = document.querySelector(".slider-title");
  const sliderDescription = document.querySelector(".slider-description");
  const sliderBtn = document.querySelector(".slider-btn");
  const sliderIndices = document.querySelector(".slider-indices");

  let activeSlide = 0;
  let currentSplit = null;
  let currentSplitTitle = null;

  function createIndices() {
    sliderIndices.innerHTML = "";

    slides.forEach((_, index) => {
      const indexNum = (index + 1).toString().padStart(2, "0");
      const indicatorElement = document.createElement("p");
      indicatorElement.dataset.index = index;
      indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
      sliderIndices.appendChild(indicatorElement);

      if (index === 0) {
        gsap.set(indicatorElement.querySelector(".index"), {
          opacity: 1,
          fontWeight: 600,
        });
        gsap.set(indicatorElement.querySelector(".marker"), {
          scaleX: 1,
        });
      } else {
        gsap.set(indicatorElement.querySelector(".index"), {
          opacity: 0.7,
          fontWeight: 400,
        });
        gsap.set(indicatorElement.querySelector(".marker"), {
          scaleX: 0,
        });
      }
    });
  }

  function animateNewSlide(index) {
    const newSliderImage = document.createElement("img");
    newSliderImage.src = slides[index].image;
    newSliderImage.alt = `Slide ${index + 1}`;

    gsap.set(newSliderImage, {
      opacity: 0,
      scale: 1.1,
    });

    sliderImages.appendChild(newSliderImage);

    gsap.to(newSliderImage, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(newSliderImage, {
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });

    const allImages = sliderImages.querySelectorAll("img");
    if (allImages.length > 3) {
      const removeCount = allImages.length - 3;
      for (let i = 0; i < removeCount; i++) {
        sliderImages.removeChild(allImages[i]);
      }
    }

    animateNewTitle(index);
    animateIndicators(index);
  }

  function animateIndicators(index) {
    const indicators = sliderIndices.querySelectorAll("p");

    indicators.forEach((indicator, i) => {
      const markerElement = indicator.querySelector(".marker");
      const indexElement = indicator.querySelector(".index");

      if (i === index) {
        gsap.to(indexElement, {
          opacity: 1,
          textShadow: "0px 0px 5px #fff",
          fontWeight: 600,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(markerElement, {
          scaleX: 1,
          boxShadow: "0px 0px 5px #fff",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(indexElement, {
          opacity: 0.7,
          textShadow: "0px 0px 0px #fff",
          fontWeight: 400,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(markerElement, {
          scaleX: 0,
          boxShadow: "0px 0px 0px #fff",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }

  function animateNewTitle(index) {
    if (currentSplit) {
      currentSplit.revert();
    }
    if (currentSplitTitle) {
      currentSplitTitle.revert();
    }

    sliderTitle.innerHTML = `
    <h2>${slides[index].title}</h2>`;
    sliderDescription.innerHTML = `
    <p>${slides[index].description}</p>`;
    sliderBtn.setAttribute(
      "href",
      `
    ${slides[index].page}`,
    );

    currentSplitTitle = new SplitText(sliderTitle.querySelector("h2"), {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });
    currentSplit = new SplitText(sliderDescription.querySelector("p"), {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.set(currentSplit.lines, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.to(currentSplit.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.set(currentSplitTitle.lines, {
      yPercent: 100,
      opacity: 0,
    });

    gsap.to(currentSplitTitle.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

  createIndices();

  ScrollTrigger.create({
    trigger: ".slider-section",
    start: "top top",
    end: `+=${pinDistance}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      gsap.set(progressBar, {
        scaleY: self.progress,
      });

      const currentSlide = Math.floor(self.progress * slides.length);

      if (activeSlide !== currentSlide && currentSlide < slides.length) {
        activeSlide = currentSlide;
        animateNewSlide(activeSlide);
      }
    },
  });
};
