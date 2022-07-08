
const puppeteerChrome = require('puppeteer');

(async () => {
    const test = async browser => {
        const page = await browser.newPage();
        await page.setViewport({
            width: 1280,
            height: 800
        });
        await page.goto('https://essotheone.thaiddns.com:4433/#LogIn');
        await page.type('#gwt-debug-userNameTextBox', "seniorproject");
        await page.type('#gwt-debug-userPasswordTextBox', "vmsseniorproject2");
        await page.click("#gwt-debug-signInButton")
        //await browser.close();
     
            const data = await page.evaluate(()=>{
                const tank = document.querySelectorAll('TankLabel').innerText
                return tank.innerText;
            })
              console.log(data)


    }

    const chrome = await puppeteerChrome.launch({
        headless: false,
        slowMo: 50,
        product: 'firefox',
        ignoreHTTPSErrors: true, 
        acceptInsecureCerts: true, 
        args:['--ignore-certificate-errors'],
        executablePath: 'C:/Program Files/Mozilla Firefox/firefox.exe'

        
    });
    await test(chrome);
    

})();



