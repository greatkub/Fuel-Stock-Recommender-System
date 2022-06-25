/*const { executablePath } = require('puppeteer');
const puppeteer = require('puppeteer')
; (async()=>{
    const browserFetcher = puppeteer.createBrowserFetcher({
        product: 'firefox',
        path: './browser'
    });

    const revisionInfo = await browserFetcher.download('0.31.0',(downloaded,
        total =>{
            console.log(`Download ${downloaded} of ${total} bytes`)

        }));


    const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
        product: 'firefox'
    
    })

    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080})
    await page.goto("https://www.google.com/")
    
    await browser.close();
   

})()*/


const puppeteerChrome = require('puppeteer');
//const puppeteerFirefox = require('puppeteer-firefox');

(async () => {

    const test = async browser => {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        });
        await page.goto('https://www.bbc.com/news');   
        await page.hover('#nw-c-most-read-heading__title');
        await page.screenshot({ path: 'bcc-most-read.png' })
        
        await browser.close();
    }

    const chrome = await puppeteerChrome.launch({
        headless: false,
        slowMo: 50
    });
    await test(chrome);

    /*const firefox = await puppeteerFirefox.launch({
        headless: false,
        slowMo: 50
    });
    await test(firefox);*/

})();


/*const puppeteer = require('puppeteer');
(async () => {

    const test = async browser => {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        });
        await page.goto('https://www.bbc.com/news');   
        await page.hover('#nw-c-most-read-heading__title');
        await page.screenshot({ path: 'bcc-most-read.png' })
        
        await browser.close();
    }

    const chrome = await puppeteer.launch({
        product: 'firefox',
        headless: false,
        slowMo: 50
    });
    await test(chrome);

})();*/



 
 /*const puppeteer = require('puppeteer-firefox');
const puppeteer = require("puppeteer");

(async () => {
  // FireFox's binary is needed to be fetched before
  const browser = await puppeteer.launch({ product: "firefox" });
  console.info(browser);
  await browser.close();
})();*/