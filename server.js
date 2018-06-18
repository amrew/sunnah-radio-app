const http = require('http');
const port = 3000;
const axios = require('axios');

const requestHandler = (request, response) => {
  axios.get('http://radioislam.or.id/media/player').then(function(result) {
    const html = result.data.split('nonce":"')[1];
    const nonce = html.split('","logo_rii"');
    response.end(nonce[0]);
  })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})