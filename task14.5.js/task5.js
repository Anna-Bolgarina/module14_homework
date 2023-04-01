//объявляем переменные и ищем соответствующие ноды
const btn = document.querySelector("button");
const answer = document.querySelector(".answer");
const attention = document.querySelector(".attention");

//выводим последний успешно выполненный ответ
if (localStorage.hasOwnProperty("imgs")) {
  showAnswer();
}

// навешиваем обработчик на кнопку, ищем ноды инпутов и проверяем введенные значения
btn.addEventListener("click", async () => {
  const page = document.querySelector(".page").value;
  const limit = document.querySelector(".limit").value;

  if (
    (page < 1 || page > 10 || isNaN(page)) &&
    (limit < 1 || limit > 10 || isNaN(limit))
  ) {
    attention.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
    answer.innerHTML = "";
  } else if (page < 1 || page > 10 || isNaN(page)) {
    attention.innerHTML = "Номер страницы вне диапазона от 1 до 10";
    answer.innerHTML = "";
  } else if (limit < 1 || limit > 10 || isNaN(limit)) {
    attention.innerHTML = "Лимит вне диапазона от 1 до 10";
    answer.innerHTML = "";
  } else {
    await useRequest(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
  }
});

// запрос на сервер и обработка данных
const useRequest = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let imgsData = [];
      data.forEach((item) => {
        imgsData.push({
          imgSrc: item.download_url,
        });
      });
      localStorage.setItem("imgs", JSON.stringify(imgsData));
      showAnswer();
    })
    .catch((error) => {
      console.log("ошибка", error);
      answer.innerHTML = `Ошибка: ${error.message}`; // выводим сообщение об ошибке на экран
    });
};

// результат обработки запроса, создание блока ответа
function showAnswer() {
  let imgsBlock = "";
  const data = JSON.parse(localStorage.getItem("imgs"));

  data.forEach((item) => {
    const imgBlock = `<div>
                    <img class="imgsBlock" src="${item.imgSrc}"> </div>`;
    imgsBlock += imgBlock;
  });
  attention.innerHTML = "";
  answer.innerHTML = imgsBlock;
}
