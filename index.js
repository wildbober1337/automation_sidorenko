"use strict";
let webdriver = require('selenium-webdriver');
let chromedriver = require('chromedriver');
let browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

browser.get('https://www.onliner.by/');

browser.findElements(webdriver.By.id('container')).then(function(links){
    console.log('Found', links.length, 'id elements.' )  
});
browser.findElements(webdriver.By.name('yandex-verification')).then(function(links){
    console.log('Found', links.length, 'name elements.' )  
});
browser.findElements(webdriver.By.className('g-bottom')).then(function(links){
    console.log('Found', links.length, 'className elements.' )  
});
browser.findElements(webdriver.By.tagName('body')).then(function(links){
    console.log('Found', links.length, 'tagName elements.' )  
});
browser.findElements(webdriver.By.linkText('Наушники и гарнитуры')).then(function(links){
    console.log('Found', links.length, 'linkText elements.' )  
});
browser.findElements(webdriver.By.partialLinkText("Ноутбуки")).then(function(links){
    console.log('Found', links.length, 'partialLinkText elements.' )  
});

browser.findElements(webdriver.By.css('[href="https://gc.onliner.by/favicon.ico"]')).then(function(links){
    console.log('Found', links.length, 'onliner links.' )
    browser.close();
});



