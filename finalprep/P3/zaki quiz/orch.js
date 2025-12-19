const url1= "https://example.com"
const url2= "https://example.com"


urls1$ = get(url1)
    .then((html1) => {
        extract(html1)
    })

urls2$ = get(url2)
    .then((html2) => {
        extract(html2)
    })

Promise.all([urls1$, urls2$])
    .then(([urls1, urls2]) => {
        if (urls1.length> urls2.length)
        {
            console.log(urls1+"pointed to more urls than"+urls2)
        }else{
            console.log(urls1+"pointed to less urls than"+urls2)
        }
    })