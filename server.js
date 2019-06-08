const express = require('express');

const app = express();

//  port

const PORT = process.env.PORT || 5000;

//  routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log('server started'));
