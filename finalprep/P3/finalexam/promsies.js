let psoap = require('psoap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

let conversionParams = {
    document: document,
    target_format: PDF,
    quality_lvl: High
}


client$
    .then(client => client.convertDoc(conversionParams))
    .then(result => {
        process_document(result.convertedDocument);
    })
    .catch((err) => {
        console.log(err)
    });
