const Logger = require("../logger/logger.js");

const logoSelector = '~Login Logo';
const QA1Selector = 'android=new UiSelector().className("android.widget.TextView").textContains("QA1")';
const backSelector = 'android=new UiSelector().className("android.widget.ImageView").textContains("QA1")';

class Page {

async getLogger(){
     return Logger;
}

async setQA1(count){
    Logger.loggerDebug.debug('Start setting QA!');
    Logger.loggerDebug.debug('start click '+ count + ' times ');
    const logo = await  $(logoSelector);
        for(let i =0; i < count; i ++){
            await logo.click();
        }
    Logger.loggerDebug.debug('end click');
    const QA1 = await  $(QA1Selector);
    await QA1.click();
    Logger.loggerDebug.debug('End setting QA!');
    
} 

async pressBack(){
    Logger.loggerDebug.debug('Press Back Button');
    await driver.back();
}

async randomGenerator(){
    Logger.loggerDebug.debug('Start Generate Random Text');
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        Logger.loggerDebug.debug('End Generate Random Text');
    return text;
}
}



module.exports = {
    Page: Page,
    Logger: Logger
};