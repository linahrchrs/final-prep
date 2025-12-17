let psoap = require('psoap');
let url = 'http://www.docservice.com/DocumentProcessing.wsdl';
let document = 'presentation.pptx';

let client$ = new Promise ((reject, resolve) => {
    psoap.createClient(url, (err, client)=> {
        if(err){
            reject(err);
        } else{
            resolve(client);
        }
    });
});

let conversionParams = {
    document: document,
    quality: 'HIGH',
    targetFormat: 'PDF'

};

client$
.then(client => client.convertDocument(conversionParams))
.then(result => {
    process_document(result.convertedDocument);
})
.catch(err => {
    console.error("error: ", err);
})

//orchestration

client$
.then(client =>{
    return Promise.all([
        client.convertDocument({
            document: part1,
            quality: 'HIGH',
            targetFormat: 'PDF'
        }),
        client.convertDocument({
            document: part2,
            quality: 'HIGH',
            targetFormat: 'PDF'
        }),
        client.convertDocument({
            document: part3,
            quality: 'HIGH',
            targetFormat: 'PDF'
        })
    ]);
})
.then(conversionResults => {
    const convertedPart1 = conversionResults[0].convertedDocument;
    const convertedPart2 = conversionResults[1].convertedDocument;
    const convertedPart3 = conversionResults[2].convertedDocument;

    return merge_documents([convertedPart1, convertedPart2, convertedPart3]);
})
.then(mergedDocuments => {
    process_document(mergedDocuments);
})
.catch(err => {
    console.error("error", err);
});