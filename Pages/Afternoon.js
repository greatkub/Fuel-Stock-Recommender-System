const puppeteer = require('puppeteer')
//const nodeCron = require("node-cron")
const sch = require("node-schedule")
const fs = require("fs/promises")
const mongo = require("mongodb").MongoClient



async function AfternoonTLS450() {
   try {
       const date = Date.now();
       console.time()
       const browser = await puppeteer.launch({
        headless: true,
        slowMo: 50,
        product: 'firefox',
        ignoreHTTPSErrors: true,
        args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService', '--no-sandbox',
        '--disable-extensions','--use-gl=egl', '--disable-setuid-sandbox'],
        ignoreDefaultArgs: ["--disable-extensions"],
        extraPrefsFirefox: {
        },
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
        // Get data from Veeder-root web page      
        let data = await page.evaluate(() => {
           const items = Array.from(document.querySelectorAll('.TankOverviewTableItem'))
           let results = [];
           let allTank = [];
           let ts = Date.now();
             const dat = new Date(ts)
             const day = dat.getDate()
             const month = dat.getMonth() +1
             const year = dat.getFullYear()
            // const time = dat.getTi
             const date = `${day}/${month}/${year}`
           items.forEach((item) => {   

                 const select = item.querySelectorAll("#_paramName.tank_item_div_height");
                 const TankName = item.querySelector('.TankLabel');
                 const T = TankName;
                 //const D = fulldate;
                 const V = select[0];
                 const U = select[1];
                 const W = select[2];
                 const F = select[3];
                 allTank.push({ TankName: T.innerText,
                    Volume:V.innerText, 
                    Ullage: U.innerText,
                    Waterheight: W.innerText,
                    Fuelheight: F.innerText
                  })
               });
             results.push({
                    date,
                    Tank: allTank
                });
               return results
           });
            console.log(data)
            TL.insertMany(data)
            await browser.close()
   } catch (error) {
       console.error(error)
   }
}
/* schedule allow to scrape data every 12:00 pm*/
sch.scheduleJob("0 12 * * *",AfternoonTLS450);
AfternoonTLS450()
