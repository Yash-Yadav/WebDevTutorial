const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 5000; //time is in Millisecond
let slideInterval;

const nextSlide = () => {
  //Get Current Class
  const current = document.querySelector('.current');
  //Remove Current Class
  current.classList.remove('current');
  //Check for Next Slide
  if(current.nextElementSibling)
  {
    //Add current to next Sibling
    current.nextElementSibling.classList.add('current');
  }
  else
  {
    //Add current to start Slide
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  //Get Current Class
  const current = document.querySelector('.current');
  //Remove Current Class
  current.classList.remove('current');
  //Check for Previous Slide
  if(current.previousElementSibling)
  {
    //Add current to previos Sibling
    current.previousElementSibling.classList.add('current');
  }
  else
  {
    //Add current to last Slide
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

//Button Events

next.addEventListener('click', e => {
  nextSlide();
  if(auto)
  {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if(auto)
  {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

//Auto Slide
if(auto)
{
  //Run Next slide at Interval Time
  slideInterval = setInterval(nextSlide, intervalTime);
}