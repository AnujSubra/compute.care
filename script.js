// Simple site JS for navigation, events, and forms

document.addEventListener('DOMContentLoaded', () => {
	// Nav toggles (multiple pages use different IDs)
	['navToggle','navToggle2','navToggle3','navToggle4'].forEach(id => {
		const btn = document.getElementById(id);
		if(!btn) return;
		const nav = btn.nextElementSibling || document.getElementById('mainNav') || btn.closest('.header-inner').querySelector('.nav');
		btn.addEventListener('click', () => nav && nav.classList.toggle('open'));
	});

	// Sample events data (would come from API in real site)
	const sampleEvents = [
		{id:1,title:'Intro to Cost-Effective Cloud Compute',date:'Oct 10, 2025',location:'Online',link:'#'},
		{id:2,title:'Reproducible Workflows Workshop',date:'Nov 5, 2025',location:'San Francisco, CA',link:'#'},
		{id:3,title:'Community Hackathon',date:'Dec 12, 2025',location:'Remote + In-person',link:'#'}
	];

	const eventsList = document.getElementById('eventsList');
	const fullEventsList = document.getElementById('fullEventsList');
	const renderEvent = (ev) => {
		const li = document.createElement('li');
		li.innerHTML = `<div><strong>${ev.title}</strong><div class="muted small">${ev.date} · ${ev.location}</div></div><div><a class=\"btn\" href=\"${ev.link}\">Register</a></div>`;
		return li;
	};
	if(eventsList){
		sampleEvents.slice(0,2).forEach(ev => eventsList.appendChild(renderEvent(ev)));
	}
	if(fullEventsList){
		sampleEvents.forEach(ev => fullEventsList.appendChild(renderEvent(ev)));
	}

	// Subscribe form
	const subscribeForm = document.getElementById('subscribeForm');
	const subscribeMsg = document.getElementById('subscribeMsg');
	if(subscribeForm){
		subscribeForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const email = document.getElementById('emailInput').value;
			subscribeMsg.textContent = `Thanks — we'll send updates to ${email}.`;
			subscribeForm.reset();
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

