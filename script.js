// Rejestracja wtyczki ScrollTrigger dla GSAP
gsap.registerPlugin(ScrollTrigger);

// KROK 1: Inicjalizacja Głównego Timeline'a
// Używamy timeline, żeby animacje wykonywały się w precyzyjnej sekwencji
const mainTimeline = gsap.timeline();

// Animacja paska ładowania - Wymuszenie min. 1.5 sekundy
mainTimeline.to(".progress-bar", {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut"
})
// Płynne zniknięcie preloadera (efekt rozmycia i zanikania)
.to(".preloader", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.inOut",
    onComplete: () => {
        // Po zakończeniu animacji usuwamy element z drzewa renderowania, 
        // żeby nie blokował interakcji ze stroną
        document.querySelector(".preloader").style.display = "none";
    }
})

// KROK 2: Animacja Wejściowa (Hero Section Reveal)
// Kiedy preloader znika, animujemy liście oraz teksty
.fromTo(".jungle-leaf", 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 0.8, duration: 1.5, stagger: 0.1, ease: "power3.out" },
    "-=0.4" // Startujemy na ułamek sekundy przed końcem zanikania preloadera
)
// Elementy tekstowe wjeżdżają sekwencyjnie od dołu
.fromTo([".hero-title", ".hero-subtitle", ".btn-primary"], 
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
    "-=1.2" // Nakładamy tę animację na animację liści
);

// KROK 3: Efekt Paralaksy na Scrollu (ScrollTrigger)
// Każdy liść porusza się w innym tempie i w nieco innym kierunku, 
// by zbudować wrażenie trójwymiarowej głębi.

gsap.to(".leaf-1", {
    y: -150,           // Porusza się do góry przy scrollowaniu
    x: -30,            // Lekko ucieka w lewo
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top", // Animacja kończy się, gdy koniec sekcji mija góre okna
        scrub: true        // Płynne podążanie za suwakiem
    }
});

gsap.to(".leaf-2", {
    y: -250,           // Ten liść rusza się szybciej (daje to złudzenie innej odległości)
    x: 50,
    rotation: 15,      // Lekki obrót dodaje organiczności
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".leaf-3", {
    y: -80,            // Wolniejszy ruch
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