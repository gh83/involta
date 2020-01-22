import { News } from '../data/data.js'; //импорт новостей

document.addEventListener("DOMContentLoaded", () => {
  let swiperMode = false;//показ слайдера
  let swiperShowCount = 1;//количество колонок слайдера(1 или 2)
  let startX = undefined;//начальная точка касания в режиме свайпера
  let newsListCurrentLength = undefined; //количество отображаемых новостей
  let currentVisibleSlideIndex = 0; //текущее положение свайпера (номер новости)

  const listNewsWrapper = document.querySelector('.list-news-wrapper');
  const listNews = document.querySelector('.list-news');

  window.addEventListener("resize", updateNews);
  window.addEventListener("resize", () => moveSlide(0));
  window.addEventListener('touchstart', touchStartHandler, false);
  window.addEventListener('touchmove', touchMoveHandler, false);
  window.addEventListener('touchend', touchEndHandler, false);

  function updateNews() {
    const clientWidth = document.body.clientWidth;
    let innerHTML = '';
    let newsListLength = undefined;
    //вычисление количества колонок ноостей, переход в режим свайпера и количества колонок свайпера
    if (clientWidth < 768) {
      swiperMode = true
      swiperShowCount = 1
      newsListLength = 12;
    } else if (clientWidth < 1024) {
      swiperMode = true
      swiperShowCount = 2
      newsListLength = 12;
    } else if (clientWidth < 1200) {
      swiperMode = false
      newsListLength = 9;
    } else {
      swiperMode = false
      newsListLength = 12;
    };

    if (newsListLength === newsListCurrentLength)
      return

    newsListCurrentLength = newsListLength;
    //отображение новостей
    for (let i = 0; i < newsListCurrentLength; i++) {
      innerHTML += `
      <div class="list-news__item">
        <div class="item-news">
          <div class="item-news__img-wrapper">
            <div class="img" style="background-image: url(${News[i].img})"></div>
          </div>
            <div class="item-news__cathegory">${News[i].cathegory}</div>
            <div class="item-news__title">${News[i].title}</div>
            <div class="item-news__text">${News[i].text}</div>
            <div class="item-news__subscribe">${News[i].subscribe}</div>
        </div>
      </div>
     `;
    };

    listNews.innerHTML = innerHTML;
  };

  updateNews();
  //сдвиг слайдера. вычисляется координата текущей новости и лента новостей сдвигается 
  function moveSlide(offset) {
    const currentPagesCount = Math.round((currentVisibleSlideIndex - (swiperShowCount === 2 ? 2 : 0)) / swiperShowCount);
    const listNewsWrapperClientRect = listNewsWrapper.getBoundingClientRect();
    const listNewsClientRect = listNews.getBoundingClientRect();

    listNews.style.left = Math.max(Math.min(-currentPagesCount * listNewsWrapperClientRect.width + offset, 0), -listNewsClientRect.width) + 'px';
  };
  //следующие 3 функции: начало касания, длинна перемещения, отпускание касания
  function touchStartHandler(event) {
    if (!swiperMode)
      return
    startX = event.changedTouches[0].pageX;
  };

  function touchMoveHandler(event) {
    if (!swiperMode || startX === undefined)
      return
    const currentX = event.changedTouches[0].pageX
    const delta = currentX - startX;
    moveSlide(delta);
  };

  function touchEndHandler(event) {
    if (!swiperMode || startX === undefined)
      return
    const currentX = event.changedTouches[0].pageX;
    const delta = currentX - startX;
    //при перемещении более 100 пикселов , меняется номер текущего слайда(новости)
    if (Math.abs(delta) > 100) {
      currentVisibleSlideIndex = Math.min(Math.max(currentVisibleSlideIndex + (swiperShowCount * (delta < 0 ? 1 : -1)), 0), newsListCurrentLength - 1);
    }
    moveSlide(0);
  }
});

