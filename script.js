// ================= EDIT HERE =================
// 1) Change your friend's name in the first line.
// 2) Put your song's YouTube/Spotify link in SONG_LINK.
// 3) Replace the message with your own words.
// 4) Put your photos in /images using the exact names:
//    photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg

const FRIEND_NAME = "mariam";

const SONG_NAME = "Ana Bahebak";
const SONG_LINK = "https://youtu.be/Qv1kMv3pVgc?si=06BHQ9iwXKL2V2BR";

const MESSAGE = `Happy birthday to one of the most beautiful people
I was lucky enough to meet. 💗

I hope this new year brings you everything you've been
working for, and a thousand little reasons to smile.

Thank you for every laugh, every random conversation,
every memory, and every moment that made ordinary days
feel special.

No matter how many lines of code we write,
some things will never need debugging:
our friendship. ♡

Keep shining, keep dreaming, and never forget
how loved you are.

Happy Birthday, mariomtyy. 🎂✨`;

// ================= WEBSITE LOGIC =================

document.title = `Happy Birthday, ${FRIEND_NAME} 💗`;

document.querySelectorAll(".string").forEach(el => {
  if (el.textContent.includes("YOUR FRIEND")) el.textContent = `"${FRIEND_NAME}"`;
});

document.getElementById("songName").textContent = SONG_NAME;
document.getElementById("songLink").href = SONG_LINK;

const messageBox = document.getElementById("typedMessage");
let i = 0;
function typeMessage(){
  if(i < MESSAGE.length){
    messageBox.textContent += MESSAGE[i++];
    setTimeout(typeMessage, 22);
  }
}
const observer = new IntersectionObserver(entries => {
  if(entries[0].isIntersecting){
    typeMessage();
    observer.disconnect();
  }
},{threshold:.25});
observer.observe(messageBox);

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("surprise").scrollIntoView({behavior:"smooth"});
  burstHearts(18);
});

document.getElementById("heartBtn").addEventListener("click", () => {
  burstHearts(55);
  setTimeout(() => alert(`Happy Birthday, ${FRIEND_NAME}! 💗✨ Make your wish.`), 500);
});

function burstHearts(count){
  const container = document.getElementById("hearts");
  for(let n=0;n<count;n++){
    const h = document.createElement("div");
    h.className="heart";
    h.textContent = ["♥","♡","✦","✧"][Math.floor(Math.random()*4)];
    h.style.left = Math.random()*100+"vw";
    h.style.top = (65 + Math.random()*35)+"vh";
    h.style.fontSize = (12+Math.random()*22)+"px";
    h.style.animationDuration = (3+Math.random()*3)+"s";
    container.appendChild(h);
    setTimeout(()=>h.remove(),6500);
  }
}


// ================= PASSWORD GATE =================
// Both passwords must be entered correctly and in this exact order.
const PASSWORDS = ["20/10/2024", "26/9/2026"];
let passwordStep = 0;

const gate = document.getElementById("passwordGate");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordLabel = document.getElementById("passwordLabel");
const gateMessage = document.getElementById("gateMessage");
const gateCard = document.querySelector(".gate-card");
const passwordWrap = document.querySelector(".password-wrap");
const togglePassword = document.getElementById("togglePassword");
const stepOne = document.getElementById("step1");
const stepTwo = document.getElementById("step2");

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = passwordInput.value.trim();

  if (value === PASSWORDS[passwordStep]) {
    passwordWrap.classList.remove("error");
    gateMessage.className = "gate-message success";

    if (passwordStep === 0) {
      passwordStep = 1;
      stepOne.classList.remove("active");
      stepOne.classList.add("done");
      stepTwo.classList.add("active");
      passwordLabel.textContent = "Enter Secret Password #2";
      passwordInput.value = "";
      passwordInput.placeholder = "D/M/YYYY";
      gateMessage.textContent = "✓ First code accepted. One last lock remains... 🔓";
      passwordInput.focus();
    } else {
      gateMessage.textContent = "✓ Access granted. The celebration is loading... ✨";
      stepTwo.classList.add("done");
      stepTwo.classList.remove("active");
      setTimeout(() => {
        gate.classList.add("unlocked");
        document.body.classList.remove("locked");
        burstHearts(35);
      }, 650);
    }
  } else {
    passwordWrap.classList.add("error");
    gateCard.classList.remove("shake");
    void gateCard.offsetWidth;
    gateCard.classList.add("shake");
    gateMessage.className = "gate-message error";
    gateMessage.textContent = passwordStep === 0
      ? "⏳ لسه بدري... الاحتفال مبدأش! اتقلي 🎀"
      : "⏳  استني شوية... المفتاح الأول صح، بس  موصلتيش يارومي   . 🎀";
    passwordInput.select();
  }
});

togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.textContent = isPassword ? "🙈" : "👁";
  togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});

passwordInput.addEventListener("input", () => {
  passwordWrap.classList.remove("error");
  if (gateMessage.classList.contains("error")) {
    gateMessage.className = "gate-message";
    gateMessage.textContent = passwordStep === 0 ? "Hint: the order matters. 😉" : "Almost there... one last code. ✨";
  }
});
