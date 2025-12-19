// Promise-based version with error handling
function processTextWithPromises(text, summaryLength, format, targetLang, question, detailLevel) {
  let summary;
  let translated;
  
  // --- TEXT SUMMARIZATION ---
  return textSummarizePromise(text, summaryLength, format)
    .then((result) => {
      summary = result;
      // --- MACHINE TRANSLATION ---
      return machineTranslatePromise(summary, "auto", targetLang);
    })
    .then((result) => {
      translated = result;
      // --- QUESTION ANSWERING ---
      return questionAnswerPromise(translated, question, detailLevel);
    })
    .then((answer) => {
      // Final result
      return {
        summary,
        translated,
        answer,
      };
    })
    .catch((err) => {
      // Handle any errors from the chain
      throw new Error(`Processing failed: ${err.message}`);
    });
}


// function textSummarizePromise(text, length, format) {
//   return new Promise((resolve, reject) => {
//     textSummarize(text, length, format, (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// }

// function machineTranslatePromise(text, src, tgt) {
//   return new Promise((resolve, reject) => {
//     machineTranslate(text, src, tgt, (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// }

// function questionAnswerPromise(context, question, detail) {
//   return new Promise((resolve, reject) => {
//     questionAnswer(context, question, detail, (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// }
