const Hapi = require("@hapi/hapi");
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
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