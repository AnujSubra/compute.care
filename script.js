// Donation slider that updates the displayed raised amount
document.addEventListener('DOMContentLoaded', function(){
	

	// Simple carousel
	const track = document.querySelector('.carousel-track');
	const slides = track ? Array.from(track.children) : [];
	const prevBtn = document.querySelector('.carousel-btn.prev');
	const nextBtn = document.querySelector('.carousel-btn.next');
	const dotsWrap = document.getElementById('carousel-dots');
	let index = 0;

	function render(){
		if(!track) return;
		slides.forEach((s,i)=> s.style.display = (i===index)?'block':'none');
		updateDots();
	}

	function updateDots(){
		if(!dotsWrap) return;
		dotsWrap.innerHTML = '';
		slides.forEach((_,i)=>{
			const btn = document.createElement('button');
			btn.addEventListener('click', ()=>{ index = i; render(); });
			btn.style.background = (i===index)?'#666':'#c0c0c0';
			dotsWrap.appendChild(btn);
		});
	}

	if(prevBtn) prevBtn.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; render(); });
	if(nextBtn) nextBtn.addEventListener('click', ()=>{ index = (index+1)%slides.length; render(); });

	// autoplay
	let autoplay = setInterval(()=>{ index = (index+1)%slides.length; render(); }, 4000);
	const carousel = document.getElementById('carousel');
	if(carousel){
		carousel.addEventListener('mouseenter', ()=> clearInterval(autoplay));
		carousel.addEventListener('mouseleave', ()=> autoplay = setInterval(()=>{ index = (index+1)%slides.length; render(); }, 4000));
	}

	render();
});
