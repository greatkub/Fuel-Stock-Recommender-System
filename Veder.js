const puppeteer = require("puppeteer")
const fs = require("fs/promises")

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    product: 'firefox',
    ignoreHTTPSErrors: true, 
    //acceptInsecureCerts: true, 
    args:['--ignore-certificate-errors', '--ignore-certificate-errors-spki-list', '--enable-features=NetworkService'],
    executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'
  })

  const page = await browser.newPage()
      //await page.goto("https://learnwebcode.github.io/practice-requests/")
    await page.goto('https://essotheone.thaiddns.com:4433/#LogIn');
    await page.type('#gwt-debug-userNameTextBox', "seniorproject");
    await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
    await page.click("#gwt-debug-signInButton")

  const TLS = await page.evaluate(() => {
      //document.querySelector('div[id="_paramName"][class="tank_item_div_height"]').innerText
      //document.querySelector('TankLabel').textContent
    return Array.from(document.querySelectorAll('TankLabel')).map(x => x.textContent)
    //})
    //await fs.writeFile("TLS.txt", TLS.join("\r\n"))
    //console.log(TLS)

     /* const TLS = await page.evaluate(() => {
      const data = document.querySelector('TankLabel')
     return data.innerHTML;*/
  
})
  console.log(TLS)
  await browser.close()
}

start()

