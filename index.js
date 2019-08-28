// 引入 puppeteer 模块
const puppeteer = require('puppeteer');
// 引入 cheerio 模块
const cheerio = require('cheerio')
// 引入fs模块
var fs = require('fs'); 

// sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
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

    const $ = cheerio.load(content);
    
    var list = $('.stream-list .stream-item');

    var data = [];
    var item;

    for(var i=0;i<list.length;i++){
        item = $(list[i]);
        data[i] = {};
        data[i]['title'] = item.find('.doc_node_title').text().trim();
        data[i]['content'] = item.find('.doc_node_content').text().trim();
        // data[i]['info'] = item.find('.side_unit_info').html().trim();
    }
    
    console.log(data);

    fs.writeFileSync('./data.json',JSON.stringify(data),function(error){
        if(error){
            console.log('写入失败');
        }else{
            console.log('写入成功');
        }
    });

    // fs.close();

    // console.log(list);
    // await page.screenshot({
    //     path: 'resource/sunnoe.png'
    // });

    // console.log('page screenshot is done!');

    // await page.pdf({
    //     path: 'resource/sunnoe.pdf',
    //     format: 'A6'
    // });
    
    // console.log('page pdf is done!');

    console.log('sleep 5 second');

    await sleep(5000);

    console.log('sleep 5 second done');

    await browser.close();
})();