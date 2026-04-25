const teamMembers = [
  {
    id: "LLK",
    direction: "pwn",
    avatar: "images/user/llk.jpg",
    quote: "CloudEver队长",
    blog: "https://blog.csdn.net/llovewuzhengzi",
  },
  {
    id: "ENOCH",
    direction: "web",
    avatar: "images/user/ENOCH.jpg",
    quote: "好想变强。。。",
    blog: "https://enoch.host",
  },
  {
    id: "火锅要加辣",
    direction: "web",
    avatar: "images/user/gw.jpg",
    quote: "活在舒服的生命节奏里",
    blog: "https://lally.top",
  },
  {
    id: "FFreestanding",
    direction: "pwn/web",
    avatar: "images/user/yxz.jpg",
    quote: "先放着",
    blog: "https://www.yuque.com/ffreestanding/kernelpwn",
  },
  {
    id: "liuyan",
    direction: "re",
    avatar: "images/user/momo.jfif",
    quote: "搞事！搞事！搞事！",
  },
  {
    id: "YHalo",
    direction: "pwn",
    avatar: "images/user/YHalo.jpg",
    quote: "我受够了繁文缛节",
    blog: "https://yhalo.cn",
  },
  {
    id: "s1rius",
    direction: "web",
    avatar: "images/user/s1rius.jpg",
    quote: "剑未佩妥，出门已是江湖",
    blog: "https://s1rius.space/",
  },
  {
    id: "Existence",
    direction: "pwn",
    avatar: "images/user/Existence.jpg",
    quote: "Per aspera ad astra",
  },
  {
    id: "祈染安",
    direction: "web",
    avatar: "images/user/祈染安.jpg",
    quote: "当观水月，莫怨松风",
    blog: "https://qiranan.github.io/",
  },
  {
    id: "陌丄未央",
    direction: "misc",
    avatar: "images/user/陌丄未央.jpg",
    quote: "努力成为大手子ing…",
  },
  {
    id: "Pretend",
    direction: "re",
    avatar: "images/user/Pretend.jpg",
    quote: "试试就试试!",
    blog: "https://pretend-art.github.io/",
  },
  {
    id: "晨昏蒙影",
    direction: "web",
    avatar: "images/user/晨昏蒙影.jpg",
    quote: "自强不息",
    blog: "https://grrchmy.cn/",
  },
  {
    id: "pencil_fish",
    direction: "web",
    avatar: "images/user/pencil_fish.jpg",
    quote: "我是一条坐在椅子上的鱼",
    blog: "https://pencilfishdaydream.fun/",
  },
];

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card reveal";

  const photo = document.createElement("div");
  photo.className = "member-photo";

  const image = document.createElement("img");
  image.src = member.avatar;
  image.alt = `${member.id} 头像`;
  image.loading = "lazy";
  image.decoding = "async";
  photo.appendChild(image);

  if (member.blog) {
    const blogLink = document.createElement("a");
    blogLink.className = "member-link";
    blogLink.href = member.blog;
    blogLink.target = "_blank";
    blogLink.rel = "noopener";
    blogLink.setAttribute("aria-label", `打开 ${member.id} 的主页`);

    const icon = document.createElement("i");
    icon.className = "fas fa-globe";
    icon.setAttribute("aria-hidden", "true");
    blogLink.appendChild(icon);
    photo.appendChild(blogLink);
  }

  const direction = createTextElement("span", "member-direction", member.direction);
  photo.appendChild(direction);

  const info = document.createElement("div");
  info.className = "member-info";
  info.appendChild(createTextElement("h3", "member-name", member.id));
  info.appendChild(createTextElement("p", "member-quote", member.quote || ""));

  card.appendChild(photo);
  card.appendChild(info);

  return card;
}

function renderTeam() {
  const container = document.querySelector(".team-grid");
  if (!container) return;

  const fragment = document.createDocumentFragment();
  teamMembers
    .filter((member) => member && member.id && member.avatar && member.direction)
    .forEach((member) => fragment.appendChild(createMemberCard(member)));

  container.replaceChildren(fragment);
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("js-reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  revealItems.forEach((item, index) => {
    const isDenseListItem = item.closest(".team-grid, .achievement-list");
    const delayStep = isDenseListItem ? index % 8 : 0;
    item.style.setProperty("--reveal-delay", `${delayStep * 32}ms`);
    if (item.getBoundingClientRect().top < window.innerHeight * 0.96) {
      item.classList.add("is-visible");
      return;
    }
    observer.observe(item);
  });
}

function setupCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".capability-card");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

function setupButtonPress() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--press-x", `${event.clientX - rect.left}px`);
      button.style.setProperty("--press-y", `${event.clientY - rect.top}px`);
      button.classList.remove("is-pressed");
      void button.offsetWidth;
      button.classList.add("is-pressed");
    });

    button.addEventListener("animationend", () => {
      button.classList.remove("is-pressed");
    });
  });
}

function setupNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

function setupJoinModal() {
  const modal = document.getElementById("join-modal");
  const openers = document.querySelectorAll("[data-open-join]");
  const closers = document.querySelectorAll("[data-close-join]");
  if (!modal || openers.length === 0) return;

  let lastFocusedElement = null;

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close")?.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  openers.forEach((button) => button.addEventListener("click", openModal));
  closers.forEach((button) => button.addEventListener("click", closeModal));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
  setupNavigation();
  setupJoinModal();
  setupReveal();
  setupCardTilt();
  setupButtonPress();
});
