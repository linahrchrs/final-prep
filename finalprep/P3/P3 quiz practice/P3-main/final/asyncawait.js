let psoap = require('psoap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

let clientPromise = new Promise((resolve, reject) => {
    psoap.createClient(url, (err, client) => {
        if (err) {
            reject(err);
        } else {
            resolve(client);
        }
    });
});

async function convertAndProcess() {
    try {
        const client = await clientPromise;
        
        const conversionParams = {
            document: document,
            targetFormat: 'PDF',
            quality: 'High'
        };
        
        const result = await client.convertDocument(conversionParams);
        process_document(result.convertedDocument);
        
    } catch (err) {
        console.error('Error:', err);
    }
}

convertAndProcess();