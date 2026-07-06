// Rejestracja wtyczki ScrollTrigger do obserwowania przewijania strony
gsap.registerPlugin(ScrollTrigger);

// Główny strumień czasowy animacji startowych
const mainTimeline = gsap.timeline();

// 1. ANIMACJA Paska Postępu PRELOADERA (Wymuszenie 1.5 sekundy)
mainTimeline.to(".progress-bar", {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut"
})
// 2. Łagodne zanikanie preloadera
.to(".preloader", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
        // Usuwamy preloader z warstwy wizualnej by nie blokował kliknięć
        document.querySelector(".preloader").style.display = "none";
        
        // Zabezpieczenie: pokazujemy ukryte domyślnie sekcje .gs-reveal 
        // by upewnić się, że zadziała ScrollTrigger
        gsap.set(".gs-reveal", { visibility: "visible" });
    }
})

// 3. Wjazd Liści
.fromTo(".jungle-leaf", 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 0.9, duration: 1.5, stagger: 0.1, ease: "power3.out" },
    "-=0.4" // Startuje przed całkowitym zniknięciem preloadera
)

// 4. Animacja elementów Tekstowych Sekcji HERO
.fromTo([".hero-title", ".hero-subtitle", ".btn-primary", ".scroll-indicator"], 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
    "-=1.2" // Nakłada się na animację liści
);


// ================= EFEKT PARALAKSY LIŚCI =================
// Każdy liść porusza się w innej osi lub tempie, dając głębię w 3D.
gsap.to(".leaf-1", {
    y: -180, x: -40, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});

gsap.to(".leaf-2", {
    y: -250, x: 60, rotation: 30, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});

gsap.to(".leaf-3", {
    y: -100, x: -30, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});

gsap.to(".leaf-4", {
    y: -200, x: 50, rotation: 180, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
});


// ================= FADE UP (POJAWIANIE SIĘ SEKCJI W DOLE STRONY) =================
const revealElements = document.querySelectorAll('.gs-reveal');

revealElements.forEach((elem) => {
    gsap.fromTo(elem, 
        { 
            y: 50, 
            opacity: 0 
        }, 
        { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Sekcja ładuje się, gdy jej góra wejdzie w 85% widoczności ekranu
                toggleActions: "play none none reverse" // Jeśli przescrollujesz do góry, znowu się ukryje by powtórzyć efekt
            }
        }
    );
});
