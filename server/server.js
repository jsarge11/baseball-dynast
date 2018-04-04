const axios = require('axios') 
const express = require('express')
const bodyParser = require('body-parser')
const ctr = require('./controller')

let app = express();

app.use(bodyParser.json());

app.get('/api/players', ctr.read)
app.post('/api/players', ctr.create)
app.put('/api/players:id', ctr.update)
app.delete('/api/players:id', ctr.delete)


let port = 3005;
app.listen(port, ()=>console.log(`The Khala speaks to you on port ${port}, friend`));