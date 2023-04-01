//создаем функцию, которая будет осуществлять запрос
function useRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };

  xhr.send();
}

// ищем ноду для вставки результата запроса
const resultNode = document.querySelector(".answer");

//ищем кнопку при нажатии на которую будет запрос
const btnNode = document.querySelector("button");

//функция сборки картинок и вставки в див
function displayResult(apiData) {
  let imgs = "";
  apiData.forEach((item) => {
    const imgBloc = `<div class='img'>
    <img src="${item.download_url}" class="answer__image"/>
    <p>${item.author}</p>
    </div>`;
    imgs = imgs + imgBloc;
  });
  resultNode.innerHTML = imgs;
}

//вешаем обработчик на кнопку и проверяем условия
btnNode.addEventListener("click", () => {
  const value = document.querySelector("input").value;
  let attention = document.querySelector(".attention");

  if (value < 1 || value > 10) {
    attention.innerText = "Введите число от 1 до 10";
  } else if (isNaN(value)) {
    attention.innerText = "Введите число от 1 до 10";
  } else {
    attention.innerText = "";
    let image = document.querySelector(".img");

    useRequest("https://picsum.photos/v2/list?limit=" + value, displayResult);
  }
});
