const Models = require('../models');
const Hapi = require('hapi');
const client = require('twilio')(
  'AC031ea78f67bfefeb3686f7f94064dc23',
  '559ba81c5fc0c481404e2d190ff67738',
);

const server = new Hapi.Server();
server.connection({
  port: 8080,
  host: 'localhost',
});
server.route([{
  path: '/data',
  method: 'GET',
  handler: (request, response) => {
    const { name } = request.query;
    const { heartbeat } = request.query;
    const { temperature } = request.query;
    Models.datavalues.create({
      name,
      heartbeat,
      temperature,
    }).then(() => {
      const { message } = request.query;
      if (!(message === null) && !(message === undefined)) {
        client.messages.create({
          from: '+16304071253',
          to: '+919008433423',
          body: message,
        }).then((done) => {
          response('ok message sent');
          console.log(done.sid);
        });
      } else {
        response('ok');
      }
    }).catch((error) => {
      response(error.message);
    });
  },
}, {
  path: '/register',
  method: 'GET',
  handler: (request, response) => {
    const { name } = request.query;
    const { number } = request.query;
    const { address } = request.query;
    const { email } = request.query;
    Models.patients.create({
      name,
      phone_number: number,
      address,
      email,
    }).then(() => {
      response('user registered');
    }).catch((error) => {
      response(error.message);
    });
  },
}, {
  path: '/getdata',
  method: 'GET',
  handler: (request, response) => {
    const { name } = request.query;
    Models.datavalues.findAll({
      where: { name },
    }).then((result) => {
      response(result);
    }).catch((error) => {
      response(error.message);
    });
  },
},
{
  path: '/patients',
  method: 'GET',
  handler: (request, response) => {
    Models.patients.findAll().then((result) => {
      response(result);
    }).catch((error) => {
      response(error.message);
    });
  },
}]);
const init = async () => {
  await server.start();
  console.log(`server started at ${server.info.uri}`);
};
init();
