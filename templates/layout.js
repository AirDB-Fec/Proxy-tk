module.exports = (styles, apps, scripts) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style type="text/css">${styles}</style>
      <title>AirDnB</title>
    </head>
    <body>
    ${apps}
    </body>
    ${scripts}
  </html>
`;
