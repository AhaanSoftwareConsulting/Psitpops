// contact-animation.js

function initContactAnimations() {
  if (typeof gsap === "undefined") return;
  
  gsap.registerPlugin(ScrollTrigger);

  // Use a timeline for the hero section
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  // 1. Hero Image & Text
  // Note: We check if they exist to avoid GSAP warnings
  if(document.querySelector("img[src*='con-img.png']")) {
      tl.from("img[src*='con-img.png']", { x: -50, opacity: 0 })
        .from("section h1, section p", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.5");
  }

  // 2. The Form
  if(document.getElementById("contactForm")) {
      tl.from("#contactForm", { x: 50, opacity: 0, duration: 1 }, "-=0.8")
        .from("#contactForm .flex", { y: 20, opacity: 0, stagger: 0.05 }, "-=0.5");
  }

  // 3. The Cards (ScrollTriggered)
  if(document.querySelector(".contact-cards")) {
      gsap.from(".contact-cards > div", {
        scrollTrigger: {
          trigger: ".contact-cards",
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
  }
}

// WATCHER: This waits for the HTML to be injected
const observer = new MutationObserver((mutations, obs) => {
    const form = document.getElementById("contactForm");
    if (form) {
        initContactAnimations();
        obs.disconnect(); // Stop watching once found and animated
    }
});

observer.observe(document.body, { childList: true, subtree: true });