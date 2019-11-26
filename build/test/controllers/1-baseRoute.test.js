"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _database = _interopRequireDefault(require("../../database"));

var _users = _interopRequireDefault(require("../../database/seeds/001-users"));

var _initDb = _interopRequireDefault(require("../../database/initDb"));

var _server = _interopRequireDefault(require("../../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.should();

const entryRoute = '/'; // Base Route Test

describe('Base Route Test ', () => {
  before(async () => {
    await _database.default.clearDb();
    await (0, _initDb.default)();
    (0, _users.default)();
  });
  it('should return welcome to teamwork', done => {
    _chai.default.request(_server.default).get(entryRoute).end((error, response) => {
      if (error) throw Error(`Error making test request ${entryRoute}`);
      response.should.have.status(200);
      response.body.message.should.equal('welcome to teamwork');
      done();
    });
  });
  it('should return 404 for a non-found route', done => {
    _chai.default.request(_server.default).get('/badRoute').end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});
//# sourceMappingURL=1-baseRoute.test.js.map