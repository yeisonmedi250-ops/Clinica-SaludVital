let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n){
  slides.forEach((slide,i)=>{
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });
  slides[n].classList.add("active");
  dots[n].classList.add("active");
}

function nextSlide(){
  index = (index + 1) % slides.length;
  showSlide(index);
}
function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

dots.forEach((dot,i)=>{
  dot.addEventListener("click", ()=>{ 
    index=i; 
    showSlide(index);
  });
});

// Auto-play cada 5 seg
setInterval(nextSlide, 5000);
