const url = "";

html$ = get(url);

urls$ = html$
    .then((html)=> extractUrls(html));

urls$
    .then((urls) => {
        for (const url1 of urls){
            get(url1)
                .then((html1) => {
                    extractUrls(html1)
                        .then((urls1) => {

                        })
                })
        }
    })




