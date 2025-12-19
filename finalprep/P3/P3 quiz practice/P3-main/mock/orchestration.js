// Promise orchestration using Promise.all for parallel processing
// Note: This processes MULTIPLE texts in parallel through the same pipeline
function processMultipleTextsWithPromiseAll(texts, summaryLength, format, targetLang, question, detailLevel) {
  // Create an array of promises, one for each text
  const promises = texts.map((text) => {
    return processTextWithPromises(text, summaryLength, format, targetLang, question, detailLevel);
  });
  
  // Execute all promises in parallel
  return Promise.all(promises)
    .then((results) => {
      return {
        totalProcessed: results.length,
        results,
      };
    })
    .catch((err) => {
      throw new Error(`Batch processing failed: ${err.message}`);
    });
}



// Alternative: Process multiple independent operations in parallel
// This example summarizes multiple texts in parallel, then continues sequentially
function processWithParallelSummarization(texts, summaryLength, format, targetLang, question, detailLevel) {
  // --- PARALLEL TEXT SUMMARIZATION ---
  const summaryPromises = texts.map((text) => {
    return textSummarizePromise(text, summaryLength, format);
  });
  
  return Promise.all(summaryPromises)
    .then((summaries) => {
      // Combine all summaries into one text
      const combinedSummary = summaries.join(' ');
      
      // --- MACHINE TRANSLATION ---
      return machineTranslatePromise(combinedSummary, "auto", targetLang);
    })
    .then((translated) => {
      // --- QUESTION ANSWERING ---
      return questionAnswerPromise(translated, question, detailLevel);
    })
    .then((answer) => {
      return {
        answer,
      };
    })
    .catch((err) => {
      throw new Error(`Parallel processing failed: ${err.message}`);
    });
}