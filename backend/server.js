const express = require('express');
const imageRoutes = require('./routes/imageRoutes');

require('dotenv').config();

const app = express();

app.use('/', imageRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


