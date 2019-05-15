const container = document.querySelector('.container');
const swipe_container = document.querySelector('.swipe-container');
const items = document.querySelectorAll('.item');
const items_length = items.length;

let touchXstart = 0;
let touchXend = 0;
let touchYstart = 0;
let touchYend = 0;
let items_count = 1;
let isSwipe = false;

function build() {
  items.forEach(el => {
    el.style.width = `${container.clientWidth / items_count}px`;
  });
  swipe_container.style.width = `${items[0].clientWidth * items_length}px`;
}

function preventDefaultHandler(event) {
  event.preventDefault();
};

function touchStart(event) {
  swipe_container.style.transition = '0s';
  touchXstart = event.changedTouches[0].clientX;
  touchYstart = event.changedTouches[0].clientY;
}

function touchMove(event) {
  const moveX = event.changedTouches[0].clientX;
  const moveY = event.changedTouches[0].clientY;

  if (Math.abs(moveX - touchXstart) > Math.abs(moveY - touchYstart)) {
    window.addEventListener('DOMMouseScroll', preventDefaultHandler(event), false);
    swipe_container.style.transform = `translateX(${touchXend + moveX}px)`;
    isSwipe = true;
  } else if (!isSwipe) {
    isSwipe = false;
    return;
  }
  if (isSwipe) {
    window.addEventListener('DOMMouseScroll', preventDefaultHandler(event), false);
  }
}

function touchEnd(event) {
  swipe_container.style.transition = '0.5s';
  touchXend = event.changedTouches[0].clientX;
  isSwipe = false;
}

build();

document.addEventListener('touchstart', touchStart, false);
container.addEventListener('touchmove', touchMove, false);
document.addEventListener('touchend', touchEnd, false);
