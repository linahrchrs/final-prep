const url = 'https://example.com';

get(url, (err, html) => {
    if (err){
        console.log(err);
    }
    else{
        exctractUrls(html, (err, urls) => {
            if (err){
                console.log(err);
            }
            else{
                for(const ulr1 of urls){
                    get(ulr1, (html1) => {
                        exctractUrls(html1, (urls1) => {
                            for (const url2 of urls1){
                                console.log(url2);
                            }
                        });
                    });
                }
            }
        }); 
    }
})