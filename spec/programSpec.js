const data = require('../data');
let searchResults
let searchTime

const Mainpage = require("../pageobject/mainpage.js");
const Logger = require("../logger/logger.js");
beforeAll(async () => {
    await Mainpage.driverInit();
    await Mainpage.open();
    await Mainpage.search();   
}, 15000);

describe('Google search', () => {
    Logger.loggerInfo.info('Start test Google search');
    afterEach(async () => {
       await Mainpage.nextPage();
    }, 15000);
    it(`need to contain the word "${data.searchWord} in the first page`, async () => {
        Logger.loggerInfo.info(`Test : need to contain the word "${data.searchWord} in the first page`);
        let results = await Mainpage.findInfoBlock();
        for (result of results) {
          let resultText = await result.getText();
          Logger.loggerInfo.info(`Test : results in the first page = `+resultText);
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
    it(`need to contain the word "${data.searchWord} in the second page`, async () => {
        Logger.loggerInfo.info(`Test : need to contain the word "${data.searchWord} in the second page`);
        results = await Mainpage.findInfoBlock();
        for (result of results) {
          let resultText = await result.getText();
          Logger.loggerInfo.info(`Test : results in the first page = `+resultText);
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
});

describe('Search results', () => {
    Logger.loggerInfo.info('Start test Search results');
    it(`count need be greater than the ${data.countResults}`, async () => {
        Logger.loggerInfo.info(`Test: count need be greater than the ${data.countResults}`);
        searchResults = await Mainpage.findSearchResultAll();
        searchTime = await Mainpage.findSearchTime();
        expect(Number(searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''))).toBeGreaterThan(data.countResults);
      })
}); 

afterAll(async () => {
    Logger.loggerInfo.info("\n"+"searchResults = "+searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''));
    Logger.loggerInfo.info("searchTime = "+searchTime);
    await Mainpage.close();
});