let deepLearning = require('deep-learning-library');

let clientPromise = new Promise((resolve, reject) => {
    deepLearning.createClient((err, client) => {
        if (err) {
            reject(err);
        } else {
            resolve(client);
        }
    });
});

// TTS - Text To Speech
let ttsInput = {
    text: 'Hello, welcome to our deep learning speech service!',
    voice: 'Ali',  // 'Ali' (male) or 'Alia' (female)
    format: 'MP3'  // 'MP3' or 'AAC'
};

clientPromise
    .then(client => client.textToSpeech(ttsInput))
    .then(result => {
        console.log('TTS generated audio: ' + result.audioFile);
        console.log('Voice used: ' + result.voice);
        console.log('Format: ' + result.format);
    })
    .catch(err => console.error('TTS error:', err));

// STT - Speech To Text
let sttInput = {
    audioFile: 'path/to/audio.mp3'  // MP3 or AAC file (max 5 MB)
};

clientPromise
    .then(client => client.speechToText(sttInput))
    .then(result => {
        console.log('STT transcription: ' + result.text);
    })
    .catch(err => console.error('STT error:', err));


// --- ORCHESTRQTOR USING ASYNC/AWAIT ---
// TTS - Text To Speech
let ttsInput = {
    text: 'Hello, welcome to our deep learning speech service!',
    voice: 'Ali',  // 'Ali' (male) or 'Alia' (female)
    format: 'MP3'  // 'MP3' or 'AAC'
};

// STT - Speech To Text
let sttInput = {
    audioFile: 'path/to/audio.mp3'  // MP3 or AAC file (max 5 MB)
};

clientPromise
    .then(client => {
        return Promise.all([
            client.textToSpeech(ttsInput),
            client.speechToText(sttInput)
        ]);
    })
    .then(results => {
        console.log('TTS generated audio: ' + results[0].audioFile);
        console.log('Voice used: ' + results[0].voice);
        console.log('Format: ' + results[0].format);
        
        console.log('STT transcription: ' + results[1].text);
    })
    .catch(err => {
        console.error('Error:', err);
    });