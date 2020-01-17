import { News } from '../data/data.js';

document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("resize", updateNews);

  const listNews = document.querySelector('.list-news');
  let newsListCurrentLength = undefined;

  function updateNews() {
    const clientWidth = document.body.clientWidth;
    let innerHTML = '';
    let newsListLength = undefined;

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

});