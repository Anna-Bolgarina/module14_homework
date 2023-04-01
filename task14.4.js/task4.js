//ищем кнопку
const btn = document.querySelector("button");

//вешаем обработчик
btn.addEventListener("click", () => {
  const inputWidth = document.querySelector(".width").value;
  const inputHeight = document.querySelector(".height").value;
  const answer = document.querySelector(".answer");
  let attention = document.querySelector(".attention");

  //проверка данных
  if (
    inputWidth < 100 ||
    inputWidth > 300 ||
    inputHeight < 100 ||
    inputHeight > 300
  ) {
    attention.innerText = "Введите число от 100 до 300";
    answer.innerHTML = "";
  } else if (isNaN(inputWidth) || isNaN(inputHeight)) {
    attention.innerText = "Введите число от 100 до 300";
    answer.innerHTML = "";
  } else {
    const options = {
      method: "GET",
      mode: "cors",
    };

    //делаем запрос за данными
    fetch("https://picsum.photos/" + inputWidth + "/" + inputHeight, options)
      .then((response) => {
        const imgs = `<div>
          <img src="${response.url}"/></div>`;
        answer.innerHTML = imgs;
        attention.innerText = "";

        console.log("получаем response", response);
      })

      .then((data) => {
        console.log("Получаем data", data);
      })
      .catch(() => {
        console.log("Ошибка получения данных");
      });
  }
});
