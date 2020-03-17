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
        Logger.loggerError.error("wrong arg, try again and choose chrome or firefox");
        break;
    }
 }

 parseValue(value) {
    Logger.loggerDebug.debug("start parse " + value);
    if(value.includes('-')) value = value.replace('-', '');
    if(value.includes('%')) value = value.replace('%', '');
    if(value.includes('$')) value = value.replace('$', '');
    if(value.includes(' ')) value = value.replace(' ', '');
    if(value.includes('USD')) value = value.replace('USD', '');
    Logger.loggerDebug.debug("parse value " + value);
    return parseFloat(value);
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

async driver(){
    return driver;
}

getMaxValue(firstValue, secondValue) {
    Logger.loggerDebug.debug("start get max value " + firstValue + " & " +secondValue);
    if(isNaN(firstValue) && !isNaN(secondValue)){
        Logger.loggerDebug.debug("Max value " + secondValue );
        return secondValue;
    }

    if(!isNaN(firstValue) && isNaN(secondValue)){
        Logger.loggerDebug.debug("Max value " + firstValue );
        return firstValue;
    }

    if(firstValue > secondValue ){
        Logger.loggerDebug.debug("Max value " + firstValue );
      return firstValue;
    }
    else{
        Logger.loggerDebug.debug("Max value " + secondValue );
      return secondValue;
    }
  }

}
module.exports = {
    Page : Page,
    driver : driver,
    Logger : Logger
};
