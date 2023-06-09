//Константы для текстовых значений

const BODY_FIXED_CLASSNAME = "body_fixed";
const POPUP_ADD_POST_OPEN_CLASSNAME = "js-popup-open";
const TEXT_COLOR_RED_CLASSNAME = "color-red";

//Константы для элементов из html

const bodyNode = document.querySelector("body");

const popupAddPostBtnOpenLgNode = document.getElementById(
  "add-post-btn-open-lg"
);
const popupAddPostBtnOpenSmNode = document.getElementById(
  "add-post-btn-open-sm"
);
const popupAddPostBtnCloseNode = document.getElementById("add-post-btn-close");
const popupAddPostNode = document.getElementById("popup-add-post");
const popupContentNode = document.getElementById("popup-add-post-content");
const postTitleInputNode = document.getElementById("post-title-input");
const postDscrptInputNode = document.getElementById("post-dscrpt-input");
const publishBtnNode = document.getElementById("publish-btn");
const postsListNode = document.getElementById("posts-list-wrap");
const counterPostTitleNode = document.getElementById("post-title-current");
const counterPostDscrptNode = document.getElementById("post-dscrpt-current");

//Переменные

let posts = [];
let postTitleFromUser = "";
let postDscrptFromUser = "";

//Открытие и закрытие попапа

popupAddPostBtnOpenLgNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnOpenLgNode.addEventListener("click", focusInput);
popupAddPostBtnOpenSmNode.addEventListener("click", focusInput);
popupAddPostBtnOpenSmNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", clearInput);

function toggleClassNamePopup() {
  popupAddPostNode.classList.toggle(POPUP_ADD_POST_OPEN_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

//Закрытие попапа вне поля контента

popupAddPostNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    clearInput();
    toggleClassNamePopup();
  }
});

//Накидываем обработчик на кнопку опубликовать

publishBtnNode.addEventListener("click", publishPost);

function publishPost() {
  // получить данные из инпутов
  const postFromUser = getPostFrormUser();
  const postTitleLength = postTitleInputNode.value.length;
  const postDscrptLength = postDscrptInputNode.value.length;

  // проверка на наличие значение в инпутах
  if (!postTitleFromUser || !postDscrptFromUser) {
    return;
  }

  if (postTitleLength > 40 || postDscrptLength > 280) {
    return;
  }

  // validate(postTitleLength, postDscrptLength, postTitleValue, postDscrptValue);

  // сохранить пост
  setPost(postFromUser);

  // отобразить пост
  renderPost();

  // очистить поля ввода
  clearInput();

  //закрываем попап
  toggleClassNamePopup();
}

function focusInput() {
  const inputField = postTitleInputNode;
  inputField.focus();

  if (inputField.value !== '') {
    return;
  }

  setTimeout(focusInput, 500);
}

const postTitleLength = postTitleInputNode.value.length;
const postDscrptLength = postDscrptInputNode.value.length;
const postTitleValue = postTitleInputNode.value;
const postDscrptValue = postDscrptInputNode.value;

//Делаем счетчики знаков в инпутах
postTitleInputNode.addEventListener("input", updateCharCountTitle);

function updateCharCountTitle() {
  const maxCharCount = 40;
  const currentText = postTitleInputNode.value;
  const remainingChars = maxCharCount - currentText.length;

  counterPostTitleNode.textContent = remainingChars;

  if (remainingChars < 0) {
    counterPostTitleNode.classList.add(TEXT_COLOR_RED_CLASSNAME);
  } else if (remainingChars >= 0) {
    counterPostTitleNode.classList.remove(TEXT_COLOR_RED_CLASSNAME);
  }
}

postDscrptInputNode.addEventListener("input", updateCharCountDscrpt);

function updateCharCountDscrpt() {
  const maxCharCount = 280;
  const currentText = postDscrptInputNode.value;
  const remainingChars = maxCharCount - currentText.length;

  counterPostDscrptNode.textContent = remainingChars;

  if (remainingChars < 0) {
    counterPostDscrptNode.classList.add(TEXT_COLOR_RED_CLASSNAME);
  } else if (remainingChars >= 0) {
    counterPostDscrptNode.classList.remove(TEXT_COLOR_RED_CLASSNAME);
  }
}

//Перенос строки при нажатии контрл+ентер и публикация при нажатии ентер

// Добавляем обработчик события keydown на поле ввода описания поста
postDscrptInputNode.addEventListener("keydown", handlerKeyDown);

