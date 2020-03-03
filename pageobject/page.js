const {Builder} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
let driver;
const Logger = require("../logger/logger.js");
class Page {
 async getDriver(){
    switch (process.argv[3].replace('--browser=', '')) {
        case 'chrome':
             driver = new Builder()
                .forBrowser('chrome')
                .build();
                return driver;
            break;
        case 'firefox':
             driver = new Builder()
                .forBrowser('firefox')
                .build();
                return driver;
            break;
        default: 
        Logger.loggerError.debug("wrong arg, try again and choose chrome or firefox");
        break;
    }
 }
 async open(link){
    Logger.loggerDebug.debug('open '+link);
    await driver.get(link);
 }

 async close(){
    Logger.loggerDebug.debug('close driver');
    await driver.quit();
 }
async getLogger(){
     return Logger;
}

}
module.exports = {
    Page: Page
};
