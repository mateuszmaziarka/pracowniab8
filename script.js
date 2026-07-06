gsap.registerPlugin(ScrollTrigger);

// Ukrywamy elementy przed startem animacji
gsap.set([".gs-reveal-hero", ".gs-reveal-nav", ".gs-reveal-up"], { opacity: 0, y: 30 });
gsap.set(".hero-image", { scale: 1.15 }); 

const mainTimeline = gsap.timeline();

// 1. ŁADOWANIE PRELOADERA (Oryginalny szampański/beżowy pasek)
mainTimeline.to(".progress-line-inner", {
    width: "100%",
    duration: 1.8,
    ease: "power2.inOut"
})
// 2. ROZMYCIE I ZANIK PRELOADERA
.to(".preloader", {
    opacity: 0,
    duration: 1.2,
    ease: "power2.inOut",
    onComplete: () => {
        document.querySelector(".preloader").style.display = "none";
    }
})
// 3. EFEKT KENA BURNSA NA TLE (powolne oddalenie tła, buduje napięcie)
.to(".hero-image", {
    scale: 1,
    duration: 4,
    ease: "power2.out"
}, "-=0.8") 

// 4. ANIMACJA WEJŚCIA TEKSTÓW I MENU
.to([".gs-reveal-nav", ".gs-reveal-hero"], {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.15,
    ease: "power3.out"
}, "-=3.5");

// ================= ANIMACJE PRZY SCROLLOWANIU =================
// Każda kolejna sekcja będzie elegancko i miękko wypływać od dołu
const scrollElements = document.querySelectorAll('.gs-reveal-up');

scrollElements.forEach((elem) => {
    gsap.to(elem, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: elem,
            start: "top 85%", // Odpala, gdy element pojawi się na dole ekranu
            toggleActions: "play none none none" 
        }
    });
});

// ================= PARALAKSA ZDJĘCIA O PRACOWNI =================
// Zdjęcie w sekcji "O pracowni" przesuwa się lekko wewnątrz ramki na scrollu
gsap.to(".about-image", {
    y: 50,
    ease: "none",
    scrollTrigger: {
        trigger: ".about-image-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});
