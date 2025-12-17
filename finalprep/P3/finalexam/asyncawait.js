let soap = require('soap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

let conversionParams = {
    document: document,
    target_format: PDF,
    quality_lvl: High
}

async function convertDoc(){
    try{
        const client = await client$;
        const result = await client.convertDoc(conversionParams);
        process_document(result.convertedDocument);
    }
    catch(err){
        console.log(err);
    }
}

convertDoc();