const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    product: 'firefox',
    ignoreHTTPSErrors: true, 
    acceptInsecureCerts: true, 
    args:['--proxy-bypass-list=*', '--disable-gpu', '--disable-dev-shm-usage', 
    '--disable-setuid-sandbox', '--no-first-run', '--no-sandbox', 
    '--no-zygote', '--single-process', '--ignore-certificate-errors', 
    '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
    executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'

  })
  const page = await browser.newPage()
  await page.goto("https://learnwebcode.github.io/practice-requests/")

  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
  })
  await fs.writeFile("names.txt", names.join("\r\n"))

  //await page.click("#clickme")
  //const clickedData = await page.$eval("#data", el => el.textContent)
  //console.log(clickedData)

  //await page.type("#ourfield", "blue")
  //await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
  //const info = await page.$eval("#message", el => el.textContent)
 // console.log(info)

 console.log(names)

  await browser.close()
}

start()

