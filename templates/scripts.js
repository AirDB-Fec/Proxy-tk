module.exports = () => `
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script type="text/javascript" src="bundle.js"></script>
  <script>
    ReactDOM.hydrate(React.createElement(Applet), document.getElementById('photo'));
    ReactDOM.hydrate(React.createElement(Footer), document.getElementById('footer'));
  </script>
`;
