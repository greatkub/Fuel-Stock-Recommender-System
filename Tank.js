const puppeteer = require('puppeteer')
const fs = require("fs/promises")
const mongo = require("mongodb").MongoClient

const url = "mongodb+srv://Oildb:seniorproject2@fsrs-cluster.0flfd.mongodb.net/test";let db, TL
mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("TL")
      TL = db.collection("TL")

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
       // page.click("#gwt-debug-tankItem4 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > a:nth-child(2)"),
        page.waitForNavigation(),
    ]);
    await page.waitForSelector('#gwt-debug-tankItem1 > table:nth-child(1)');

        let data = await page.evaluate(() => {
           const items = Array.from(document.querySelectorAll('.TankOverviewTableItem'))
           let results = [];
           items.forEach((item) => {
                 
                 const select = item.querySelectorAll("#_paramName.tank_item_div_height");
                 const TankName = item.querySelector('.TankLabel');
                 const T = TankName;
                 const V = select[0];
                 const U = select[1];
                 results.push({
                    Tank: T.innerText,
                    volume:V.innerText, 
                    ullage: U.innerText
                });
                   //url: item.getAttribute('data-url'),
                   //Tank: item.querySelector('.TankLabel').innerText,
                   //Volume: item.querySelector('.tank_item_div_height').textContent,
                   //Ullage: item.querySelector('#gwt-debug-tankItem1 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)').textContent
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

tutorial()
})























/*const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const mongo = require("mongodb").MongoClient

const url = "mongodb://localhost:27017";let db, j
mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("j")
      j = db.collection("j")
  
      //....
      async function start() {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            product: 'firefox',
            ignoreHTTPSErrors: true,
            acceptInsecureCerts: true, 
            args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
            executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'
        })
    
        const page = await browser.newPage()
        await page.goto('https://essotheone.thaiddns.com:4433/#LogIn');
        await page.type('#gwt-debug-userNameTextBox', "seniorproject");
        await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
        // await page.waitForNavigation();
        // await page.click("#gwt-debug-signInButton")
        await Promise.all([
            page.click("#gwt-debug-signInButton"),
            page.waitForNavigation(),
        ]);
        await page.waitForSelector('#gwt-debug-tankItem1 > table:nth-child(1)');

    
        const TLS = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.TankLabel')).map(x => x.textContent)
        })
    
        const Value = await page.evaluate(() => {
            //document.querySelector('TankLabel').textContent
            return Array.from(document.querySelectorAll
                ('.TankOverviewTableItem .tank_item_div_height')).map(x => x.textContent)
        })
    
        const table = await page.evaluate(() => {
            //let results = []
            return Array.from(document.querySelectorAll
                ('.TankOverviewTableItem')).map(x => x.innerText)
        })
        //await fs.writeFile("Tank.txt", table.join("\r\n"))
        //console.log(TLS)
        //console.log("value", Value)
        console.log("table", table)

        j.insertMany(table)
        await browser.close();
    }
    
    start()
    }
  )*/