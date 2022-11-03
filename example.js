const puppeteerVar = require('puppeteer-core');
//const StealthPlugin = require('puppeteer-extra-plugin-stealth');
//puppeteerVar.use(StealthPlugin())
const fs = require("fs/promises")
describe('First Test', ()=>{
    it('Launch the Browser', async function(){
        const browser = await puppeteerVar.launch({headless: false,
        //slowMo: 500, devtools: true,
        product: 'firefox',
        ignoreHTTPSErrors: true, 
        acceptInsecureCerts: true, 
        args:['--proxy-bypass-list=*', '--disable-gpu', 
        '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-first-run', 
        '--no-sandbox', '--no-zygote', '--single-process', '--ignore-certificate-errors', 
        '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
        executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'})
       
        const page = await browser.newPage()
        await page.goto('https://essotheone.thaiddns.com:4433/#LogIn',{timeout: 5000});
        await page.type('#gwt-debug-userNameTextBox', "seniorproject");
        await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
        await page.click("#gwt-debug-signInButton")

        let data = await page.evaluate(()=>{
            let Tank = document.querySelector('div[class="tankDetailLabel"]').innerText;
            //Array.from(document.querySelector('div[id="_paramName"][class="value_label"]').innerHTML
            let T = document.querySelector('div[id="_paramName"][class="tank_item_div_height"]').innerText
            return{
                Tank
            }
        });

        console.log(data);
        debugger;
        
        await page.screenshot({ path: 'bcc-most-read.png' })
        await page.reload();
        await browser.close();
    
    //let data = false;
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










   