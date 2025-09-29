// Simple site JS for navigation, events, and forms

document.addEventListener('DOMContentLoaded', () => {
	// Nav toggles (multiple pages use different IDs)
	['navToggle','navToggle2','navToggle3','navToggle4'].forEach(id => {
		const btn = document.getElementById(id);
		if(!btn) return;
		const nav = btn.nextElementSibling || document.getElementById('mainNav') || btn.closest('.header-inner').querySelector('.nav');
		btn.addEventListener('click', () => nav && nav.classList.toggle('open'));
	});

	// Events removed — no event population

	// Message form (replaces subscribe form)
	const messageForm = document.getElementById('messageForm');
	const messageMsg = document.getElementById('messageMsg');
	if(messageForm){
		messageForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const email = document.getElementById('emailInput').value;
			const message = document.getElementById('messageInput').value;
			if(!email || !message){
				messageMsg.textContent = 'Please enter both your email and message.';
				return;
			}
			// Open user's mail client to send the message to the org
			const mailto = `mailto:computeinitiative@gmail.com?subject=${encodeURIComponent('Message from site visitor')}&body=${encodeURIComponent('From: ' + email + '\n\nMessage:\n' + message)}`;
			window.location.href = mailto;
			messageMsg.textContent = `Thanks — opened your mail client to send your message from ${email}.`;
			messageForm.reset();
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

