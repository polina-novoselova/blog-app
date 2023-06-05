//Константы для текстовых значений

const BODY_FIXED_CLASSNAME = "body_fixed";
const POPUP_ADD_POST_OPEN_CLASSNAME = "js-popup-open";

//Константы для элементов из html

const bodyNode = document.querySelector("body");

const popupAddPostBtnOpenLgNode = document.getElementById("add-post-btn-open-lg");
const popupAddPostBtnOpenSmNode = document.getElementById("add-post-btn-open-sm");
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
popupAddPostBtnOpenSmNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", clearInput);

function toggleClassNamePopup() {
  popupAddPostNode.classList.toggle(POPUP_ADD_POST_OPEN_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
};

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

  //проверка на наличие значение в инпутах
  if (postTitleFromUser === "" || postDscrptFromUser === "") {
        return;
  };

  // сохранить пост
  setPost(postFromUser);

  // отобразить пост
  renderPost();

  // очистить поля ввода
  clearInput();

  //закрываем попап
  toggleClassNamePopup();
};

//Делаем счетчики знаков в инпутах
postTitleInputNode.addEventListener('input', onInputTitle);

function onInputTitle(event) {
  const length = event.target.value.length;

  counterPostTitleNode.textContent = length;
};

postDscrptInputNode.addEventListener('input', onInputDscrpt);

function onInputDscrpt(event) {
  const length = event.target.value.length;

  counterPostDscrptNode.textContent = length;
};

//Опубликовать по нажатию на ентер
postDscrptInputNode.addEventListener('keydown', publishPostOnEnter);

function publishPostOnEnter(event) {
  if (event.code === 'Enter') {
    publishBtnNode.click();
  }
};

//Получаем значения из инпутов
function getPostFrormUser() {
  const post = postTitleFromUser;
  postTitleFromUser = postTitleInputNode.value;
  postDscrptFromUser = postDscrptInputNode.value;

  return post;
};

function setPost(newPost) {
  const post = newPost;
};

function clearInput() {
  postTitleInputNode.value = "";
  postDscrptInputNode.value = "";
  counterPostTitleNode.textContent = "0";
  counterPostDscrptNode.textContent = "0";
};

function renderPost() {
  let postsListHTML = "";

  posts.push({
    postTitleFromUser: postTitleFromUser,
    postDscrptFromUser: postDscrptFromUser,
  });

  posts.forEach((post) => {
    const {postTitleFromUser, postDscrptFromUser} = post;
    postsListHTML += `<li class="post-item"><h3 class="post-title">${postTitleFromUser}</h3><p class="post-text"> ${postDscrptFromUser}</p></li>`;
  });

  postsListNode.innerHTML = `<ul class="posts-list">${postsListHTML}</ul>`;
};
