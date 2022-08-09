'use strict';

// Encripta un mensaje de acuerdo a los requerimientos del proyecto.
function encrypt(message) {
	let encryptMessage = '';
	const words = {
		a: 'ai',
		e: 'enter',
		i: 'imes',
		o: 'ober',
		u: 'ufat'
	};

	for (let char of message) {
		isVowel(char) ? encryptMessage += words[char] : encryptMessage += char;
	}

	return encryptMessage;
}

// Desencripta un mensaje de acuerdo a los requerimientos del proyecto.
function decrypt(message) {
	let decryptMessage = message;
	const words = {
		ai: 'a',
		enter: 'e',
		imes: 'i',
		ober: 'o',
		ufat: 'u'
	};

	for (let keyword of Object.keys(words)) {
		if (message.includes(keyword)) 
			decryptMessage = decryptMessage.replaceAll(keyword, words[keyword]);
	}

	return decryptMessage;
}

// Comprueba si un caracter es una vocal.
function isVowel(char) {
	const vowels = 'aeiou';
	for (let vowel of vowels) {
		if (char === vowel) return true;
	}
	return false;
}

// Comprueba si una cadena está o no vacía.
function onlySpaces(sentence) {
	const noSpaces = sentence.replaceAll(/\s+/g, '');
	return !noSpaces;
}

// Inserta un nuevo mensaje, ya sea encriptado o desencriptado.
function insertMessage(type='encrypt') {
	const message = textArea.value;
	if (!onlySpaces(message)) {
		let newMessage = encrypt(message); 
		if (type === 'decrypt') {
			newMessage = decrypt(message);
		}

		const messageHistory = document.getElementsByClassName('message-history')[0];
		const notMessagesElementList = document.getElementsByClassName('no-messages');

		if (notMessagesElementList.length) {
			messageHistory.removeChild(notMessagesElementList[0]);
			const listMessages = document.createElement('ul');
			listMessages.classList.add('list-messages');
			messageHistory.appendChild(listMessages);
			messageHistory.classList.add('message-history--active');
		}
		
		const listMessages = document.getElementsByClassName('list-messages')[0];
		const messageElement = document.createElement('li');
		messageElement.classList.add('message');
		messageElement.innerHTML = `
			<div class="copy">
				<button class="copy-icon ${ newMessage }" type="button">
					<img src="./imgs/copyIcon.svg" alt="Copy icon">
				</button>
			</div>
			<p class="message__text">${ newMessage }</p>
		`;

		if (listMessages.innerHTML === '')
			listMessages.appendChild(messageElement);
		else {
			const firstMessageElement = document.getElementsByClassName('message')[0];
			listMessages.insertBefore(messageElement, firstMessageElement);
		}

		const copyButton = document.getElementsByClassName('copy-icon')[0];
		copyButton.addEventListener('click', () => {
			if (navigator.clipboard) {
				navigator.clipboard.writeText(newMessage).then(() => {
					alert('Copiado en el portapapeles');
				});
			} else 
				alert('No se puede copiar texto desde este navegador');
		});
	}
}

const textArea = document.getElementsByClassName('encryption-menu__control')[0];
textArea.addEventListener('input', () => {
	const validCharacters = ' abcdefghijklmnñopqrstuvwxyz';
	let newMessage = '';

	for (let char of textArea.value) {
		let count = 0, flag = false;
		while (count < validCharacters.length && !flag) {
			if (char === validCharacters[count++]) {
				newMessage += char;
				flag = true;
			}
		}
	}
	
	textArea.value = newMessage;
})


const encryptButton = document.getElementsByClassName('button--encrypt')[0];
encryptButton.addEventListener('click', insertMessage);

const decryptButton = document.getElementsByClassName('button--decrypt')[0];
decryptButton.addEventListener('click', insertMessage.bind(null, 'decrypt'));
