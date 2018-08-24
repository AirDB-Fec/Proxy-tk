const rp = require('request-promise');
const React = require('react');
const ReactDom = require('react-dom/server');

const Photos = require('./public/bundle-server.js');
const layout = require('./templates/layout.js');
const apps = require('./templates/apps.js');
const scripts = require('./templates/scripts.js');
const styles = require('./templates/styles.js');

const route = {
  // bookings: '',
  // reviews: '',
  // productInfo: '',
  photos: 'http://ec2-54-153-97-92.us-west-1.compute.amazonaws.com:3004',
};

const options = function createRequestOptionsObject(id, service) {
  return {
    method: 'GET',
    uri: `${route[service]}/api/rooms/${id}/${service}`,
    json: true,
  };
};

const renderComponent = function renderReactComponent(component, props = {}) {
  const element = React.createElement(component, props);
  return ReactDom.renderToString(element);
};

const get = function getDataFromServices(id, cb) {
  const photos = rp(options(id, 'photos'))
    .then(results => results)
    .catch((err) => {
      console.error(err);
      return [];
    });

  Promise.all([photos])
    .then((arr) => {
      const applet = renderComponent(Photos.default.Applet, { photos: arr[0] });
      const footer = renderComponent(Photos.default.Footer);
      const page = layout(styles(), apps(applet, footer), scripts(arr[0]));
      cb(page);
    })
    .catch(err => console.error(err));
};

module.exports = { route, get };
