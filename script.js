/* CONTENT CONFIG — update this object; leave media paths blank for placeholders. */
const content = {
    brotherName: "Prince Brother",
    personalMessage: `ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਤਾਂ ਹੈਪੀ ਬਰਥਡੇ ਤੇ ਮੇਰੇ ਵੱਲੋਂ ਤੈਨੂੰ ਬਹੁਤ ਸਾਰਾ ਧੰਨਵਾਦ।

ਧੰਨਵਾਦ ਇਸ ਗੱਲ ਲਈ ਕਿ ਮੈਂ ਅੱਜ ਇਹ ਲੈਪਟਾਪ ‘ਤੇ ਇਹ ਮੈਸੇਜ ਲਿਖ ਰਿਹਾ ਹਾਂ, ਕਾਲਜ ਜਾ ਰਿਹਾ ਹਾਂ। ਪਤਾ ਹੈ ਕਿ ਸ਼ਾਇਦ ਇਸਦਾ ਕੋਈ ਫਾਇਦਾ ਨਹੀਂ, ਪਰ ਅੱਜ ਤੇਰੇ ਬਿਨਾਂ ਮੈਂ ਕਾਲਜ ਨਹੀਂ ਜਾ ਸਕਦਾ ਸੀ।

ਅੱਜ ਘਰ ਵਿੱਚ ਜੋ ਵੀ ਨਵੀਂ ਚੀਜ਼ ਖਰੀਦੀ ਜਾਂਦੀ ਹੈ — ਨਵੀਂ ਮੋਟਰ ਹੋਵੇ, ਕੋਈ ਕੱਪੜੇ ਹੋਣ ਜਾਂ ਹੋਰ ਕੁਝ — ਉਹ ਸਭ ਇਸ ਕਰਕੇ ਆ ਜਾਂਦੀ ਹੈ ਕਿਉਂਕਿ ਤੂੰ ਪੈਸੇ ਦਿੰਦਾ ਹੈਂ।

ਮੈਂ ਬੱਸ ਇਹੀ ਕਹਾਂਗਾ ਕਿ ਰੱਬ ਤੈਨੂੰ ਹਮੇਸ਼ਾ ਖੁਸ਼ ਰੱਖੇ, ਚੜ੍ਹਦੀ ਕਲਾ ਵਿੱਚ ਰੱਖੇ, ਤੰਦਰੁਸਤੀ ਵਿੱਚ ਰੱਖੇ, ਤੇਰੇ ਹਰ ਸੁਪਨੇ ਪੂਰੇ ਕਰੇ ਤੇ ਤੇਰੀ PR ਵੀ ਜਲਦੀ ਹੀ ਹੋ ਜਾਵੇ।

ਸ਼ੁਕਰੀਆ ਹਰ ਇੱਕ ਚੀਜ਼ ਲਈ।`,
    signature: "— Prabhjot",
    celebrationMessage: "Happy Birthday, Prince Brother. I hope this year gives you more stories worth keeping.",
    memories: [
        { image: "./assets/images/memory1.jpg", label: "[Memory Photo 1]", caption: "" },
        { image: "./assets/images/memory2.jpg", label: "[Memory Photo 2]", caption: "" },
        { image: "./assets/images/memory3.jpg", label: "[Memory Photo 3]", caption: "" }
    ]
};

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (selector) => document.querySelector(selector);

function applyText() {
    document.querySelectorAll("[data-content]").forEach((el) => {
        const value = content[el.dataset.content];
        if (value) el.textContent = value;
    });
    document.title = `A little something for ${content.brotherName}`;
}

function renderContent() {
    content.memories.forEach((memory) => {
        const figure = document.createElement("figure"); figure.className = "memory-card reveal";
        const visual = document.createElement("div"); visual.className = "memory-image";
        if (memory.image) { visual.classList.add("has-photo"); visual.style.backgroundImage = `url("${memory.image}")`; visual.setAttribute("role", "img"); visual.setAttribute("aria-label", memory.caption); }
        else visual.innerHTML = `<span class="placeholder-label">${memory.label}</span>`;
        const caption = document.createElement("figcaption"); caption.textContent = memory.caption;
        figure.append(visual, caption); $("#memoryGrid").append(figure);
    });
}

function animations() {
    if (reducedMotion || !window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(".intro-content > *", { autoAlpha: 0, y: 16 });
    gsap.timeline().to(".intro-content > *", { autoAlpha: 1, y: 0, duration: .8, stagger: .13, ease: "power3.out" }).from(".intro-hint", { autoAlpha: 0, duration: .8 }, "-=.35");
    gsap.to(".orb-one", { x: 30, y: 22, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".orb-two", { x: -20, y: -28, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".sparkles i", { opacity: .25, duration: 2.4, stagger: .3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-light", { scale: 1.16, opacity: .65, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
}

function revealStory() {
    const intro = $("#intro"), story = $("#story"), nav = $(".story-nav");
    story.hidden = false; document.body.classList.remove("is-locked");
    if (reducedMotion || !window.gsap) { intro.remove(); nav.classList.add("is-visible"); return; }
    gsap.timeline({ onComplete: () => { intro.remove(); nav.classList.add("is-visible"); ScrollTrigger.refresh(); } })
        .to("#startButton", { scale: .93, duration: .16, ease: "power2.in" })
        .to(".sparkles i", { x: "random(-75,75)", y: "random(-65,65)", opacity: 0, duration: .55, stagger: .03, ease: "power2.out" }, "<")
        .to(".intro-content", { y: -34, autoAlpha: 0, duration: .48, ease: "power2.in" }, "<.08")
        .to("#intro", { clipPath: "circle(0% at 50% 50%)", duration: .72, ease: "power3.inOut" }, "-=.18")
        .from(".hero > *:not(.hero-light)", { autoAlpha: 0, y: 22, duration: .7, stagger: .11, ease: "power3.out" }, "-=.35");
}

applyText(); renderContent(); animations();
$("#startButton").addEventListener("click", revealStory, { once: true });
if (!reducedMotion && window.gsap) document.querySelectorAll(".reveal").forEach((el) => gsap.from(el, { scrollTrigger: { trigger: el, start: "top 87%", once: true }, autoAlpha: 0, y: 26, duration: .78, ease: "power3.out" }));
