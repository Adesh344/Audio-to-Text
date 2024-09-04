const express = require('express');
const app = express();

// OpenAI program
const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: 'add key here' 
});

async function getTranscription() {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream("Recording.mp3"),
            model: "whisper-1",
            response_format: "text",
        });
        console.log("Transcription object:", transcription);
        return transcription;
    } catch (error) {
        console.error("Error during transcription:", error);
        return "An error occurred during transcription.";
    }
}

app.get('/', async (req, res) => {
    const transcriptionText = await getTranscription();
    res.send(`Transcription: ${transcriptionText}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
