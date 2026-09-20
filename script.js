document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'})}),{threshold:.08});
document.querySelectorAll('.card,.panel,.work,.step,.band-item,.contact-card').forEach(e=>{e.style.opacity=0;io.observe(e)});


// Gentle hero interaction: the visual follows the cursor by only a few pixels.
const heroVisual=document.querySelector('.hero-visual');
if(heroVisual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  heroVisual.addEventListener('pointermove',e=>{
    const r=heroVisual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    heroVisual.style.transform=`perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg)`;
  });
  heroVisual.addEventListener('pointerleave',()=>{
    heroVisual.style.transform='';
  });
}
