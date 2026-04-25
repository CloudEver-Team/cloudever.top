const teamMembers = [
  {
    id: "LLK",
    direction: "pwn",
    avatar: "images/user/llk.jpg",
    quote: "Founder",
    blog: "https://blog.csdn.net/llovewuzhengzi",
  },
  {
    id: "ENOCH",
    direction: "web",
    avatar: "images/user/ENOCH.jpg",
    quote: "现任队长",
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

function typeHeroText(element, text, onComplete) {
  const characters = Array.from(text);
  let index = 0;

  element.textContent = "";
  element.classList.add("is-typing");

  const tick = () => {
    element.textContent += characters[index] || "";
    index += 1;

    if (index >= characters.length) {
      element.classList.remove("is-typing");
      element.classList.add("is-typed");
      onComplete?.();
      return;
    }

    const lastCharacter = characters[index - 1];
    const delay = /[,.，。;；]/.test(lastCharacter) ? 48 : 12;
    window.setTimeout(tick, delay);
  };

  tick();
}

function setupHeroIntro() {
  const hero = document.querySelector(".hero");
  const subtitle = hero?.querySelector(".hero-subtitle");
  if (!hero || !subtitle) return;

  const originalText = subtitle.textContent.replace(/\s+/g, " ").trim();
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hudReady = false;

  const markHudReady = () => {
    if (hudReady) return;
    hudReady = true;
    hero.classList.add("is-hud-ready");
    hero.dispatchEvent(new CustomEvent("hero-hud-ready"));
  };

  if (prefersReducedMotion) {
    subtitle.textContent = originalText;
    subtitle.classList.add("is-typed");
    markHudReady();
    return;
  }

  subtitle.textContent = "";
  window.setTimeout(markHudReady, 2360);
  window.setTimeout(() => {
    typeHeroText(subtitle, originalText, () => {
      window.setTimeout(markHudReady, 120);
    });
  }, 1540);
}

function renderAsciiOrbit(angleA, angleB) {
  const width = 32;
  const height = 15;
  const buffer = Array(width * height).fill(" ");
  const zBuffer = Array(width * height).fill(0);
  const glyphs = ".,-~:;=!*#$@";
  const sinA = Math.sin(angleA);
  const cosA = Math.cos(angleA);
  const sinB = Math.sin(angleB);
  const cosB = Math.cos(angleB);

  for (let theta = 0; theta < Math.PI * 2; theta += 0.28) {
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let phi = 0; phi < Math.PI * 2; phi += 0.16) {
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const circle = 2 + cosTheta;
      const depth = 5 + cosA * circle * sinPhi + sinA * sinTheta;
      const inverseDepth = 1 / depth;
      const x = circle * (cosB * cosPhi + sinA * sinB * sinPhi) - cosA * sinB * sinTheta;
      const y = circle * (sinB * cosPhi - sinA * cosB * sinPhi) + cosA * cosB * sinTheta;
      const projectedX = Math.floor(width / 2 + 18 * inverseDepth * x);
      const projectedY = Math.floor(height / 2 - 9 * inverseDepth * y);
      const luminance =
        cosPhi * cosTheta * sinB -
        cosA * cosTheta * sinPhi -
        sinA * sinTheta +
        cosB * (cosA * sinTheta - cosTheta * sinA * sinPhi);

      if (projectedY < 0 || projectedY >= height || projectedX < 0 || projectedX >= width || luminance <= 0) {
        continue;
      }

      const index = projectedX + width * projectedY;
      if (inverseDepth > zBuffer[index]) {
        const glyphIndex = Math.min(glyphs.length - 1, Math.floor(luminance * 8));
        zBuffer[index] = inverseDepth;
        buffer[index] = glyphs[glyphIndex];
      }
    }
  }

  const rows = [];
  for (let row = 0; row < height; row += 1) {
    rows.push(buffer.slice(row * width, (row + 1) * width).join(""));
  }
  return rows.join("\n");
}

function setupAsciiOrbit() {
  const target = document.querySelector("[data-ascii-orbit]");
  if (!target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  const draw = () => {
    target.textContent = renderAsciiOrbit(frame * 0.09, frame * 0.055);
    frame += 1;
  };

  draw();
  if (!prefersReducedMotion) {
    window.setInterval(draw, 78);
  }
}

function setupTerminal() {
  const output = document.querySelector("[data-terminal-output]");
  const input = document.querySelector("[data-terminal-input]");
  const hero = document.querySelector(".hero");
  if (!output || !input) return;

  const v86Assets = {
    script: "assets/v86/libv86.js",
    wasm: "assets/v86/v86.wasm",
    bios: "assets/v86/seabios.bin",
    vgaBios: "assets/v86/vgabios.bin",
    kernel: "assets/v86/buildroot-bzimage68.bin",
  };
  const history = [];
  let historyIndex = 0;
  let currentDirectory = "/";
  let terminalMode = "shell";
  let booted = false;
  let streamLine = null;
  let ansiSkipMode = "";
  const flag = "flag{join_cloudEver_and_capture_the_real_one}";
  const fileSystem = {
    "/": ["bin/", "home/", "tmp/", "flag"],
    "/bin": ["busybox"],
    "/home": ["cloudever/"],
    "/home/cloudever": ["team", "scoreboard", "writeups"],
    "/tmp": [],
  };
  const hasDirectory = (path) => Object.prototype.hasOwnProperty.call(fileSystem, path);

  const appendLine = (text, className = "") => {
    streamLine = null;
    const line = document.createElement("div");
    line.className = className ? `terminal-line ${className}` : "terminal-line";
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  };

  const appendStream = (text, className = "vm") => {
    Array.from(text).forEach((character) => {
      if (ansiSkipMode) {
        if (ansiSkipMode === "escape") {
          if (character === "[") {
            ansiSkipMode = "csi";
            return;
          }
          if (character === "]") {
            ansiSkipMode = "osc";
            return;
          }
          if (character === "P" || character === "^" || character === "_") {
            ansiSkipMode = "string";
            return;
          }
          ansiSkipMode = "";
          return;
        }

        if (ansiSkipMode === "csi") {
          if (character >= "@" && character <= "~") {
            ansiSkipMode = "";
          }
          return;
        }

        if (ansiSkipMode === "osc") {
          if (character === "\u0007") {
            ansiSkipMode = "";
          } else if (character === "\u001b") {
            ansiSkipMode = "osc-escape";
          }
          return;
        }

        if (ansiSkipMode === "osc-escape") {
          ansiSkipMode = character === "\\" ? "" : "osc";
          return;
        }

        if (ansiSkipMode === "string") {
          if (character === "\u001b") {
            ansiSkipMode = "string-escape";
          }
          return;
        }

        if (ansiSkipMode === "string-escape") {
          ansiSkipMode = character === "\\" ? "" : "string";
          return;
        }
      }

      if (character === "\u001b") {
        ansiSkipMode = "escape";
        return;
      }

      if (character === "\u009b") {
        ansiSkipMode = "csi";
        return;
      }

      if (character === "\r") return;

      if (character === "\n") {
        streamLine = null;
        output.scrollTop = output.scrollHeight;
        return;
      }

      if (character === "\b" || character === "\u007f") {
        if (streamLine) {
          streamLine.textContent = streamLine.textContent.slice(0, -1);
        }
        return;
      }

      if (!streamLine) {
        streamLine = document.createElement("div");
        streamLine.className = `terminal-line ${className}`;
        output.appendChild(streamLine);
      }

      streamLine.textContent += character;
      output.scrollTop = output.scrollHeight;
    });
  };

  const setInputBusy = (isBusy, label = "") => {
    input.disabled = isBusy;
    input.placeholder = label;
  };

  const runBoot = () => {
    if (booted) return;
    booted = true;
    [
      "CloudEver Team",
      "type `help` to list commands",
    ].forEach((line, index) => {
      window.setTimeout(() => appendLine(line, index === 1 ? "warn" : ""), index * 260);
    });
  };

  const normalizePath = (target) => {
    const rawPath = target.startsWith("/") ? target : `${currentDirectory}/${target}`;
    const parts = rawPath.split("/").filter(Boolean);
    const stack = [];

    parts.forEach((part) => {
      if (part === ".") return;
      if (part === "..") {
        stack.pop();
        return;
      }
      stack.push(part);
    });

    return `/${stack.join("/")}`.replace(/\/$/, "") || "/";
  };

  const resolveAsset = (path) => new URL(path, document.baseURI).href;

  const loadV86Script = () => {
    if (window.V86) return Promise.resolve();
    if (window.__cloudEverV86Loader) return window.__cloudEverV86Loader;

    window.__cloudEverV86Loader = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = resolveAsset(v86Assets.script);
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("failed to load local v86 runtime"));
      document.head.appendChild(script);
    });

    return window.__cloudEverV86Loader;
  };

  const linuxState = {
    emulator: null,
    booting: false,
    ready: false,
    silent: false,
    serialBuffer: "",
    promptWaiters: [],
  };

  const isLinuxPrompt = () => /(?:^|\n)[^\n]*(?:[%#$] )$/.test(linuxState.serialBuffer.slice(-240));

  const flushPromptWaiters = () => {
    if (!isLinuxPrompt()) return;
    const waiters = linuxState.promptWaiters.splice(0);
    waiters.forEach((waiter) => {
      window.clearTimeout(waiter.timeout);
      waiter.resolve();
    });
  };

  const waitForLinuxPrompt = (timeout = 90000) =>
    new Promise((resolve, reject) => {
      const waiter = {
        resolve,
        reject,
        timeout: window.setTimeout(() => {
          linuxState.promptWaiters = linuxState.promptWaiters.filter((item) => item !== waiter);
          reject(new Error("Linux boot timed out before the shell prompt appeared"));
        }, timeout),
      };

      linuxState.promptWaiters.push(waiter);
      flushPromptWaiters();
    });

  const sendLinuxCommand = async (command, timeout, options = {}) => {
    const wasSilent = linuxState.silent;
    linuxState.serialBuffer = "";
    linuxState.silent = Boolean(options.silent);

    try {
      linuxState.emulator.serial0_send(`${command}\n`);
      await waitForLinuxPrompt(timeout);
    } finally {
      linuxState.silent = wasSilent;
      streamLine = null;
      ansiSkipMode = "";
    }
  };

  const destroyLinux = async () => {
    terminalMode = "shell";
    linuxState.ready = false;
    linuxState.booting = false;
    linuxState.serialBuffer = "";
    linuxState.promptWaiters.splice(0).forEach((waiter) => {
      window.clearTimeout(waiter.timeout);
      waiter.reject?.(new Error("Linux session closed"));
    });

    if (!linuxState.emulator) return;

    const emulator = linuxState.emulator;
    linuxState.emulator = null;
    try {
      await emulator.stop?.();
      await emulator.destroy?.();
    } catch (error) {
      console.warn("Failed to destroy v86 session", error);
    }
  };

  const escapeSingleQuotedShell = (text) => text.replace(/'/g, "'\\''");

  const runInitAnimation = (line) => {
    const frames = ["[          ]", "[=         ]", "[===       ]", "[=====     ]", "[=======   ]", "[========= ]", "[==========]"];
    let frame = 0;

    line.classList.add("boot");
    line.textContent = `linux init ${frames[0]}`;

    return window.setInterval(() => {
      frame = (frame + 1) % frames.length;
      line.textContent = `linux init ${frames[frame]}`;
    }, 150);
  };

  const startLinux = async () => {
    if (linuxState.booting) {
      appendLine("linux: boot already in progress", "warn");
      return;
    }

    if (linuxState.ready && linuxState.emulator) {
      terminalMode = "linux";
      appendLine("linux: already running, serial console attached", "ok");
      return;
    }

    linuxState.booting = true;
    setInputBusy(true, "booting wasm linux");

    const statusLine = document.createElement("div");
    statusLine.className = "terminal-line boot";
    output.appendChild(statusLine);
    output.scrollTop = output.scrollHeight;
    const initTimer = runInitAnimation(statusLine);

    try {
      if (window.location.protocol === "file:") {
        throw new Error("open this page through http:// or https:// to boot local wasm assets");
      }

      await loadV86Script();
      statusLine.textContent = "linux init [core loaded]";

      if (!window.V86) {
        throw new Error("local v86 runtime did not expose V86");
      }

      const emulator = new window.V86({
        wasm_path: resolveAsset(v86Assets.wasm),
        bios: { url: resolveAsset(v86Assets.bios) },
        vga_bios: { url: resolveAsset(v86Assets.vgaBios) },
        bzimage: {
          url: resolveAsset(v86Assets.kernel),
          async: false,
        },
        filesystem: {},
        memory_size: 64 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        cmdline: "tsc=reliable mitigations=off random.trust_cpu=on console=ttyS0",
        autostart: true,
        disable_keyboard: true,
        disable_mouse: true,
        disable_speaker: true,
      });

      linuxState.emulator = emulator;
      linuxState.serialBuffer = "";

      emulator.add_listener("serial0-output-byte", (byte) => {
        const character = String.fromCharCode(byte);
        if (character !== "\r") {
          linuxState.serialBuffer = (linuxState.serialBuffer + character).slice(-8192);
        }
        if (!linuxState.silent) {
          appendStream(character);
        }
        flushPromptWaiters();
      });

      statusLine.textContent = "linux init [kernel loading]";
      await waitForLinuxPrompt();
      statusLine.textContent = "linux init [planting /flag]";
      await sendLinuxCommand(`printf '%s\\n' '${escapeSingleQuotedShell(flag)}' > /flag`, 20000, { silent: true });

      terminalMode = "linux";
      linuxState.ready = true;
      statusLine.textContent = "linux init [ready]";
      appendLine("CloudEver wasm-linux ready. Try `cat /flag` or `exit-linux`.", "ok");
      linuxState.serialBuffer = "";
      emulator.serial0_send("\n");
    } catch (error) {
      await destroyLinux();
      statusLine.textContent = "linux init [failed]";
      appendLine(`linux: ${error.message}`, "warn");
      appendLine("CloudEver shell is still available.", "warn");
    } finally {
      window.clearInterval(initTimer);
      linuxState.booting = false;
      setInputBusy(false);
      input.focus();
    }
  };

  const respond = async (command) => {
    if (terminalMode === "linux") {
      if (command === "exit-linux") {
        await destroyLinux();
        appendLine("returned to CloudEver shell", "ok");
        return;
      }

      if (!linuxState.emulator) {
        terminalMode = "shell";
        appendLine("linux: serial console is not attached", "warn");
        return;
      }

      linuxState.emulator.serial0_send(`${command}\n`);
      return;
    }

    if (command === "clear") {
      output.replaceChildren();
      return;
    }

    if (command === "help") {
      appendLine("commands: help, ls, pwd, cd, cat /flag, whoami, uname, linux, clear");
      return;
    }

    if (command === "pwd") {
      appendLine(currentDirectory);
      return;
    }

    if (command === "cd" || command.startsWith("cd ")) {
      const target = command.slice(2).trim() || "/";
      const nextDirectory = normalizePath(target);
      if (!hasDirectory(nextDirectory)) {
        appendLine(`cd: ${target}: No such file or directory`, "warn");
        return;
      }
      currentDirectory = nextDirectory;
      appendLine(currentDirectory);
      return;
    }

    if (command === "ls" || command.startsWith("ls ")) {
      const target = command.slice(2).trim() || currentDirectory;
      const path = normalizePath(target);
      if (hasDirectory(path)) {
        appendLine(fileSystem[path].join("  ") || ".");
        return;
      }
      if (path === "/flag") {
        appendLine("/flag");
        return;
      }
      appendLine(`ls: cannot access '${target}': No such file or directory`, "warn");
      return;
    }

    if (command === "cat" || command.startsWith("cat ")) {
      const target = command.slice(3).trim();
      if (!target) {
        appendLine("cat: missing file operand", "warn");
        return;
      }
      if (normalizePath(target) === "/flag") {
        appendLine(flag, "warn");
        return;
      }
      appendLine(`cat: ${target}: No such file or directory`, "warn");
      return;
    }

    if (command === "whoami") {
      appendLine("guest");
      return;
    }

    if (command === "uname" || command === "uname -a") {
      appendLine("CloudEver static shell 0.1.0");
      return;
    }

    if (command === "linux") {
      await startLinux();
      return;
    }

    appendLine(`command not found: ${command || "(empty)"}`, "warn");
  };

  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const command = input.value.trim();
      if (terminalMode === "shell") {
        appendLine(`$ ${command}`, "command");
      }
      if (command) {
        history.push(command);
        historyIndex = history.length;
      }
      input.value = "";
      await respond(command);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || "";
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || "";
    }
  });

  if (hero) {
    hero.addEventListener("hero-hud-ready", runBoot, { once: true });
    if (hero.classList.contains("is-hud-ready")) runBoot();
  } else {
    runBoot();
  }
}

