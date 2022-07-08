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
  //await page.goto("https://learnwebcode.github.io/practice-requests/")
  await page.goto('https://essotheone.thaiddns.com:4433/#LogIn');
  await page.type('#gwt-debug-userNameTextBox', "seniorproject");
  await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
  await page.click("#gwt-debug-signInButton")
  
  await page.waitForNavigation();

  // console.group("A")
  // let e2a = document.getElementsByClassName("tank_item_div_height")
  // console.log("e2a",e2a)
  // let elementa = document.querySelector('#gwt-debug-tankItem5 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  // console.log("element",elementa)
  // console.groupEnd("A")

  console.group("B")
  let e2b = await page.$$(".tank_item_div_height")
  console.log("e2b",e2b)
  let e2b1 = await page.$$("tank_item_div_height")
  console.log("e2b1",e2b1)
  let elementb = await page.$('#gwt-debug-tankItem5 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  console.log("element",elementb)
  console.groupEnd("B")


  let amounts = await page.evaluate((sel) => {
    // console.group("C")
    // let e2 = document.getElementsByClassName("tank_item_div_height")
    // console.log("e2",e2)
    let element = document.querySelector(sel);
    console.log("element",element)
    // console.groupEnd("C")
    return element ? element.innerHTML : element;
  }, '#gwt-debug-tankItem1 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  
  console.log("amounts 1", amounts)

  let amounts2 = await page.evaluate((sel) => {
    // console.group("C")
    // let e2 = document.getElementsByClassName("tank_item_div_height")
    // console.log("e2",e2)
    let element = document.querySelector(sel);
    console.log("element",element)
    // console.groupEnd("C")
    return element ? element.innerHTML : element;
  }, '#gwt-debug-tankItem2 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  
  console.log("amounts 1", amounts2)

  let amounts3 = await page.evaluate((sel) => {
    // console.group("C")
    // let e2 = document.getElementsByClassName("tank_item_div_height")
    // console.log("e2",e2)
    let element = document.querySelector(sel);
    console.log("element",element)
    // console.groupEnd("C")
    return element ? element.innerHTML : element;
  }, '#gwt-debug-tankItem3 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  
  console.log("amounts 1", amounts3)


  let amounts4 = await page.evaluate((sel) => {
    // console.group("C")
    // let e2 = document.getElementsByClassName("tank_item_div_height")
    // console.log("e2",e2)
    let element = document.querySelector(sel);
    console.log("element",element)
    // console.groupEnd("C")
    return element ? element.innerHTML : element;
  }, '#gwt-debug-tankItem4 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)');
  
  console.log("amounts 1", amounts4)

 /* let amounts2 = await page.evaluate(() => {
    // console.group("C")
    let elements = document.getElementsByClassName("tank_item_div_height")
    console.log("elements",elements)
    // console.groupEnd("C")
    return elements ? elements.innerHTML : elements;
  });
  console.log("amounts 2", amounts2)*/

  // const TLS = await page.evaluate(async () => {
  //   //let x = await page.$('#gwt-debug-tankItem1 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1)')
  //   //console.log(x)
  //   //document.querySelector('div[id="_paramName"][class="tank_item_div_height"]').innerText
  //   //document.querySelector('TankLabel').textContent
  //   return Array.from(page.$('tank_item_div_height')).map(x => x.textContent)
  // })
  // console.log(TLS)

  await browser.close();

}

start()



 //await browser.close()
 //})
    //await fs.writeFile("TLS.txt", TLS.join("\r\n"))
    //console.log(TLS)

/* const TLS = await page.evaluate(() => {
 const data = document.querySelector('TankLabel')
return data.innerHTML;*/