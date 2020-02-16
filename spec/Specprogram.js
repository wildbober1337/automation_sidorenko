const {Builder, By, Key, until} = require('selenium-webdriver');
let chromedriver = require('chromedriver');
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await driver.get('https://www.google.com');

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('ITechArt', Key.ENTER);

        

        let firstResult = await driver.wait(until.elementLocated(By.xpath("(.//*[@class ='iUh30 tjvcx' ])[1]")), 10000);

        console.log(await firstResult.getAttribute('textContent'));
        describe("Player", function() {
            it("should be able to play a Song", function() {
              
                expect(firstResult.getAttribute('textContent')).toEqual('www.itechart.by');
              });
        });
    }
    finally{
        driver.quit();
    }
})();


//(.//*[@class ='iUh30 tjvcx' ])[1]