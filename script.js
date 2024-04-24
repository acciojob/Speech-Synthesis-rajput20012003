// Your script here.
// Populate the voices dropdown with available voices
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en')) // Filter English voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeech();
}

// Toggle speech synthesis
function toggleSpeech(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Set rate and pitch
function setOption() {
  msg[this.name] = this.value;
  toggleSpeech();
}

// Initialize speech synthesis
speechSynthesis.addEventListener('voiceschanged', populateVoices);
populateVoices();

// Set default options
msg.text = document.querySelector('[name="text"]').value;
msg.volume = 1;
msg.rate = 1;
msg.pitch = 1;

// Event listeners
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggleSpeech);
stopButton.addEventListener('click', () => toggleSpeech(false));

