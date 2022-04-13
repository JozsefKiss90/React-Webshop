const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const items = require('./routes/api/items')
const images = require('./routes/api/images')
const createCheckoutSession = require('./routes/api/checkout');
const dotenv = require('dotenv')
const paymentIntent = require('./routes/api/paymentintent');
const webhook = require('./routes/api/webhook');
dotenv.config()
const app = express()

app.use(express.json({
  verify: (req, res, buffer) => req['rawBody'] = buffer, 
}));

app.use(cors({ origin: true }));

const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
.then(()=>console.log('database connected'))
.catch(err=>console.log(err))

app.use('/api/items', items)
app.use('/api/images', images)
  
app.post('/create-checkout-session', createCheckoutSession);

if(process.env.NODE_ENV==='production') {
  app.use(express.static('client/build'))

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.post('/webhook', webhook);

app.post('/create-payment-intent', paymentIntent);

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`server started on ${port}`))