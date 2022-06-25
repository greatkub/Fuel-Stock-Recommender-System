const puppeteerVar = require('puppeteer-core');

describe('My First Test', ()=>{
    it('Launch the Browser', async function(){
        const browser = await puppeteerVar.launch({headless: false,
        //slowMo: 500, devtools: true,
        product: 'firefox',
        args:[
            '-wait-for-browser'
        ],
        executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'})
        const page = await browser.newPage()
        await page.goto('https://www.bbc.com/news')
        await page.reload();
        //await browser.close();
    })
})





   