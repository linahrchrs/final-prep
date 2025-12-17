const url = "https://example.com";

html$ = get(url)

urls$ = html$
            .then((html) => extractUrls(html1))
            .catch((err) => console.log(err));

urls$
    .then((urls) => {
        for (const url1 of urls){
            get(url1)
                    .then((html1) => {
                        extractUrls(html1)
                                        .then((urls1) => {
                                            for(const url2 of urls1){
                                                console.log(url2);
                                            }
                                        });
                    });
        }
    })