const url = "https://example.com";

async function run (url){
    const html1 = await get(url1);
    const urls1 = await extractUrls(html1);
    for (const url2 of urls1){
        console.log(url2);
    }
}

async function urlExtraction(){
    try{
        const html = await get(Url);
        const urls = await extractUrls(html);

        for (const url1 of urls){
            run(url1);
        }
    }
    catch(err) {
        console.log(err);
    }
}

urlExtraction()