var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'nl-NL';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var statusp = document.querySelector('.status');
var button = document.getElementById('search');
var listening = false;

document.getElementById('search').onclick = function() {
  if (!listening) {
    listening = true;
    recognition.start();
    console.log('Ready to receive a query.');

    this.innerHTML = '&#128066;';
    statusp.textContent = 'Bezig met luisteren...';
  }
  else {
    recognition.stop();
    listening = false;

    button.innerHTML = '&#127897;';
    statusp.textContent = 'Klik om in te spreken en te zoeken:';
  }
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  var query = event.results[0][0].transcript;

  console.log('Query received: ' + query);
  console.log('Confidence: ' + event.results[0][0].confidence);

  button.innerHTML = '&#127757;';
  statusp.textContent = 'Bezig met laden...';

  location.href = `https://www.viecuri.nl/zoekresultaten/?q=${query}`;
}

recognition.onspeechend = function() {
  button.innerHTML = '&#127897;';
  statusp.textContent = '';

  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
