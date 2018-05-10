const Models = require('../models');
const Hapi = require('hapi');
const path = require('path');
const inert = require('inert');
const client = require('twilio')(
  'AC031ea78f67bfefeb3686f7f94064dc23',
  '559ba81c5fc0c481404e2d190ff67738',
);

const fileName = path.join(__dirname, './build/index.html');
const server = new Hapi.Server();
server.connection({
  port: 8000,
  host: '0.0.0.0',
});
server.register(inert);
server.route([{
  path: '/css',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/css/main.b611fc13.css'),
  },
}, {
  path: '/js',
  method: 'GET',
  handler: {
    file: path.join(__dirname, './build/static/js/main.cfd5cbc6.js'),
  },
}, {
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
      const send = [];
      result.forEach((entry) => {
        send.push(entry.get({ plain: true }));
      });
      response(send);
    }).catch((error) => {
      response(error.message);
    });
  },
},
{
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply.file(fileName);
  },
}]);
const init = async () => {
  await server.start();
  console.log(`server started at ${server.info.uri}`);
};
init();
