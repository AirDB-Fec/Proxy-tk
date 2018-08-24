module.exports = (photos, footer) => `
  <div id="header"></div>
  <div id="photo">${photos}</div>
  <main class="fx container">
    <div class="main-left">
      <div id="info"></div>
      <div id="availability"></div>
      <div id="reviews"></div>
    </div>
    <div id="booking"></div>
  </main>
  <div id="footer">${footer}</div>
`;
