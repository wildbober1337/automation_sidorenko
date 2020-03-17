const { Page, Logger} = require('../pageobject/page.js');
const  {By} = require('selenium-webdriver');
const gameBlockSelectorDiscount = "div.discount_block.tab_item_discount > div.discount_pct";
const gameBlockSelectorPrice = "div.discount_block.tab_item_discount > div.discount_prices > div.discount_final_price";

const gameSelectorDiscount = "div.discount_pct";
const gameSelectorPrice = "div.discount_final_price";
let driver;
class GamePage extends Page {



async findMaxValueofPriceOrDiscount(selector) {
  driver = await super.driver();
    (await super.getLogger()).loggerDebug.debug('find game block with value from steam page');  
    let results = await driver.findElements(By.css(selector));  
    let maxValue = 0;
    for(let result of results) {
        let text = await result.getText();
      maxValue = super.getMaxValue(maxValue, super.parseValue(text));
    }
    (await super.getLogger()).loggerDebug.debug(`maxValue ${maxValue}`);  
    return maxValue;
}

async findValueofPriceOrDiscount(selector) {
    driver = await super.driver();
    Logger.loggerDebug.debug(`try to find text from element ${selector}`);  
      let element = await driver.findElement(By.css(selector));   
      let text = await element.getText();  
      Logger.loggerDebug.debug(`result ${super.parseValue(text)}`);
      return super.parseValue(text);;
  }


 


async goToElement(cssSelector, text){
  driver = await super.driver();
  Logger.loggerDebug.debug(`try to find element with ${text}`);
  let elements
  try {
    elements = await driver.findElements(By.css(cssSelector));
    Logger.loggerDebug.debug(`Find ${elements.length} elements with cssSelector ${cssSelector}.`);
      for(let element of elements) {
          if((await element.getText()).includes(text)) {
            Logger.loggerDebug.debug(`Go to element with text ${text}.`);
                element.click();        
          }
      }
    } catch (error) {
        Logger.loggerDebug.debug(`Error == ${error}`);
      }
}

}
module.exports = {
  moduls : new GamePage(),
  gameBlockSelectorDiscount:gameBlockSelectorDiscount,
  gameBlockSelectorPrice : gameBlockSelectorPrice,
  gameSelectorDiscount : gameSelectorDiscount,
  gameSelectorPrice: gameSelectorPrice
}