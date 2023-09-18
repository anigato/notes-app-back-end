const Hapi = require("@hapi/hapi");
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    // host dirubah, jika pada local dan masih produksi gunakan localhost, jika coba dideploy gunakan 0.0.0.0
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    // menerapkan cors
    routes: {
      cors: {
        origin: ['*'],
      }
    },
  });

  // import routes
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();