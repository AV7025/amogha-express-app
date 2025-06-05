const server = require('./server');

const app = server.create();

app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ App listening on port ${process.env.PORT || 3000}`);
});
