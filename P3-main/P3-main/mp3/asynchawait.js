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

// STT - Speech To Text
let sttInput = {
    audioFile: 'path/to/audio.mp3'  // MP3 or AAC file (max 5 MB)
};

async function runDeepLearningOperations() {
    try {
        const client = await clientPromise;
        
        // TTS - Text To Speech
        const ttsResult = await client.textToSpeech(ttsInput);
        console.log('TTS generated audio: ' + ttsResult.audioFile);
        console.log('Voice used: ' + ttsResult.voice);
        console.log('Format: ' + ttsResult.format);
        
        // STT - Speech To Text
        const sttResult = await client.speechToText(sttInput);
        console.log('STT transcription: ' + sttResult.text);
        
    } catch (err) {
        console.error('Error:', err);
    }
}

runDeepLearningOperations();