const url= "https://example.com"

async function run(url){
    const html1= await get(url1)	
    const urls1= await extract(html1)

    for(const url2 of urls1)
    {
                console.log(url2)
    }

}

async function start(){
    try{
        const html= await get(url)
        const urls= await extract(html)

        for(const url1 of urls){
            run(url1);
        }
    }
    catch(err){
        console.log(err)
    }
}


start()

