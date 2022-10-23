const puppeteer = require('puppeteer')
//const nodeCron = require("node-cron")
const sch = require("node-schedule")
const fs = require("fs/promises")
const mongo = require("mongodb").MongoClient

// Connect to MongoDB Database
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

async function VeederRoot() {
   try {
       const date = Date.now();
       console.time()
   
       const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 10,
        product: 'firefox',
        ignoreHTTPSErrors: true,
        timeout: 60000,
        // browserContext: 'default',
        args: ['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService', '--no-sandbox',
        '--disable-extensions','--use-gl=egl', '--disable-setuid-sandbox', '--shm-size=1gb'],
        ignoreDefaultArgs: ["--disable-extensions"],
        // extraPrefsFirefox: {
        //   // Enable additional Firefox logging from its protocol implementation
        //   // 'remote.log.level': 'Trace',
        // },
        //executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe',
        FIREFOX_BIN: '/app/vendor/firefox/firefox',
        // executablePath: '/app/vendor/firefox/firefox'
        //executablePath: '/app/vendor/firefox/firefox'
        //Selenium:WebDriver:Firefox:Binary.path = "/app/vendor/firefox/firefox"
       })

       const page = await browser.newPage()
      //  console.time()
       await page.goto('https://essotheone.thaiddns.com:4433/#LogIn')
        console.log("heading to", page)
       await page.type('#gwt-debug-userNameTextBox', "seniorproject");
      
       await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
       console.log("LogIn")
       await Promise.all([

        page.click("#gwt-debug-signInButton"),
        console.log("Click"),
        
       // page.click("#gwt-debug-tankItem4 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > a:nth-child(2)"),
        page.waitForNavigation(),
        console.log("Navigate"),
        // console.time()
    ]);

    await page.waitForSelector('#gwt-debug-tankItem1 > table:nth-child(1)');
    console.log("waitselector")
        // Get data from Veeder-root web page      
        let data = await page.evaluate(() => {
          console.log("data")
           const items = Array.from(document.querySelectorAll('.TankOverviewTableItem'))
           let results = [];
       
           let allTank = [];
           let ts = Date.now();
             const dat = new Date(ts)
             const day = dat.getDate()
             const month = dat.getMonth() +1
             const year = dat.getFullYear()
             // current hours
              let hours = dat.getHours();
              // current minutes
              let minutes = dat.getMinutes();
             console.time()
            // const time = dat.getTi
             const date = `${day}/${month}/${year} ${hours}:${minutes}`
           items.forEach((item) => {   
            console.time()
                 const select = item.querySelectorAll("#_paramName.tank_item_div_height");
                 console.time()
                 console.log("select", select)
                 const TankName = item.querySelector('.TankLabel');
                 console.time(TankName)
                 console.log("Tank", TankName)
                 const T = TankName;
                 //const D = fulldate;
                 const V = select[0];
                 console.time()
                 const U = select[1];
                 console.time()
                 const W = select[2];
                 console.time()
                 const F = select[3];
                 console.time()
                 allTank.push({ TankName: T.innerText,
                    Volume:V.innerText, 
                    Ullage: U.innerText,
                    Waterheight: W.innerText,
                    Fuelheight: F.innerText
                  })
               });
             results.push({
                    date,
                    Tank: allTank,  
                });
               return results
           });
      console.log(data)
      TL.insertMany(data)
      console.log("Close"),
      console.time()
      await browser.close()
      
   } catch (error) {
    console.log()
       console.error(error)
   }
}
//sch.scheduleJob("0 8 * * *",VeederRoot);
//console.time("time1")
//sch.scheduleJob("*/30 * * * * *",VeederRoot);
VeederRoot()
})


