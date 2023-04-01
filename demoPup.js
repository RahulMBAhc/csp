  const puppeteer = require('puppeteer');
    async function main() {
       const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://bine.morg.in');
        
        await page.type('input[name=user_name]', 'offerplant');
        await page.type('input[name=user_pass]', 'Plant!2017');
        await page.evaluate( () => {
            document.querySelector('span[id=login_btn]').click();
           
        });
        page.waitForNetworkIdle().then(async ()=>{
                console.log("loggedIn",page.url());
                await page.type('input[id=search_text]','add');
                await page.evaluate( () => {
                    document.querySelector('button[id=search-btn]').click();
                   
                });
         })
    }
module.exports=main