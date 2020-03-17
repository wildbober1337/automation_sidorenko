const assert = require('assert')
const Mainpage = require("../pageobject/mainpage.js");
const Logger = require("../logger/logger.js");

describe('This android application', () => {
    Logger.loggerInfo.info('This android application');
    it('must return some error text after input wrong login and password', async () => {
        Logger.loggerInfo.info('must return some error text after input wrong login and password');
        await Mainpage.setQA1(5);
        await Mainpage.pressBack();
        await Mainpage.pressLogin();
        await Mainpage.inputLogin();
        await Mainpage.inputPassword();
        await Mainpage.pressSignIn();
        const errorTest = await Mainpage.getTextError();
        expect(errorTest).toContain('error!');
    })
})