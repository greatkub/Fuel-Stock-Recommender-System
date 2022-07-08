const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
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
        let results = []
        return Array.from(document.querySelectorAll
            ('.TankOverviewTableItem')).map(x => x.textContent)
    })
    await fs.writeFile("Tank.txt", table.join("\r\n"))
    console.log(TLS)
    console.log("value", Value)
    console.log("table", table)

    await browser.close();
}

start()



