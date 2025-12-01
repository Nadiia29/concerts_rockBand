/* ---------- Бургер ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
	nav.classList.toggle('active');
});

document.querySelectorAll('.header-nav__item').forEach((item) => {
	item.addEventListener('click', () => {
		nav.classList.remove('active');
		burger.classList.remove('active');
	});
});

/* ---------- Pop-up та валідація---------- */
document.addEventListener('DOMContentLoaded', () => {
	const popup = document.getElementById('popup');
	const popupMessage = document.getElementById('popupMessage');
	const closePopupBtn = document.getElementById('closePopup');

	const form = document.getElementById('contactForm');
	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const messageInput = document.getElementById('message');

	// Показати попап
	function showPopup(message) {
		popupMessage.textContent = message;
		popup.removeAttribute('hidden');
		popup.classList.add('active');
		document.body.style.overflow = 'hidden';
	}

	// Закрити попап
	function closePopup() {
		popup.setAttribute('hidden', '');
		popup.classList.remove('active');
		document.body.style.overflow = '';
	}

	closePopupBtn.addEventListener('click', closePopup);
	popup.addEventListener('click', (e) => {
		if (e.target === popup) closePopup();
	});

	/* ---------- Попап для кнопок квитків ---------- */

	document.querySelectorAll('.hero__btn, .buy-ticket-btn').forEach((btn) => {
		btn.addEventListener('click', () => {
			const row = btn.closest('.concerts__row');

			if (row) {
				const city = row.querySelector('.concerts__cell:nth-child(1)').textContent.trim();
				const seats = row.querySelector('.concerts__cell:nth-child(2)').textContent.trim();
				const date = row.querySelector('.concerts__cell:nth-child(3)').textContent.trim();

				showPopup(
					`🎫 Замовлення квитка\n\nМісто: ${city}\nК-сть місць: ${seats}\nДата: ${date}`,
				);
			} else {
				showPopup("🎫 Перейдіть до розділу 'Концерти', щоб обрати потрібну дату та місто.");
			}
		});
	});

	/* ---------- Валідація + GET-відправка ---------- */

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		let errors = [];

		if (nameInput.value.trim() === '') {
			errors.push("Поле 'Ім'я' не може бути порожнім.");
		}

		if (!isValidEmail(emailInput.value.trim())) {
			errors.push('Будь ласка, введіть коректний Email.');
		}

		if (messageInput.value.trim().length < 10) {
			errors.push('Повідомлення має містити щонайменше 10 символів.');
		}

		if (errors.length) {
			showPopup('❌ Помилка:\n\n' + errors.join('\n'));
			return;
		}

		const data = {
			name: nameInput.value.trim(),
			email: emailInput.value.trim(),
			message: messageInput.value.trim(),
		};

		const queryString = new URLSearchParams(data).toString();
		const getUrl = `submit_form.php?${queryString}`;

		showPopup('✅ Ваше повідомлення успішно відправлено!\n\n' + `Дані GET-запиту:\n${getUrl}`);

		form.reset();
	});

	/*-------------------Скрол вверх -----------------*/

	const scrollToTopBtn = document.getElementById('scrollToTopBtn');

	window.addEventListener('scroll', scrollFunction);

	function scrollFunction() {
		if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
			scrollToTopBtn.style.display = 'block';
		} else {
			scrollToTopBtn.style.display = 'none';
		}
	}

	scrollToTopBtn.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});
});
