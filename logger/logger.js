const log4js = require('log4js');
log4js.configure({
  appenders: {       
        debug: { type: 'file', filename: 'logs/debug.log' },
        info:  { type: 'file', filename: 'logs/info.log'  },
        warn:  { type: 'file', filename: 'logs/warn.log'  },
        error: { type: 'file', filename: 'logs/error.log' },
        fatal: { type: 'file', filename: 'logs/fatal.log' },
        trace: { type: 'file', filename: 'logs/trace.log' },
        console: {type: 'console'}
    },
  categories: {
        default:{ appenders: ['info' ,'console'],  level: 'info' },  
        debug:  { appenders: ['debug','console'], level: 'debug' },    
        info:   { appenders: ['info' ,'console'],  level: 'info' },
        warn:   { appenders: ['warn' ,'console'],  level: 'warn' },
        error:  { appenders: ['error','console'], level: 'error' },     
        fatal:  { appenders: ['fatal','console'], level: 'fatal' },
        trace:  { appenders: ['trace'], level: 'trace' },
    }
});

let loggerDebug = log4js.getLogger('debug'),
    loggerInfo = log4js.getLogger('info'),
    loggerWarn = log4js.getLogger('warn'),
    loggerError = log4js.getLogger('error'),
    loggerFatal = log4js.getLogger('fatal'),
    loggerTrace = log4js.getLogger('trace');  

module.exports = {
    loggerDebug : loggerDebug,
    loggerInfo : loggerInfo,
    loggerWarn : loggerWarn,
    loggerError : loggerError,
    loggerFatal : loggerFatal,
    loggerTrace : loggerTrace
}

// loggerTrace.trace('loggerTrace');
// loggerDebug.debug('loggerDebug');
// loggerInfo.info('loggerInfo');
// loggerWarn.warn('loggerWarn');
// loggerError.error('loggerError');
// loggerFatal.fatal('loggerFatal');