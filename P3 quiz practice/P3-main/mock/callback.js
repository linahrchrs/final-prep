function processTextWithCallbacks(
  text,
  summaryLength,
  format,
  targetLang,
  question,
  detailLevel,
  finalCallback
) {
  // --- TEXT SUMMARIZATION ---
  textSummarize(text, summaryLength, format, (err, summary) => {
    if (err) return finalCallback(err);

    // --- MACHINE TRANSLATION ---
    machineTranslate(summary, "auto", targetLang, (err, translated) => {
      if (err) return finalCallback(err);

      // --- QUESTION ANSWERING ---
      questionAnswer(translated, question, detailLevel, (err, answer) => {
        if (err) return finalCallback(err);

        // Final result
        finalCallback(null, {
          summary,
          translated,
          answer,
        });
      });
    });
  });
}
