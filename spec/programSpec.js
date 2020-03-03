const {Builder, By, Key} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');
const data = require('../data');
let searchResults
let searchTime

switch (process.argv[2].replace('--browser=', '')) {
    case 'chrome':
        driver = new Builder()
            .forBrowser('chrome')
            .build();
        break;
    case 'firefox':
        driver = new Builder()
            .forBrowser('firefox')
            .build();
        break;
    default: 
        console.log("wrong arg, try again and choose chrome or firefox")
        break;
}

beforeAll(async () => {
    let name = process.argv[2];
    console.log("arg: " + name);
    await driver.get('https://www.google.com');
    await driver.findElement(By.name("q")).sendKeys("iTechArt", Key.RETURN);
}, 15000);

describe('Google search', () => {
    afterEach(async () => {
        (await driver.findElement(By.xpath("//*[@class='pn']"))).click();
    }, 15000);
    it(`is not contained the word "${data.searchWord} in the first page`, async () => {
        let results = await driver.findElements(By.xpath("(.//*[@class ='rc'])"));
        for (result of results) {
          let resultText = await result.getText();
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
    it(`is not contained the word "${data.searchWord} in the second page`, async () => {
        results = await driver.findElements(By.xpath("(.//*[@class ='rc'])"));
        for (result of results) {
          let resultText = await result.getText();
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
});

describe('Search results', () => {
    it(`count less than the ${data.countResults}`, async () => {
        searchResults = await driver.findElement(By.xpath("(.//*[@id ='result-stats'])")).getText();
        searchTime = await driver.findElement(By.xpath("(.//*[@id ='result-stats'])/nobr")).getText();
        expect(Number(searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''))).toBeGreaterThan(data.countResults);
      })
}); 

afterAll(async () => {
    console.log("\n"+"searchResults = "+searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''));
    console.log("searchTime = "+searchTime);
    await driver.quit();
});