const {Page} = require("../pageobject/page.js");
const {By} = require('selenium-webdriver');

let driver;
let actions;
let mouse;

const gamesLink ="(.//*[@class ='pulldown_desktop'])[2]"
const actionsLink ='[href="https://store.steampowered.com/tags/ru/%D0%AD%D0%BA%D1%88%D0%B5%D0%BD/?snr=1_4_4__12"]'


 class MainPage extends Page {

    async driverInit(){
        driver = await super.getDriver(); 
        actions = driver.actions({async: true});
        mouse = actions.mouse();  
        (await super.getLogger()).loggerDebug.debug('Init driver');  
    }

    async open() {    
        super.open('https://store.steampowered.com/')
    }

    async openGamesLink() {
        (await super.getLogger()).loggerDebug.debug('open games link');
        let element = await driver.findElement(By.xpath(gamesLink));
        actions.pause(mouse).move({duration:1,origin:element,x:0,y:0}).perform();
        (await super.getLogger()).loggerDebug.debug('close games link');
    }

    async openActionsLink() {
        (await super.getLogger()).loggerDebug.debug('open actions link');  
        (await driver.findElement(By.css(actionsLink))).click();
        (await super.getLogger()).loggerDebug.debug('close actions link');  
    }
}
module.exports = new MainPage();