function setupDraggableHud() {
  const panels = document.querySelectorAll("[data-hud-drag]");
  if (panels.length === 0) return;

  panels.forEach((panel) => {
    const handle = panel.querySelector(".hud-topline");
    if (!handle) return;

    const state = {
      x: 0,
      y: 0,
      pointerX: 0,
      pointerY: 0,
      startX: 0,
      startY: 0,
      dragging: false,
    };

    const applyPosition = () => {
      panel.style.setProperty("--hud-drag-x", `${state.x}px`);
      panel.style.setProperty("--hud-drag-y", `${state.y}px`);
    };

    applyPosition();

    handle.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      state.dragging = true;
      state.pointerX = event.clientX;
      state.pointerY = event.clientY;
      state.startX = state.x;
      state.startY = state.y;
      panel.classList.add("is-dragging");
      handle.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    handle.addEventListener("pointermove", (event) => {
      if (!state.dragging) return;

      state.x = state.startX + event.clientX - state.pointerX;
      state.y = state.startY + event.clientY - state.pointerY;
      applyPosition();
    });

    const stopDragging = (event) => {
      if (!state.dragging) return;

      state.dragging = false;
      panel.classList.remove("is-dragging");
      if (handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
    };

    handle.addEventListener("pointerup", stopDragging);
    handle.addEventListener("pointercancel", stopDragging);
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
  setupHeroIntro();
  setupAsciiOrbit();
  setupTerminal();
  setupDraggableHud();
  setupNavigation();
  setupJoinModal();
  setupReveal();
  setupButtonPress();
});
