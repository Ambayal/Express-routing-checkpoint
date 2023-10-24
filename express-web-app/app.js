const express = require('express');
const app = express();
const port = 3000;

// Middleware to check if it's within working hours (Monday to Friday, 9-17)
const isWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue with the request
  } else {
    res.send('This web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Serve static files from the public folder
app.use(express.static('public'));

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Routes
app.get('/', isWorkingHours, (req, res) => {
  res.render('home');
});

app.get('/services', isWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', isWorkingHours, (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
