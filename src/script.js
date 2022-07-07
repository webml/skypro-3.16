const loader = document.querySelector(".loader");
const message = document.querySelector(".message");

const form = document.querySelector('.form');
const input = form.querySelector('.input');
const formBtn = form.querySelector('.btn');

const API = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=";
const TYPE = "&lang=ru-ru&text=";
const PARAM = "&ui=ru";

const API_KEY =
  "dict.1.1.20220707T181750Z.88bfaaf75fa7a0c3.fda466622dbdc508dcc0b2eee197c5fd7fca1043";

document.addEventListener("DOMContentLoaded", (event) => {
  loader.classList.add("loader_none");
  form.classList.remove("form_none");
});

const wordRequest = () => {
  const request = new XMLHttpRequest();
  const apiRequest = API + API_KEY + TYPE + input.value + PARAM;
  request.open("GET", apiRequest);
  request.send();
  request.onload = function () {

    if (request.status === 404) {
      message.textContent = "Проблемы на сервере";
    } else {
      const data = JSON.parse(request.response);
      showMessage(data);
    }

    loader.classList.add("loader_none");
  };
};

const showMessage = (data) => {
   if (data.def.length === 0) {
     message.textContent = "Такого слова нет";
     return;
   } else {
     message.textContent = "Такое слово есть";
   }
}

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  message.innerHTML = "";
  formBtn.setAttribute("disable", "disable");
  loader.classList.remove("loader_none");
  wordRequest();
})

