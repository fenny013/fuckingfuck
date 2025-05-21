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
const leetMap = {
    'a': '@', 'b': '8', 'c': 'c', 'd': 'd', 'e': '3',
    'f': 'f', 'g': '9', 'h': 'h', 'i': '1', 'j': 'j',
    'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'o': '0',
    'p': 'p', 'q': 'q', 'r': 'r', 's': '5', 't': '7',
    'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': '2',

    'а': '@', 'б': '6', 'в': 'B', 'г': 'r', 'д': 'd',
    'е': '3', 'ё': '3', 'ж': 'x', 'з': '3', 'и': 'n',
    'й': 'n\'', 'к': 'k', 'л': 'n', 'м': 'm', 'н': 'H',
    'о': '0', 'п': 'n', 'р': 'p', 'с': 'c', 'т': '7',
    'у': 'y', 'ф': 'f', 'х': 'x', 'ц': 'u', 'ч': '4',
    'ш': 'w', 'щ': 'w\'', 'ъ': 'b', 'ы': 'bl', 'ь': 'b',
    'э': 'e', 'ю': '10', 'я': '9'
};


function convertToLeet(inputElem) {
    const raw = inputElem.value;
    let result = '';
    for (let ch of raw.toLowerCase()) {
        result += leetMap[ch] || ch;
    }
    inputElem.value = result;
}
