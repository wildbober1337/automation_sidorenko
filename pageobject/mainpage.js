const {Page} = require("../pageobject/page.js");
const {By, Key} = require('selenium-webdriver');
const data = require('../data');
let driver;
const nextBtn= "//*[@class='pn']";
const infoBlock ="(.//*[@class ='rc'])"
const searchResultAll = "(.//*[@id ='result-stats'])"
const searchTime = "(.//*[@id ='result-stats'])/nobr"
const searchName = "q"
 class MainPage extends Page {

    async driverInit(){
        driver = await super.getDriver(); 
        (await super.getLogger()).loggerDebug.debug('Init driver');  
    }

    async open() {    
        super.open('https://www.google.com')
    }

    async search() {
        (await super.getLogger()).loggerDebug.debug('search element by name '+ searchName +' and sendKey '+data.searchWord);  
        return driver.findElement(By.name(searchName)).sendKeys(data.searchWord, Key.RETURN);
    }

    async findInfoBlock() {
        (await super.getLogger()).loggerDebug.debug('find block with info from webpage');  
        let result =  driver.findElements(By.xpath(infoBlock));   
        return result;
    }

    async findSearchResultAll() {
        (await super.getLogger()).loggerDebug.debug('get search results and search time');  
        let result = await driver.findElement(By.xpath(searchResultAll)).getText();
        (await super.getLogger()).loggerDebug.debug('result and time = '+ result);  
        return result
    }

    async findSearchTime() {
        (await super.getLogger()).loggerDebug.debug('get search time');  
        let result = await driver.findElement(By.xpath(searchTime)).getText();
        (await super.getLogger()).loggerDebug.debug('search time is '+result); 
        return result
    }
    async nextPage() {
        (await super.getLogger()).loggerDebug.debug('go to next page'); 
        (await driver.findElement(By.xpath(nextBtn))).click();
    }
}
module.exports = new MainPage();