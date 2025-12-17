let soap = require('soap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

soap.createClient(url, documentProcessingStub => {
    let conversionParams = {
        document: document,
        targetFormat: 'PDF',
        quality: 'High'
    };
    
    documentProcessingStub.convertDocument(conversionParams, (err, result) => {
        if (err) {
            console.error('Conversion error:', err);
            return;
        }
        process_document(result.convertedDocument);
    });
});