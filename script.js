// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const primaryMenu = document.getElementById('primaryMenu');

if(menuToggle && primaryMenu){
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryMenu.style.display = expanded ? 'none' : 'flex';
  });
}

// Hero slider auto-scroll
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slider .slide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
  }

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
});


// Gallery lightbox
const galleryImgs = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryImgs.forEach(img=>{
  img.addEventListener('click',()=>{
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});
lightboxClose.addEventListener('click',()=>lightbox.classList.remove('show'));
lightbox.addEventListener('click',(e)=>{if(e.target===lightbox) lightbox.classList.remove('show');});
window.addEventListener('keydown',(e)=>{if(e.key==='Escape') lightbox.classList.remove('show');});

// Form AJAX
const form = document.getElementById('applicationForm');
const status = document.getElementById('formStatus');

if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent='Submitting...';
    const endpoint=form.getAttribute('action');
    if(!endpoint || endpoint.includes('your-form-id')){
      status.style.color='red';
      status.textContent='⚠️ Add your Formspree action URL.';
      return;
    }
    const data=new FormData(form);
    try{
      const res=await fetch(endpoint,{method:'POST',body:data,headers:{'Accept':'application/json'}});
      if(res.ok){
        form.reset();
        status.style.color='green';
        status.textContent='✅ Thank you! Application submitted.';
      }else{
        status.style.color='red';
        status.textContent='❌ Submission failed.';
      }
    }catch(err){
      status.style.color='red';
      status.textContent='❌ Network error. Try again.';
    }
  });
}

