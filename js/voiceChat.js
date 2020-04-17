// objetos del DOM
const imputArea = document.querySelector(".msger-inputarea");
const formImput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");
const startButtom = document.querySelector("#startButtom");
const startRow = document.querySelector("#startRow");
const recordButtom = document.querySelector("#recordButtom");

// respuestas del bot
const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
];

// iconos
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "User";

// objeto de reconocimiento de voz
var recognitionObject = new webkitSpeechRecognition();
// seleccionamos el lenguage
recognitionObject.lang = "es-ES";
// definimos si queremos que grabe continuamente
recognitionObject.continuous = true;
// definimos si queremos que nos devuelva instataneamente los resultados
recognitionObject.interimResults = false;

// lanza mensaje de bienvenida
startButtom.addEventListener("click", () => {
    const msgText = "Bienvenido a VoiceChat, para comenzar dime tu nombre 😄";
    //   appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    botResponse(msgText);
    startRow.remove();
});

// inicio de grabación
recordButtom.addEventListener("click", (event) => {
    recognitionObject.start();
});

// detecta resultado de recognitionObject
recognitionObject.onresult = (event) => {
    var results = event.results;
    var msgText = results[results.length - 1][0].transcript;
    userMsg(msgText);
};

// detecta mensaje introducido por el usuario
imputArea.addEventListener("submit", (event) => {
    event.preventDefault();

    const msgText = formImput.value;
    if (!msgText) return;

    userMsg(msgText);
    formImput.value = "";
});

// añade mensaje al DOM
function appendMessage(name, img, side, msgText) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${msgText}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

// mensaje de bot
function botResponse(text = null) {
    let msgText;

    if (text) {
        msgText = text;
    } else {
        const r = random(0, BOT_MSGS.length - 1);
        msgText = BOT_MSGS[r];
    }

    const delay = msgText.split(" ").length * 100;

    // se define un tiempo de espera según la logitud el mensaje de respuesta
    setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
        speak(msgText);
    }, delay);
}

// mensaje de usuario
function userMsg(msgText) {
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    botResponse();
}

// lectura de mensaje
function speak(text) {
    var speechObject = new SpeechSynthesisUtterance();
    speechObject.volume = 1;
    speechObject.rate = 1;
    speechObject.pitch = 1;
    speechObject.text = text;

    window.speechSynthesis.speak(speechObject);
}

// formato de la fecha
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

// generación de número random en un intervalo
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
