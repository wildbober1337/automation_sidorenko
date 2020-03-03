const data = require('../data');
let searchResults
let searchTime

const Mainpage = require("../pageobject/mainpage.js");

beforeAll(async () => {
    let name = process.argv[2];
    console.log("arg: " + name);
    await Mainpage.driverInit(process.argv[2]);
    await Mainpage.open();
    await Mainpage.search();
    
}, 15000);

describe('Google search', () => {
    afterEach(async () => {
       await Mainpage.nextPage();
    }, 15000);
    it(`need to contain the word "${data.searchWord} in the first page`, async () => {
        let results = await Mainpage.findInfoBlock();
        for (result of results) {
          let resultText = await result.getText();
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
    it(`need to contain the word "${data.searchWord} in the second page`, async () => {
        results = await Mainpage.findInfoBlock();
        for (result of results) {
          let resultText = await result.getText();
          expect(resultText.toLowerCase()).toContain(data.searchWord.toLowerCase());
        }
    }, 15000);
});

describe('Search results', () => {
    it(`count need be greater than the ${data.countResults}`, async () => {
        searchResults = await Mainpage.findSearchResultAll();
        searchTime = await Mainpage.findSearchTime();
        expect(Number(searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''))).toBeGreaterThan(data.countResults);
      })
}); 

afterAll(async () => {
    console.log("\n"+"searchResults = "+searchResults.match(/[0-9]+(.[0-9]+)?/)[0].replace(/\s/, ''));
    console.log("searchTime = "+searchTime);
    await Mainpage.close();
});