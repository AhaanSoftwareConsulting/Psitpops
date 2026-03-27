function initAboutAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // --- 1. MISSION: THE 3D SLIDE & MASK REVEAL ---
  // The image will rotate in 3D while the text "unmasks" from the bottom
  gsap.set("#mission img", { 
    rotationY: -45, 
    rotationX: 10, 
    transformOrigin: "left center", 
    opacity: 0, 
    scale: 0.8,
    z: -200 
  });
  
  // Create a "Text Reveal" effect by clipping the container
  gsap.set("#mission h2, #mission p", { y: "100%", opacity: 0, skewY: 7 });

  const missionTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#mission",
      start: "top 70%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
    }
  });

  missionTl.to("#mission img", { 
    rotationY: 0, 
    rotationX: 0, 
    z: 0, 
    opacity: 1, 
    scale: 1, 
    duration: 1.5, 
    ease: "expo.out" 
  })
  .to("#mission h2, #mission p", { 
    y: 0, 
    opacity: 1, 
    skewY: 0, 
    stagger: 0.1, 
    duration: 1.2, 
    ease: "power4.out" 
  }, "-=1");


  // --- 2. VISION: THE MAGNETIC SCALE & BLUR ---
  // Content starts blurred and tiny, then "pops" into the foreground
  gsap.set("#vision img", { filter: "blur(20px)", scale: 1.5, opacity: 0 });
  gsap.set("#vision h2, #vision p", { letterSpacing: "10px", opacity: 0, filter: "blur(10px)" });

  const visionTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#vision",
      start: "top 75%",
      toggleActions: "play reverse play reverse",
    }
  });

  visionTl.to("#vision img", { 
    filter: "blur(0px)", 
    scale: 1, 
    opacity: 1, 
    duration: 1.8, 
    ease: "elastic.out(1, 0.75)" 
  })
  .to("#vision h2, #vision p", { 
    letterSpacing: "0px", 
    opacity: 1, 
    filter: "blur(0px)", 
    stagger: 0.2, 
    duration: 1.2, 
    ease: "expo.out" 
  }, "-=1.4");


  // --- 3. SCRIPTURE: THE INFINITE DRAW & PARALLAX ---
  // The lines grow to 100%, and the background image moves at a different speed
  gsap.set("#Scripture img[src*='Rectangle']", { scaleX: 0, transformOrigin: "center", opacity: 0 });
  gsap.set("#Scripture .max-w-\\[850px\\]", { y: 100, opacity: 0 });

  gsap.to("#Scripture", {
    backgroundPosition: "50% 100%", // Parallax effect
    ease: "none",
    scrollTrigger: {
      trigger: "#Scripture",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  const scriptureTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#Scripture",
      start: "top 60%",
      toggleActions: "play reverse play reverse",
    }
  });

  scriptureTl.to("#Scripture img[src*='Rectangle']", { 
    scaleX: 1, 
    opacity: 1, 
    duration: 1.5, 
    stagger: 0.5, 
    ease: "slow(0.7, 0.7, false)" 
  })
  .to("#Scripture h2, #Scripture p", { 
    y: 0, 
    opacity: 1, 
    duration: 1.2, 
    ease: "power4.out" 
  }, "-=0.5");


  // --- 4. FAITH: THE "STAIRCASE" REVEAL ---
  // Every element drops in from the top with a heavy bounce
  gsap.set("#faith h3, #faith p, #faith a", { y: -100, opacity: 0, rotationX: -90 });
  gsap.set("#faith img", { x: 200, opacity: 0, scale: 0.5 });

  const faithTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#faith",
      start: "top 80%",
      toggleActions: "play reverse play reverse",
    }
  });

  faithTl.to("#faith h3, #faith p, #faith a", { 
    y: 0, 
    opacity: 1, 
    rotationX: 0, 
    stagger: 0.15, 
    duration: 1.5, 
    ease: "bounce.out" 
  })
  .to("#faith img", { 
    x: 0, 
    opacity: 1, 
    scale: 1, 
    duration: 1.5, 
    ease: "back.out(2)" 
  }, "-=1");

  ScrollTrigger.refresh();
}

// Better Observer Logic
let animationInitialized = false;

const observer = new MutationObserver(() => {

  if (animationInitialized) return;

  const mission = document.querySelector("#mission img");
  const vision = document.querySelector("#vision img");
  const scripture = document.querySelector("#Scripture");
  const faith = document.querySelector("#faith img");

  if (mission && vision && scripture && faith) {
    initAboutAnimations();
    animationInitialized = true;
    observer.disconnect();
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true
});