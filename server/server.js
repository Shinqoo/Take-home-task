const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors')

app.use(cors());
app.use(express.json())


app.get("/api", (req, res) => {
  request.get({
      url: 'https://api.api-ninjas.com/v1/quotes',
      headers: {
          'X-Api-Key': '29muPUBHGVo46Z6TihSNYw==3OQG9QFVYIWIltnL'
      },
  }, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else res.send(body);
  });
});
app.listen(5000, () => {
    console.log("Server has started");
});