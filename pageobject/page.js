const {Builder, By, Key} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
let driver;
class Page {
 async getDriver(){
   
    switch (process.argv[2].replace('--browser=', '')) {
       
        case 'chrome':
             driver = new Builder()
                .forBrowser('chrome')
                .build();
                console.log("start chrome");
                return driver;
            break;
        case 'firefox':
             driver = new Builder()
                .forBrowser('firefox')
                .build();
                console.log("start firefox");
                return driver;
            break;
        default: 
            console.log("default arg, start chrome");
            driver = new Builder()
            .forBrowser('chrome')
            .build();
            return driver;
            break;
    }
 }
 async open(link){
    await driver.get(link);
 }

 async close(){
    await driver.quit();
 }
}
module.exports = {
    Page: Page
};
