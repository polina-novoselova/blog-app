//Константы для текстовых значений

const BODY_FIXED_CLASSNAME = "body_fixed";
const POPUP_ADD_POST_OPEN_CLASSNAME = "js-popup-open";

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

//Переменные

let posts = [];
let postTitle = "";
let postDscrpt = "";

//Открытие и закрытие попапа

popupAddPostBtnOpenLgNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnOpenSmNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", toggleClassNamePopup);

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
    toggleClassNamePopup();
  }
});

//Накидываем обработчик на кнопку опубликовать

publishBtnNode.addEventListener("click", publishPost);

function publishPost() {
  // получить данные из инпутов
  const postFromUser = getPostFrormUser();

  // сохранить пост
  setPost(postFromUser);

  // отобразить пост
  renderPost();

  // очистить поля ввода
  clearInput();
};

function getPostFrormUser() {
  const post = postTitle;
  postTitle = postTitleInputNode.value;
  postDscrpt = postDscrptInputNode.value;

  return post;
};

function setPost(newPost) {
  post = newPost;
};

function clearInput() {
  postTitleInputNode.value = "";
  postDscrptInputNode.value = "";
};

function renderPost() {
  let postsListHTML = "";

  posts.push({
    postTitle: postTitle,
    postDscrpt: postDscrpt,
  });

  posts.forEach((post) => {
    const {postTitle, postDscrpt} = post;
    postsListHTML += `<li class="post-item"><h3 class="post-title">${postTitle}</h3><p class="post-text"> ${postDscrpt}</p></li>`;
  });

  postsListNode.innerHTML = `<ul class="posts-list">${postsListHTML}</ul>`;
};
