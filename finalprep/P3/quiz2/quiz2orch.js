const url1 = "https://example.com";
const url2 = "https://example.com";

url1$ = get(url1)
                .then((html1) => {
                    extractUrls(html1);
                })
                .catch((err) => console.log(err));

urls2$ = get(url2)
                .then((html2) => {
                    extractUrls(html2);
                })
                .catch((err) => console.log(err));

Promise.all([urls1$, urls2$])
                .then(([urls1$, urls2$]) => {
                    if (urls1.length > urls2.length){
                        console.log(urls1 + "pointed to more urls than" + urls2);
                    }
                    else{
                        console.log(urls1 + "pointed to less urls than" + urls2);
                    }
                })
                .catch((err) => console.log(err));
