"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _faker = _interopRequireDefault(require("faker"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _server = _interopRequireDefault(require("../../server"));

var _controllers = require("../../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.use(_sinonChai.default);

const {
  expect
} = _chai.default;
const signinRoute = '/api/v1/auth/signin';
const userRoute = '/api/v1/auth/create-user';
const getUsersRouter = '/api/v1/auth/users';
const rootUserRoute = '/api/v1/auth/create-user-root';
const {
  registerUser
} = _controllers.UserController;
describe('Users test suite', () => {
  const dummyUser = {
    firstName: _faker.default.name.firstName(),
    lastName: _faker.default.name.lastName(),
    email: _faker.default.internet.email(),
    password: _faker.default.internet.password(),
    gender: 'female',
    jobRole: 'support assist',
    department: 'support',
    address: _faker.default.address.streetAddress()
  };
  describe('Creating User', () => {
    let adminToken;
    it('It should error for invalid request data', done => {
      const testUser = {
        firstName: _faker.default.name.firstName(),
        lastName: _faker.default.name.lastName(),
        email: 'invalidMail',
        password: _faker.default.internet.password()
      };

      _chai.default.request(_server.default).post(userRoute).send(testUser).end((err, res) => {
        if (err) throw Error(`Error making test request ${route}`);
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('errors');
        expect(res.body.errors).to.have.property('email');
        done();
      });
    });
    it('Should authenticate request', done => {
      _chai.default.request(_server.default).post(userRoute).send(dummyUser).end((err, res) => {
        if (err) throw Error(`Error making test request ${route}`);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        done();
      });
    });
    it('Should not allow none admin user', done => {
      const noneAdmin = {
        email: 'oliver4@gmail.com',
        password: 'password'
      };

      _chai.default.request(_server.default).post(signinRoute).send(noneAdmin).end((err, res) => {
        const {
          token
        } = res.body.data;
        const tokenBearer = `Bearer ${token}`;

        _chai.default.request(_server.default).post(userRoute).set('Authorization', tokenBearer).send(dummyUser).end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eq('Access denied, only admins');
          done();
        });
      });
    });
    it('Should allow admin user to create user', done => {
      const admin = {
        email: 'admin@gmail.com',
        password: 'devcAdmin'
      };

      _chai.default.request(_server.default).post(signinRoute).send(admin).end((err, res) => {
        const {
          token
        } = res.body.data;
        adminToken = `Bearer ${token}`;

        _chai.default.request(_server.default).post(userRoute).set('Authorization', adminToken).send(dummyUser).end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          done();
        });
      });
    });
    it('Should allow admin get all users', done => {
      _chai.default.request(_server.default).get(getUsersRouter).set('Authorization', adminToken).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
    });
    it('Should create rootAdmin with valid secret', done => {
      const rootAdmin = { ...dummyUser,
        secret: 'root-man',
        email: _faker.default.internet.email(),
        userRole: 'admin'
      };

      _chai.default.request(_server.default).post(rootUserRoute).send(rootAdmin).end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.userRole).to.eq('admin');
        done();
      });
    });
    it('Should prevent creating rootAdim with invalid secret', done => {
      const rootAdmin = { ...dummyUser,
        secret: 'unknow secret',
        userRole: 'admin'
      };

      _chai.default.request(_server.default).post(rootUserRoute).send(rootAdmin).end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
    });
  });
  describe('registerUser controller test', () => {
    it('Should handle error exception', async () => {
      const req = {
        body: {}
      };
      const res = {
        status: () => {},
        json: () => {}
      };

      _sinon.default.stub(res, 'status').returnsThis();

      await registerUser(req, res);
      expect(true).to.eq(true);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
//# sourceMappingURL=userController.test.js.map