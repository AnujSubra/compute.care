// Simple site JS for navigation, events, and forms

document.addEventListener('DOMContentLoaded', () => {
	// Nav toggles (multiple pages use different IDs)
	['navToggle','navToggle2','navToggle3','navToggle4'].forEach(id => {
		const btn = document.getElementById(id);
		if(!btn) return;
		const nav = btn.nextElementSibling || document.getElementById('mainNav') || btn.closest('.header-inner').querySelector('.nav');
		btn.addEventListener('click', () => nav && nav.classList.toggle('open'));
	});

	// Contact form handler (for contact.html)
	const contactForm = document.getElementById('contactForm');
	const contactMsg = document.getElementById('contactMsg');
	if(contactForm){
		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const name = document.getElementById('contactName').value.trim();
			const email = document.getElementById('contactEmail').value.trim();
			const type = document.getElementById('contactType').value;
			const message = document.getElementById('contactMessage').value.trim();

			if(!name || !email || !type || !message){
				contactMsg.textContent = 'Please fill out all fields.';
				contactMsg.className = 'form-error';
				return;
			}
			// Open user's mail client to send the message to the org
			const mailto = `mailto:computeinitiative@gmail.com?subject=${encodeURIComponent('[' + type + '] Message from ' + name)}&body=${encodeURIComponent(
				'Name: ' + name + '\nEmail: ' + email + '\nType: ' + type + '\n\nMessage:\n' + message
			)}`;
			window.location.href = mailto;
			contactMsg.textContent = `Thank you, ${name}! We've opened your email client to send your message.`;
			contactMsg.className = 'form-success';
			contactForm.reset();
		});
	}

	// Donate form
	const donateForm = document.getElementById('donateForm');
	if(donateForm){
		const amountSelect = document.getElementById('donationAmount');
		const customWrap = document.getElementById('customAmountWrap');
		amountSelect.addEventListener('change', () => {
			customWrap.style.display = amountSelect.value === 'custom' ? 'block' : 'none';
		});

		donateForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const sel = amountSelect.value;
			const amount = sel === 'custom' ? Number(document.getElementById('customAmount').value) : Number(sel);
			const email = document.getElementById('donorEmail').value;
			const msg = document.getElementById('donateMsg');
			if(!amount || amount <= 0){
				msg.textContent = 'Please enter a valid donation amount.';
				return;
			}
			// In a real site, send to payment processing endpoint. Here we simulate success.
			msg.textContent = `Thanks ${email || ''}! We received a pledge of $${amount}. We'll follow up by email to complete the donation.`;
			donateForm.reset();
			customWrap.style.display='none';
		});
	}
});
// Carousel + image loader
// IMPORTANT: Because I can't enumerate your repository images from here,
// add the filenames of the images you want in the `extraImages` array below.
// Filenames are relative to the HTML page (e.g., "images/photo1.jpg" or "Panayapatti school inaguration class.jpg").

// Example:
// const extraImages = [
//   "Panayapatti inaguration invitation 2.jpg",
//   "Panayapatti school inaguration class.jpg",
//   "other-photo.jpg",
//   "another.png"
// ];

const extraImages = [
	"PHOTO-2025-10-03-10-27-14 2.jpg"
	"PHOTO-2025-10-03-10-27-14 3.jpg"
	"PHOTO-2025-10-03-10-27-14 4.jpg"
	"PHOTO-2025-10-03-10-27-14 5.jpg"
	"PHOTO-2025-10-03-10-27-14.jpg"
	"PHOTO-2025-10-04-21-25-46.jpg"
	"PHOTO-2025-10-12-08-34-48.jpg"
  // <-- Add your other image filenames here (one string per image)
];

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-button.prev');
  const nextBtn = document.querySelector('.carousel-button.next');

  // The two images currently shown in your events.html. If you want them duplicated
  // in the carousel keep them here; if they are also added to extraImages remove from either list
  const existingImages = [
    "Panayapatti inaguration invitation 2.jpg",
    "Panayapatti school inaguration class.jpg"
  ];

  const images = [...existingImages, ...extraImages];

  if (images.length === 0) {
    track.innerHTML = '<div class="carousel-slide"><p>No images available.</p></div>';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  // Build slides
  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.className = 'carousel-img';
    img.src = src;
    img.alt = `Event photo ${i + 1}`;
    // add error handler so broken filenames don't break the layout
    img.onerror = () => {
      img.style.display = 'none';
      slide.innerHTML = '<div style="padding:24px;color:#666">Image not found: ' + src + '</div>';
    };
    slide.appendChild(img);
    track.appendChild(slide);

    // dot
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.setAttribute('aria-label', `Show slide ${i + 1}`);
    dot.addEventListener('click', () => moveToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const slides = Array.from(track.children);
  let index = 0;
  let isAnimating = false;
  let autoplayTimer = null;

  function updateButtons() {
    // If you want wrap-around behavior, keep both visible always.
    // Here we always enable both to allow wrapping.
  }

  function moveToSlide(newIndex) {
    if (isAnimating) return;
    isAnimating = true;
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${newIndex * slideWidth}px)`;
    updateDots(newIndex);
    index = (newIndex + slides.length) % slides.length;
    setTimeout(() => { isAnimating = false; }, 450);
  }

  function updateDots(activeIndex) {
    Array.from(dotsContainer.children).forEach((d, i) => {
      d.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
    });
  }

  function next() { moveToSlide((index + 1) % slides.length); }
  function prev() { moveToSlide((index - 1 + slides.length) % slides.length); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // touch support (swipe)
  let startX = 0;
  let deltaX = 0;
  const viewport = document.querySelector('.carousel-viewport');
  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  viewport.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });
  viewport.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) next();
      else prev();
    }
    deltaX = 0;
  });

  // handle resize so transform uses correct pixel width
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => moveToSlide(index), 150);
  });

  // Optional autoplay (comment out if not desired)
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 6000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  // Initialize
  // Force a layout and move to the first slide
  setTimeout(() => moveToSlide(0), 50);
  startAutoplay();
});
