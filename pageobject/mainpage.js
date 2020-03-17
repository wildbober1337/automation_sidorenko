const {Page} = require("../pageobject/page.js");

const loginSelector = 'android=new UiSelector().className("android.widget.TextView").textContains("Login")';

const loginInputSelector = 'android=new UiSelector().resourceId("user_username")';
const passwordInputSelector = 'android=new UiSelector().resourceId("user_password")';
const signInSelector = 'android=new UiSelector().resourceId("submit")';

const errorMessageselector = 'android=new UiSelector().className("android.view.View").textContains("error!")';

class MainPage extends Page {
     
async pressLogin(){
    (await super.getLogger()).loggerDebug.debug('Start Press Login Button');
    const login = await $(loginSelector);
    await login.click();
    (await super.getLogger()).loggerDebug.debug('End Press Login Button');
}

async inputLogin(){
    (await super.getLogger()).loggerDebug.debug('Start Input Login');
    const login = await $(loginInputSelector);
    await login.setValue(await super.randomGenerator());
    (await super.getLogger()).loggerDebug.debug('End Input Login');
}

async inputPassword(){
    (await super.getLogger()).loggerDebug.debug('Start Input Password');
    const password = await $(passwordInputSelector);
    await password.setValue(await super.randomGenerator());
    (await super.getLogger()).loggerDebug.debug('End Input Password');
}

async pressSignIn(){
    (await super.getLogger()).loggerDebug.debug('Start Press Sign In Button');
    const signIn = await $(signInSelector);
    await signIn.click();
    (await super.getLogger()).loggerDebug.debug('End Press Sign In Button');
}

async getTextError(){
    (await super.getLogger()).loggerDebug.debug('Start Get Error Text');
    const error = await $(errorMessageselector);
    (await super.getLogger()).loggerDebug.debug('End Get Error Text');
    return await error.getText(); 
}
   
}
module.exports = new MainPage();