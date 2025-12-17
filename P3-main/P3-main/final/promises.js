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

let conversionParams = {
    document: document,
    targetFormat: 'PDF',
    quality: 'High'
};

clientPromise
    .then(client => client.convertDocument(conversionParams))
    .then(result => {
        process_document(result.convertedDocument);
    })
    .catch(err => {
        console.error('Error:', err);
    });

//--------Orchestration with promise.all--------
clientPromise
    .then(client => {
        // Convert all three parts in parallel using Promise.all
        return Promise.all([
            client.convertDocument({
                document: part1,
                targetFormat: 'PDF',
                quality: 'High'
            }),
            client.convertDocument({
                document: part2,
                targetFormat: 'PDF',
                quality: 'High'
            }),
            client.convertDocument({
                document: part3,
                targetFormat: 'PDF',
                quality: 'High'
            })
        ]);
    })
    .then(conversionResults => {
        // Extract converted documents from results
        const convertedPart1 = conversionResults[0].convertedDocument;
        const convertedPart2 = conversionResults[1].convertedDocument;
        const convertedPart3 = conversionResults[2].convertedDocument;
        
        // Merge the converted documents (assuming merge is promise-based)
        return mergeDocuments([convertedPart1, convertedPart2, convertedPart3]);
    })
    .then(mergedDocument => {
        // Process the final merged document
        process_document(mergedDocument);
    })
    .catch(err => {
        console.error('Error:', err);
    });