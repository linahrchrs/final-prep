let soap = require('soap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

let conversionParams = {
    document: document,
    target_format: PDF,
    quality_lvl: High
}
soap.createClient(url, documentProcessingStub => {
    documentProcessingStub.convertDoc(conversionParams, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            process_document(result.convertedDocument);
        }
    })
});