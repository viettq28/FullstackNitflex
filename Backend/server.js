const app = require('./app');

const port = 5000;
app.listen(port, (req, res) => {
  console.log('listening on port ' + port);
});