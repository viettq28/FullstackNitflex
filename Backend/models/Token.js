const fs = require('fs');
const path = require('path');
const tokensPath = path.join(__dirname, '..', 'models', 'datas', 'userToken.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath).toString());
// Authorize token on routes
class Token {
  static findUserToken(token) {
    return tokens.find(user => user.token === token);
  }
}

module.exports = Token;