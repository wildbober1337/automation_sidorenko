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
    }

    async open() {
         
        super.open('https://www.google.com')
    }

    async search() {
        return driver.findElement(By.name(searchName)).sendKeys(data.searchWord, Key.RETURN);
    }

    async findInfoBlock() {
        return driver.findElements(By.xpath(infoBlock));  
    }

    async findSearchResultAll() {
        let result = await driver.findElement(By.xpath(searchResultAll)).getText();
        return result
    }

    async findSearchTime() {
        let result = await driver.findElement(By.xpath(searchTime)).getText();
        return result
    }

    async getTextElement(element) {
        return await element.getText();
    }

    async nextPage() {
        (await driver.findElement(By.xpath(nextBtn))).click();
    }
}
module.exports = new MainPage();