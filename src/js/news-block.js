import { News } from '../data/data.js';

document.addEventListener("DOMContentLoaded", () => {
  let swiperMode
  let startX = undefined
  let newsListCurrentLength = undefined;

  const listNews = document.querySelector('.list-news');

  window.addEventListener("resize", updateNews);
  window.addEventListener('touchstart', touchStartHandler, false);
  window.addEventListener('touchmove', touchMoveHandler, false);
  window.addEventListener('touchend', touchEndHandler, false);

  function updateNews() {
    const clientWidth = document.body.clientWidth;
    let innerHTML = '';
    let newsListLength = undefined;

    swiperMode = (clientWidth < 768)
    if (clientWidth < 1200 && clientWidth > 1024) {
      newsListLength = 9;
    } else {
      newsListLength = 12;
    };

    if (newsListLength === newsListCurrentLength)
      return

    newsListCurrentLength = newsListLength;

    for (let i = 0; i < newsListCurrentLength; i++) {
      innerHTML += `
      <div class="list-news__item">
        <div class="item-news">
          <div class="item-news__img-wrapper">
            <div class="img" style="background-image: url(${News.numberNews[i].img})"></div>
          </div>
            <div class="item-news__cathegory">${News.numberNews[i].cathegory}</div>
            <div class="item-news__title">${News.numberNews[i].title}</div>
            <div class="item-news__text">${News.numberNews[i].text}</div>
            <div class="item-news__subscribe">${News.numberNews[i].subscribe}</div>
        </div>
      </div>
     `;
    };

    listNews.innerHTML = innerHTML;
  };

  updateNews();

  function swipeSlide(offset) {
    const listNewsClientRect = listNews.getBoundingClientRect()
    const newOffset = Math.max(Math.min(listNewsClientRect.left - offset, 0), -listNewsClientRect.width)
    listNews.style.left = newOffset + 'px';
  }

  function touchStartHandler(event) {
    if (!swiperMode)
      return
    startX = event.changedTouches[0].pageX;
  }

  function touchMoveHandler(event) {
    if (!swiperMode || startX === undefined)
      return
    const currentX = event.changedTouches[0].pageX
    const delta = startX - currentX
    if (delta < -100)
      swipeSlide(-document.body.clientWidth)
    else if (delta > 100)
      swipeSlide(document.body.clientWidth)
    else {
      swipeSlide(delta)
      return
    }
    startX = undefined
  }

  function touchEndHandler(event) {
    if (!swiperMode)
      return
    startX = undefined
  }
});