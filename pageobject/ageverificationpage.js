const { Page, Logger} = require('./page.js');
const  {By} = require('selenium-webdriver');
let driver;

let ageSelector = 'option:nth-child(35)';
const enterPageSelector = ' a:nth-child(1) > span';

class AgeVerificationPage extends Page {

    async needVerification() {
        driver = await super.driver();
      if((await driver.getCurrentUrl()).includes('agecheck')){
        Logger.loggerDebug.debug(`need to get age verification`);
        return true;
      } else {
        Logger.loggerDebug.debug(`dont need to get age verification`);
        return false;
      }
    }

    async setValidDate() {
        driver = await super.driver();
        Logger.loggerDebug.debug(`Entering valid date`);
        let element = await driver.findElement(By.css(ageSelector));
        await element.click();
    }

    async enterGamePage() {
        driver = await super.driver();
        Logger.loggerDebug.debug(`start to view page`);
        let element = await driver.findElement(By.css(enterPageSelector));
        await element.click();
    }

  

}

module.exports = {
    moduls: new AgeVerificationPage(),
}