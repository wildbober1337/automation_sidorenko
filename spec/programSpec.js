const data = require('../data');
const googleApi = require("../googlePage.js")
const Logger = require("../logger/logger.js");

beforeAll(async () => {
    Logger.loggerDebug.debug("Starting tests");
});

afterAll(async () => {
    Logger.loggerDebug.debug("All tests are done");
});

describe("Gmail mails ",() => {
    it(`amount need be equal ${data.mailsAmount}`,async () => {
        Logger.loggerInfo.info(`Gmail mails amount need be equal ${data.mailsAmount}`);
        expect(await googleApi.getMailsAmount()).toEqual(data.mailsAmount);
    }, 30000);

    it(`need to contains ${data.subjectToFind} word`,async () => {
        Logger.loggerInfo.info(`Gmail mails need to contains ${data.subjectToFind} word`);
        for(let messages of (await googleApi.getAllMails())) {
            let subject = (await googleApi.getMailHeader(messages.id));
           if(subject.includes(data.subjectToFind)){
            let body = await googleApi.getMailBody(messages.id);
            let deadline = await googleApi.getMailDeadline(messages.id);
          
            Logger.loggerInfo.info(`Задание: ${subject}. Срок выполнения: ${deadline}\n
            Тело письма:\n
            ${body}`);
           }
           expect(subject).toContain(data.subjectToFind);
        }

    }, 30000);
});
