let deepLearning = require('deep-learning-library');

deepLearning.createClient((err, client) => {
    if (err) {
        console.error('Client creation error:', err);
        return;
    }
    
    // TTS - Text To Speech
    let ttsInput = {
        text: 'Hello, welcome to our deep learning speech service!',
        voice: 'Ali',  // 'Ali' (male) or 'Alia' (female)
        format: 'MP3'  // 'MP3' or 'AAC'
    };
    
    client.textToSpeech(ttsInput, (er, result) => {
        if (er) {
            console.error('TTS error:', er);
            return;
        }
        console.log('TTS generated audio: ' + result.audioFile);
        console.log('Voice used: ' + result.voice);
        console.log('Format: ' + result.format);
    });
    
    // STT - Speech To Text
    let sttInput = {
        audioFile: 'path/to/audio.mp3'  // MP3 or AAC file (max 5 MB)
    };
    
    client.speechToText(sttInput, (er, result) => {
        if (er) {
            console.error('STT error:', er);
            return;
        }
        console.log('STT transcription: ' + result.text);
    });
});