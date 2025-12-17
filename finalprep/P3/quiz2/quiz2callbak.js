const url = "https://example.com"

get(url, (err, html) => {
    if(err){
        consoler.log(err);
    }
    else {
        extractUrls(html, (err, urls) => {
            if(err){
                console.log(err);
            }
            else{
                for (const url1 of urls){
                    get(url1, (err, html1) => {
                        if(err){
                            console.log(err);
                        }
                        extractUrls(html1, (urls1) => {
                            for(const url2 of urls1){
                                console.log(url2);
                            }
                        });
                    });
                }
            }
        });
    }
});