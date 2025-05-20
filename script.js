let coolDance = true;

function toggleRainbow() {
    document.getElementById("body").classList.toggle("rainbow-bg");
}

function changeCoolDance() {
    if (coolDance) {
        document.querySelector('img[src="dancin.gif"]').src = "tetya_dancin.gif";
    } else {
        document.querySelector('img[src="tetya_dancin.gif"]').src = "dancin.gif";
    }
    coolDance = !coolDance;
}

const doritosURL = "https://i.ibb.co/B2TtrKyy/image.png";
const dropSound = document.getElementById("dropSound");

function spawnDorito() {
    const dorito = document.createElement("img");
    dorito.src = doritosURL;
    dorito.className = "doritos";
    dorito.style.left = Math.random() * window.innerWidth + "px";
    dorito.style.animationDuration = 2 + Math.random() * 3 + "s";

    dorito.addEventListener("animationend", () => {
        dropSound.currentTime = 0;
        dropSound.play();
        dorito.remove();
    });
    const audio = new Audio("https://www.myinstants.com/media/sounds/mlg-airhorn.mp3");
    audio.play();
    document.body.appendChild(dorito);
}
function startRain() {
    setInterval(spawnDorito, 300);
}
