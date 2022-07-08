const puppeteer = require('puppeteer')
const fs = require("fs/promises")


async function tutorial() {
   try {
       //const URL = 'https://essotheone.thaiddns.com:4433/#LogIn'
       const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
        product: 'firefox',
        ignoreHTTPSErrors: true,
        //acceptInsecureCerts: true, 
        args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
        executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'
       })
       const page = await browser.newPage()

       await page.goto('https://essotheone.thaiddns.com:4433/#LogIn')
       await page.type('#gwt-debug-userNameTextBox', "seniorproject");
       await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
       await Promise.all([
        page.click("#gwt-debug-signInButton"),
        page.waitForNavigation(),
    ]);
    await page.waitForSelector('#gwt-debug-tankItem1 > table:nth-child(1)');

       let data = await page.evaluate(() => {
           let results = []
           let items = document.querySelectorAll('.TankOverviewTableItem')
           items.forEach((item) => {
               results.push({
                   //url: item.getAttribute('data-url'),
                   Tank: item.querySelector('.TankLabel').innerText,
                   Volume: Array.from(item.querySelectorAll('.tank_item_div_height')).textContent,
                   //Ullage: item.querySelector('#gwt-debug-tankItem1 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)').textContent

                  
               })
           })
           return results
       })

       console.log(data)
       await browser.close()

   } catch (error) {
       console.error(error)
   }
}

tutorial()