// Обработчик события keydown
function handlerKeyDown(event) {
  // Проверяем, была ли нажата клавиша Enter и клавиша Ctrl
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    insertLineBreakDscrpt(); // Вставляем символ новой строки
  } else if (event.key === "Enter") {
    event.preventDefault();
    publishPost(); // Публикуем пост
  }
}

// function qwerty() {
//   if (window.innerWidth < 601) {
//     keyDownEnter.preventDefault();
//     insertLineBreakDscrpt();
//   }
//   return;
// }

// function qwerty(event) {
//   if (window.innerWidth < 601) {
//     event.stopPropagation()
//   }
//   return;
// }

//Пытаюсь отминить действие кнопки ентер (публикация по клику),
//при ширине экрана телефона от 600px и меньше

myFunction(); // Вызов функции прослушивателя во время выполнения
media.addEventListener('keyup', myFunction); // Прикрепить функцию прослушивателя при изменении состояния

let media = window.matchMedia("(max-width: 600px)");

function myFunction(media, event) {
  if (media.matches && event.key === "Enter") { // Если медиа запрос совпадает
    event.preventDefault();
    insertLineBreakDscrpt();
  }
  return;
}

// console.log(myFunction(media));

postTitleInputNode.addEventListener("keydown", keyDownEnter);

function keyDownEnter(event) {
  if (event.key === "Enter" && event.ctrlKey) {
    event.preventDefault();
    insertLineBreakTitle();
  } else if (event.key === "Enter") {
    event.preventDefault();
    publishPost();
  }
}

// Функция для вставки символа новой строки в поле основного текста поста
function insertLineBreakDscrpt() {
  const { selectionStart, selectionEnd, value } = postDscrptInputNode;
  // Разбиваем объект postDscrptInputNode на отдельные переменные
  // selectionStart - позиция начала выделенного текста
  // selectionEnd - позиция конца выделенного текста
  // value - значение текста в поле ввода

  const lineBreak = "\n"; // Создаем переменную lineBreak, которая содержит символ новой строки

  // Создаем новую строку newValue, объединяя три части
  // 1 Строка до начала выделенного текста
  // 2 Символ новой строки
  // 3 Строка после выделенного текста
  const newValue =
    value.slice(0, selectionStart) + lineBreak + value.slice(selectionEnd);

  postDscrptInputNode.value = newValue; // Устанавливаем новое значение текста в поле ввода

  // Устанавливаем позицию курсора на одну позицию после символа новой строки,
  // чтобы курсор перешел на новую строку
  postDscrptInputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
}

function insertLineBreakTitle() {
  const { selectionStart, selectionEnd, value } = postTitleInputNode;
  const lineBreak = "\n";
  const newValue =
    value.slice(0, selectionStart) + lineBreak + value.slice(selectionEnd);

  postTitleInputNode.value = newValue;
  postTitleInputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
}

//Получаем значения из инпутов
function getPostFrormUser() {
  postTitleFromUser = postTitleInputNode.value;
  postDscrptFromUser = postDscrptInputNode.value;
}

function setPost(newPost) {
  const post = newPost;
}

function clearInput() {
  postTitleInputNode.value = "";
  postDscrptInputNode.value = "";
  counterPostTitleNode.textContent = "40";
  counterPostDscrptNode.textContent = "280";
}

function renderPost() {
  let postsListHTML = "";

  // Добавляем новый пост в массив posts
  posts.push({
    postTitleFromUser: postTitleFromUser,
    postDscrptFromUser: postDscrptFromUser,
  });

  // Проходимся по каждому посту в массиве posts
  posts.forEach((post) => {
    const { postTitleFromUser, postDscrptFromUser } = post;

    // Заменяем символы новой строки на <br> в описании поста
    const formattedPostDscrpt = postDscrptFromUser.replace(/\n/g, "<br>");
    const formattedPostTitle = postTitleFromUser.replace(/\n/g, "<br>");

    // Формируем HTML-код для каждого поста и добавляем его в переменную postsListHTML
    postsListHTML += `<li class="post-item"><h3 class="post-title">${formattedPostTitle}</h3><p class="post-text">${formattedPostDscrpt}</p></li>`;
  });

  // Вставляем сформированный HTML-код в элемент с идентификатором postsListNode
  postsListNode.innerHTML = `<ul class="posts-list">${postsListHTML}</ul>`;
}

// function warning() {

// }
