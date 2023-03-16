const express = require('express');
const bodyParser = require('body-parser');
const webhook = require('discord-webhook-node');
const IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Robux_2019_Logo_gold.svg/1883px-Robux_2019_Logo_gold.svg.png';
const hook = new webhook.Webhook(process.env.WEBHOOK);
hook.setUsername('Global Donations');
hook.setAvatar(IMAGE_URL);

const port = 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function countLetters(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
      count++;

  }
  return count;
}


app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log("NEW DONATION: "+ body.content + " | "+ body.playerID)


    if (body.content === undefined) {
        res.status(400).send('Bad Request');
        return;
    }
  
    if (body.playerID === 1) {
        res.status(400).send('Bad Request');
        return;
    }

    
    if (isNaN(body.content)) {
        console.log("NOT A NUMBER")
        res.status(400).send('Bad Request');

        return;
    }
  
    if (countLetters(body.content) > 6) {
        console.log("TOO MANY LETTERS")
        res.status(400).send('Bad Request');

        return;
    }
      if (body.content < 1) {
        console.log("TOO LITTLE LETTERS")
        res.status(400).send('Bad Request');

        return;
    }
    const newMessage = "Someone was just donated **R$" + body.content + "** while using the script!"
    const newMessageTwo = newMessage.replace(/\n/g, "");
  
    hook.send(newMessageTwo);
   
});


app.listen(port, () => console.log('Started\nPORT: ' + port));
