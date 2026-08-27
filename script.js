/* CONTENT CONFIG — update this object; leave media paths blank for placeholders. */
const content = {
    brotherName: "Prince Brother",
    personalMessage: "[Write your personal message here. This is a space for the things you mean, in your own words.]",
    signature: "— Prabhjot",
    celebrationMessage: "Happy Birthday, Prince Brother. I hope this year gives you more stories worth keeping.",
    memories: [
        { image: "./assets/images/memory1.jpg", label: "[Memory Photo 1]", caption: "" },
        { image: "./assets/images/memory2.jpg", label: "[Memory Photo 2]", caption: "" },
        { image: "./assets/images/memory3.jpg", label: "[Memory Photo 3]", caption: "" }
    ],
    familyWishes: [
        { name: "Mom", video: "", message: "[Mom’s birthday wish]" },
        { name: "Dad", video: "", message: "[Dad’s birthday wish]" }
    ],
    friendWishes: [
        { name: "Friend 1", video: "", message: "[A message from Friend 1]" }
    ],
    personalVideo: { video: "", label: "[My Birthday Video]" }
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

function videoCard(item, feature = false) {
    const card = document.createElement(feature ? "div" : "article");
    card.className = feature ? "" : "video-card";
    if (item.video) {
        const video = document.createElement("video");
        video.controls = true; video.preload = "metadata"; video.playsInline = true; video.src = item.video;
        video.setAttribute("aria-label", `${item.name || "Personal"} birthday video`); card.append(video);
    } else {
        const preview = document.createElement("div"); preview.className = "video-preview";
        preview.innerHTML = `<span class="play-mark" aria-hidden="true">▶</span><p>${item.label || `[${item.name}'s Video]`}</p>`; card.append(preview);
    }
    if (!feature) {
        const copy = document.createElement("div"); copy.className = "video-card-copy";
        copy.innerHTML = `<strong>${item.name}</strong><p>${item.message}</p>`; card.append(copy);
    }
    return card;
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
    content.familyWishes.forEach((wish) => $("#familyGrid").append(videoCard(wish)));
    content.friendWishes.forEach((wish) => $("#friendsGrid").append(videoCard(wish)));
    $("#personalVideo").append(videoCard(content.personalVideo, true));
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
