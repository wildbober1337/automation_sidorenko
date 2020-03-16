const subjectToFind = "Automation",
    deadlineParseStart = "Срок его выполнения – </span><b><span lang=RU style='font-size:12.0pt'>",
    deadlineParseEnd = "<span style='color:black'>",  
    TOKEN_PATH = './token.json',
    mailsAmount = 2;



module.exports = {
    subjectToFind: subjectToFind,
    deadlineParseStart: deadlineParseStart,
    deadlineParseEnd: deadlineParseEnd,
    TOKEN_PATH: TOKEN_PATH,
    mailsAmount: mailsAmount
};