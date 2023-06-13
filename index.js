const BODY_FIXED_CLASSNAME = "body_fixed";
const POPUP_ADD_POST_OPEN_CLASSNAME = "js-popup-open";
const TEXT_COLOR_RED_CLASSNAME = "color-red";

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

const postTitleLength = postTitleInputNode.value.length;
const postDscrptLength = postDscrptInputNode.value.length;
const postTitleValue = postTitleInputNode.value;
const postDscrptValue = postDscrptInputNode.value;
const currentDate = getDate();

let posts = [];
let postTitleFromUser = "";
let postDscrptFromUser = "";


popupAddPostBtnOpenLgNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnOpenLgNode.addEventListener("click", focusInput);
popupAddPostBtnOpenSmNode.addEventListener("click", focusInput);
popupAddPostBtnOpenSmNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", toggleClassNamePopup);
popupAddPostBtnCloseNode.addEventListener("click", clearInput);
publishBtnNode.addEventListener("click", publishPost);
postTitleInputNode.addEventListener("input", updateCharCountTitle);
postDscrptInputNode.addEventListener("input", updateCharCountDscrpt);
postDscrptInputNode.addEventListener("keydown", handlerKeyDown);
postTitleInputNode.addEventListener("keydown", handlerKeyDown);

function toggleClassNamePopup() {
  popupAddPostNode.classList.toggle(POPUP_ADD_POST_OPEN_CLASSNAME);
  bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
}

popupAddPostNode.addEventListener("click", (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    clearInput();
    toggleClassNamePopup();
  }
});

function publishPost() {
  const postFromUser = getPostFrormUser();
  const isValid = validate(
    postTitleLength,
    postDscrptLength,
    postTitleFromUser,
    postDscrptFromUser
  );
  if (!isValid) {
    return;
  }

  setPost(postFromUser);
  renderPost();
  clearInput();
  toggleClassNamePopup();
}

function validate(
  postTitleLength,
  postDscrptLength,
  postTitleFromUser,
  postDscrptFromUser
) {
  if (!postTitleFromUser || !postDscrptFromUser) {
    return false;
  }

  if (postTitleLength > 40 || postDscrptLength > 280) {
    return false;
  }

  if (postTitleFromUser.trim() || postDscrptFromUser.trim()) {
    return false;
  }

  return true;
}

function focusInput() {
  const inputField = postTitleInputNode;
  inputField.focus();

  if (inputField.value !== "") {
    return;
  }

  setTimeout(focusInput, 100);
}

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

function handlerKeyDown(event) {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;

  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();

  if (isMobile || event.ctrlKey) {
    insertLineBreakTitle(event.target);
  } else {
    publishPost();
  }
}

function insertLineBreakDscrpt() {
  const { selectionStart, selectionEnd, value } = postDscrptInputNode;
  const lineBreak = "\n";
  const newValue = value.slice(0, selectionStart) + lineBreak + value.slice(selectionEnd);

  postDscrptInputNode.value = newValue;

  postDscrptInputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
}

function insertLineBreakTitle(input) {
  if (input !== postDscrptInputNode) {
    return;
  }

  const { selectionStart, selectionEnd, value } = postDscrptInputNode;
  const lineBreak = "\n";
  const newValue = value.slice(0, selectionStart) + lineBreak + value.slice(selectionEnd);

  postDscrptInputNode.value = newValue;
  postDscrptInputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
}

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
};

function getDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = new Intl.DateTimeFormat('default', { month: 'long' }).format(currentDate);
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const formattedDate = `${day} ${month} ${year} | ${time}`;

  return formattedDate;
}

function renderPost() {
  let postsListHTML = "";

  posts.push({
    postTitleFromUser: postTitleFromUser,
    postDscrptFromUser: postDscrptFromUser,
    currentDate: currentDate,
  });

  posts.forEach((post) => {
    const { postTitleFromUser, postDscrptFromUser, currentDate, } = post;
    const formattedPostDscrpt = postDscrptFromUser.replace(/\n/g, "<br>");
    const formattedPostTitle = postTitleFromUser.replace(/\n/g, "<br>");

    postsListHTML += `<li class="post-item"><h3 class="post-title">${formattedPostTitle}</h3><p class="post-text">${formattedPostDscrpt}</p><p class="current-date">${currentDate}</p></li>`;
  });

  postsListNode.innerHTML = `<ul class="posts-list">${postsListHTML}</ul>`;
};




