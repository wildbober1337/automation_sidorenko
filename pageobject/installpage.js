const { Page, Logger} = require('../pageobject/page.js');
const  {By} = require('selenium-webdriver');
const data = require('../data');
const path = require('path');
const fs = require('fs');

const installSteamSelector = "div.header_installsteam_btn.header_installsteam_btn_green > a";
const installSteamLinkSelector = "div.about_install_wrapper > div.about_install.win > a";
let driver;
class InstallPage extends Page {

   

    async goToInstallSteamPage() {
        driver = await super.driver();
        Logger.loggerDebug.debug(`go to install steam client page`);
        let element = await driver.findElement(By.css(installSteamSelector));
        await element.click();
    }

    async startInstallSteamClient() {
        driver = await super.driver();
        Logger.loggerDebug.debug(`start download`);
        let element = await driver.findElement(By.css(installSteamLinkSelector));
        await element.click();
        let count = 0;
        
        while(!await this.checkDownloadFileStatus()) {
            if(count < 20){
                await driver.sleep(100);
                count++;
            }
            else{
                Logger.loggerError.error(`Could not download steam file in 20 seconds.`);
                return false;
            }
            
        }
        return true;
    }

    

    async checkDownloadFileStatus() {
        Logger.loggerDebug.debug(`start to check download file status`);
        let files = fs.readdirSync(data.downloadPath);
        for(let file of files) {
            if(file.toLowerCase().includes(data.fileName.toLowerCase())) {
                if(path.extname(file) != '.crdownload') {
                    Logger.loggerDebug.debug(`found steam file. return true`);
                    return true;
                }
            }
        }
        Logger.loggerDebug.debug(`steam file not found. return true`);
        return false;
    }
}
module.exports = {
  moduls : new InstallPage(),
 
}