const fs = require("fs"),
    {google} = require("googleapis"), 
    data = require("./data"),
    base64 = require("base64url");
    const Logger = require("./logger/logger.js");
    
    

function authorize() {
  Logger.loggerDebug.debug("Start authorize");
  const credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = fs.readFileSync(data.TOKEN_PATH, 'utf8');
  if(token == null){ 
    throw new Error("Token file has not been found");
  }
  oAuth2Client.setCredentials(JSON.parse(token));
  Logger.loggerDebug.debug("Done authorize");
  return oAuth2Client;
}

async function getAllMails() {
  const auth = authorize();
  const gmail = google.gmail({version: 'v1', auth});
  const res2 = await gmail.users.messages.list({
    userId: "me"
  });
  if(!res2) {
    throw new Error("Error from getting Mails");
  }
  Logger.loggerDebug.debug("Done getting all Mails");
  return res2.data.messages;
}

async function getMailsAmount() {
  const amount = (await getAllMails()).length;
  Logger.loggerDebug.debug(`Got amount of all messages (${amount})`);
  return amount;
}

async function getMailDeadline(messageId) {
  Logger.loggerDebug.debug(`Start getting deadline`);
  const body = await getMailBody(messageId);
  if(!body.includes(data.deadlineParseStart)) {
      Logger.loggerError.error(`The mail does not contain deadline`);
      return "";
  }
  let deadline = body.substring(body.indexOf(data.deadlineParseStart));
  deadline = deadline.substring(0, deadline.indexOf(data.deadlineParseEnd))
  .replace(data.deadlineParseStart, "");
  Logger.loggerDebug.debug(`Getting deadline done :  (${deadline})`);

  return deadline;
}

async function getMailBody(msgId){
  Logger.loggerDebug.debug(`Start getting mail body`);
  const auth = authorize();
  const gmail = google.gmail({version: 'v1', auth});
  console.log(`start getMail`);
  const res = await gmail.users.messages.get({
      'userId': "me",
      'id': msgId
  });
      if(res){
        let body;
         if(res.data.payload.body.size > 0)
             body = base64.decode(res.data.payload.body.data);
         else 
             body = base64.decode(res.data.payload.parts[0].body.data);
        Logger.loggerDebug.debug(`Done getting message body : ` + body);
        return body; 
      }
}

async function getMailHeader(msgId){
  Logger.loggerDebug.debug(`Start getting mail subject`);      
  const auth = authorize();
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.messages.get({
      'userId': "me",
      'id': msgId
  });
      if(res){
        let subject = getSubject(res.data.payload.headers);
        console.log(subject);
        Logger.loggerDebug.debug(`Done getting mail subject`);      
        return subject;
    }
}

function getSubject(resdata){
  for(let obj of resdata) {
    if(obj.name === "Subject"){
    return obj.value;
    }
  }
  Logger.loggerError.error(`the mail does contain subject` + obj.value);
  return "";  
}

module.exports = {
  getMailsAmount: getMailsAmount,
  getAllMails: getAllMails,
  getMailBody: getMailBody,
  getMailHeader: getMailHeader,
  getMailDeadline: getMailDeadline
};


