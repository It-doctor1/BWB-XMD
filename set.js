
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMksxTmJNMHdpd1p2NjlvZlBEN01Zd2JWUk9HSmtrUG9rTjZnai9pcS8zaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVpiTVNJcnNUOC9lRUpBR1VXYjNNUGdxYWlVbGV2ZkEzN3lGTkJwSW5oZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Qy9SVFBicW8vMnZFVUJwSUVCKzUzU09pMnI1UDkrdXkxNUFRS3dXWDNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZMC85c3IyTHo2ZVhlN2ZzOVZ4MlBlU0dnanRia1RDdjdWMnoyNFB1Yld3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1QNGlmajR1eW0rRUx0dThHYzh3RitSU3NZNE1LNFVJUkYxWXZKR012MVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJTcnFzWFQyTGhnZWNlaXh0dUlBcmZWVjQ4WGliWUtxNHZ4eWFHbG5XVm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0dWcnlHbTZQUWdJTm83NjRnTGs1SXZrUTBUQ0hucGVlbHBMK3RqclhsOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUlZkOVpTUHhmZU9VMktDNXkxYUR1T1NJbzlpTkJhaUZadkdEeVcwMS95dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1nM2Y3MXdibFpweTQwcG1tWGRqN2d6cW55bmtrUHExZU1hc0xNc2o0cDE1b1R2ODZ4cVJhRG9HY0VhdXFQekpIUnQxNEJmVXozYUIzYWVGdVB3cWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzEsImFkdlNlY3JldEtleSI6InZjZllHMjQ1UU5DZW95bStDbHZoZ1p6YzNxOHJualhPRFhlMlVoR2h6SlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ikw1UEJCS1hWIiwibWUiOnsiaWQiOiIyMzM1NDAxOTA5NjM6NzdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSXQncyBQbGVudHkiLCJsaWQiOiIzMzA4NjM1MDk3NDk6NzdAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLL015dmNCRUtuUTdNSUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNY1NnL09xMk56OWdCOGphZ0l5ZmVmVTlYcEhXeTJmK2t4RDZtZ1ZIaVdNPSIsImFjY291bnRTaWduYXR1cmUiOiJ5UzZwY0xpNGRJSVlMNjd5L0JwL2o4QUw0a2RQMXlrd1JEa0pHNERGRnc0NndlQm54bE5qaldzN1QrUjlNbXVvL1BjUkphS3ZHUXdFNU16c3gvZjVEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRENYamdYc0VmNnVkWkZiQ1IyR1EyNFZlVlVOMDcvTDRnaVhGaGhLYXZ3RnQxemdPWW1qZkI0bEVWNURRV2JKZ04xbk9vanhPa2EwNi9kV1hudkQ1Z2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NDAxOTA5NjM6NzdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEhFb1B6cXRqYy9ZQWZJMm9DTW4zbjFQVjZSMXN0bi9wTVErcG9GUjRsaiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwODA0NTM1LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREtDIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233540190963",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
