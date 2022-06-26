const puppeteerVar = require('puppeteer-core');

//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteerVar.use(StealthPlugin())

describe('First Test', ()=>{
    it('Launch the Browser', async function(){
        const browser = await puppeteerVar.launch({headless: false,
        //slowMo: 500, devtools: true,
        product: 'firefox',
        ignoreHTTPSErrors: true, 
        acceptInsecureCerts: true, 
        args:['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', '--no-zygote', '--single-process', '--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
        executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'})
        try {
        const page = await browser.newPage()
        await page.goto('https://essotheone.thaiddns.com:4433/#LogIn',{timeout: 5000});
        } catch (err){
            console.error(err.message);
            return false;
            //await page.goto('https://auspark.au.edu/Account/Login?ReturnUrl=%2F')
        await page.screenshot({ path: 'bcc-most-read.png' })
        await page.reload();
        //await browser.close();
    }

    let data = false;
    let attemps = 0;
    while (data === false && attemps < 5){
        data = await browser(page);
        attemps += 1;
        if (data === false){
            await new Promise((resolve, reject) => {
                setTimeout(resolve,3000)
            })
        }
    }
})
    
    
})







   