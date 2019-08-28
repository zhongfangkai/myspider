const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false,
        defaultViewport: {
            width: 1600,
            height: 900
        }
    });

    const page = await browser.newPage();

    await page.goto('http://www.sunnoe.com');

    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });
    console.log('Dimensions:', dimensions);

    var content = await page.content();

    console.log('page content => ', content);

    await page.screenshot({
        path: 'resource/sunnoe.png'
    });

    console.log('page screenshot is done!');

    await page.pdf({
        path: 'resource/sunnoe.pdf',
        format: 'A6'
    });
    
    console.log('page pdf is done!');

    await browser.close();
})();