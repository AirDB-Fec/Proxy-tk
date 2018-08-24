const express = require('express');
const cors = require('cors');
const cluster = require('cluster');
const path = require('path');
const proxy = require('http-proxy-middleware');
const numCPUs = require('os').cpus().length;
const services = require('./services.js');

const { route } = services;

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());


/* Client Side Rendering:

app.use('/client/:id/', express.static('public'));

app.get('/client/:id/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/main.css'));
});

app.get('/client/:id/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/bundle.js'));
});

*/

app.get('/rooms/:id/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/bundle.js'));
});

app.get('/rooms/:id/*', (req, res) => {
  services.get(req.params.id, (html) => {
    res.end(html);
  });
});

// app.use('/api/rooms/:id/bookings', proxy({ target: route.bookings, changeOrigin: true }));
// app.use('/api/rooms/:id/reviews', proxy({ target: route.reviews, changeOrigin: true }));
// app.use('/api/rooms/:id/product-info', proxy({ target: route.productInfo, changeOrigin: true }));
app.use('/api/rooms/:id/photos', proxy({ target: route.photos, changeOrigin: true }));

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
  });
}
