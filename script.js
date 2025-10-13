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
