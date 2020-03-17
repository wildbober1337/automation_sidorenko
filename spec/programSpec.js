const data = require('../data');
let searchResults
let searchTime

const Mainpage = require("../pageobject/mainpage.js");
const GamePage = require("../pageobject/gamespage.js");
const InstallPage = require("../pageobject/installpage.js");
const VerificationPage = require("../pageobject/ageverificationpage.js");
const {driver, Page} = require('../pageobject/page.js');
const Logger = require("../logger/logger.js");
beforeAll(async () => {
    await Mainpage.driverInit();
    await Mainpage.open();
    await Mainpage.openGamesLink();   
    await Mainpage.openActionsLink();  
}, 15000);

describe('Steam test results', () => {
    Logger.loggerInfo.info('need to be Equal price or discount on the page with games and main game page');
    it(`need to be Equal price or discount on the page with games and main game page`, async () => {
      let discount = await GamePage.moduls.findMaxValueofPriceOrDiscount(GamePage.gameBlockSelectorDiscount);
      let price = await GamePage.moduls.findMaxValueofPriceOrDiscount(GamePage.gameBlockSelectorPrice);
      if(discount.length != 0){ //discount 
        Logger.loggerDebug.debug('discount found '+discount);
        await GamePage.moduls.goToElement(GamePage.gameBlockSelectorDiscount,discount);
        if(await VerificationPage.moduls.needVerification()){
          await VerificationPage.moduls.setValidDate();
          await VerificationPage.moduls.enterGamePage();
        }
        expect(await GamePage.moduls.findValueofPriceOrDiscount(GamePage.gameSelectorDiscount)).toEqual(discount);
        } else {
          Logger.loggerDebug.debug('discount not found '+price);
          await GamePage.moduls.goToElement(GamePage.gameBlockSelectorPrice,price);
          if(await VerificationPage.moduls.needVerification()){
            await VerificationPage.moduls.setValidDate();
            await VerificationPage.moduls.enterGamePage();
          }
          expect(await GamePage.moduls.findValueofPriceOrDiscount(GamePage.gameSelectorPrice)).toEqual(price);
        }          
      })
      Logger.loggerInfo.info('steam file client need to be download with status true');
      it(`steam file client need to be download with status true`, async () =>{
        await InstallPage.moduls.goToInstallSteamPage(); 
        expect(await InstallPage.moduls.startInstallSteamClient()).toBe(true);
      })
}); 

afterAll(async () => {
    await Mainpage.close();
});