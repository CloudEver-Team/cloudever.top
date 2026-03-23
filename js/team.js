// Update the entries in teamMembers to keep the roster in sync.
const teamMembers = [
  {
    id: "LLK",
    direction: "pwn",
    avatar: "https://cloudever.top/images/user/llk.jpg",
    quote: "CloudEver队长",
    blog: "https://blog.csdn.net/llovewuzhengzi",
  },
 {
    id: "ENOCH",
    direction: "web",
    avatar: "https://cloudever.top/images/user/ENOCH.jpg",
    quote: "好想变强。。。",
    blog: "https://enoch.host",
  },
  {
    id: "火锅要加辣",
    direction: "web",
    avatar: "https://cloudever.top/images/user/gw.jpg",
    quote: "活在舒服的生命节奏里",
    blog: "https://lally.top",
  },
  {
    id: "FFreestanding",
    direction: "pwn/web",
    avatar: "https://cloudever.top/images/user/yxz.jpg",
    quote: "先放着",
    blog: "https://www.yuque.com/ffreestanding/kernelpwn",
  },
  {
    id: "liuyan",
    direction: "re",
    avatar: "https://cloudever.top/images/user/momo.jfif",
    quote: "搞事！搞事！搞事！",
  },
  {
    id: "YHalo",
    direction: "pwn",
    avatar: "https://cloudever.top/images/user/YHalo.jpg",
    quote: "我受够了繁文缛节",
    blog: "https://yhalo.cn",
  },
  {
    id: "s1rius",
    direction: "web",
    avatar: "https://cloudever.top/images/user/s1rius.jpg",
    quote: "剑未佩妥，出门已是江湖",
    blog: "https://s1rius.space/",
  },
  {
    id: "Existence",
    direction: "pwn",
    avatar: "https://cloudever.top/images/user/Existence.jpg",
    quote: "Per aspera ad astra",
  },
  {
    id: "祈染安",
    direction: "web",
    avatar: "https://cloudever.top/images/user/祈染安.jpg",
    quote: "当观水月，莫怨松风",
    blog: "https://qiranan.github.io/",
  },
  {
    id: "陌丄未央",
    direction: "misc",
    avatar: "https://cloudever.top/images/user/陌丄未央.jpg",
    quote: "努力成为大手子ing…",
  },
  {
    id: "Pretend",
    direction: "re",
    avatar: "https://cloudever.top/images/user/Pretend.jpg",
    quote: " 试试就试试!",
    blog: "https://pretend-art.github.io/",
  },
  {
    id: "晨昏蒙影",
    direction: "web",
    avatar: "https://cloudever.top/images/user/晨昏蒙影.jpg",
    quote: "自强不息",
    blog: "https://grrchmy.cn/",
  },
  {
    id: "pencil_fish",
    direction: "web",
    avatar: "https://cloudever.top/images/user/pencil_fish.jpg",
    quote: "我是一条坐在椅子上的鱼",
    blog: "https://pencilfishdaydream.fun/",
  }
];

function createMemberCard(member) {
  const card = document.createElement("div");
  card.className = "member-card";

  const imageBox = document.createElement("div");
  imageBox.className = "member-img";
  Object.assign(imageBox.style, {
    backgroundImage: `url('${member.avatar}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const overlay = document.createElement("div");
  overlay.className = "member-overlay";
  Object.assign(overlay.style, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    padding: "20px",
  });

  if (member.blog) {
    const blogLink = document.createElement("a");
    blogLink.className = "member-icon";
    blogLink.href = member.blog;
    blogLink.target = "_blank";
    blogLink.rel = "noopener";
    blogLink.style.marginLeft = "0";

    const icon = document.createElement("i");
    icon.className = "fas fa-globe";

    blogLink.appendChild(icon);
    overlay.appendChild(blogLink);
  }

  const directionTag = document.createElement("span");
  directionTag.textContent = member.direction;
  Object.assign(directionTag.style, {
    fontSize: "0.9rem",
    color: "var(--primary)",
    background: "rgba(0, 230, 246, 0.08)",
    borderRadius: "8px",
    padding: "2px 10px",
    marginRight: "0",
  });
  if (!member.blog) {
    directionTag.style.marginLeft = "auto";
  }
  overlay.appendChild(directionTag);

  imageBox.appendChild(overlay);
  card.appendChild(imageBox);

  const infoBox = document.createElement("div");
  infoBox.className = "member-info";

  const name = document.createElement("h3");
  name.className = "member-name";
  name.textContent = member.id;

  const quote = document.createElement("div");
  quote.className = "member-role";
  quote.textContent = member.quote || "";

  infoBox.appendChild(name);
  infoBox.appendChild(quote);
  card.appendChild(infoBox);

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".team-grid");
  if (!container || !Array.isArray(teamMembers)) {
    return;
  }

  container.textContent = "";

  const fragment = document.createDocumentFragment();
  teamMembers.forEach((member) => {
    if (!member || !member.id || !member.avatar || !member.direction) {
      return;
    }
    fragment.appendChild(createMemberCard(member));
  });

  container.appendChild(fragment);
});
