gsap.registerPlugin(ScrollTrigger);

const mainTimeline = gsap.timeline();

// PRELOADER
mainTimeline.to(".progress-bar", {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut"
})
.to(".preloader", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
        document.querySelector(".preloader").style.display = "none";
    }
})

// ANIMACJA WEJŚCIOWA PO ZAŁADOWANIU
.fromTo(".jungle-leaf", 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 0.8, duration: 1.5, stagger: 0.1, ease: "power3.out" },
    "-=0.4"
)
.fromTo([".hero-title", ".hero-subtitle", ".btn-primary"], 
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
    "-=1.2" 
);

// EFEKT PARALAKSY - SCROLLTRIGGER
gsap.to(".leaf-1", {
    y: -150,           
    x: -30,            
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top", 
        scrub: true        
    }
});

gsap.to(".leaf-2", {
    y: -250,           
    x: 50,
    rotation: 15,      
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".leaf-3", {
    y: -80,            
    x: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".leaf-4", {
    y: -200,
    x: 40,
    rotation: -10,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});
