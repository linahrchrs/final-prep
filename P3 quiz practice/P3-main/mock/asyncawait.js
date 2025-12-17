// Promise-based version with async/await and error handling
async function processTextWithAsync(text, summaryLength, format, targetLang, question, detailLevel) {
  try {
    // --- TEXT SUMMARIZATION ---
    const summary = await textSummarizePromise(text, summaryLength, format);
    
    // --- MACHINE TRANSLATION ---
    const translated = await machineTranslatePromise(summary, "auto", targetLang);
    
    // --- QUESTION ANSWERING ---
    const answer = await questionAnswerPromise(translated, question, detailLevel);
    
    // Final result
    return {
      summary,
      translated,
      answer,
    };
  } catch (err) {
    // Handle any errors from the async operations
    throw new Error(`Processing failed: ${err.message}`);
  }
}
