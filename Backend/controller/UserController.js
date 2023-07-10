const { User } = require("../models");

const { comparePassword } = require("../helper/bcrypt");
const { signToken, verifyToken } = require("../helper/jwt");

const midtransClient = require("midtrans-client");
const main = require("../helper/nodemailer");

class UserController {
  static async registerController(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const createUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      main(email);

      res.status(201).json({ id: createUser.id, email: createUser.email });
    } catch (err) {
      console.error(err.name, "di controller");
      next(err);
    }
  }

  static async loginController(req, res, next) {
    try {
      const { email, password } = req.body;

      // if (!email) throw { name: "emailRequired" };

      // if (!password) throw { name: "passwordRequired" };

      const userData = await User.findOne({ where: { email: email } });

      if (!userData) {
        throw { name: "InvalidEmailOrPassword" };
      }

      const isValid = comparePassword(password, userData.password);

      if (!isValid) {
        throw { name: "InvalidEmailOrPassword" };
      }

      const payLoad = { id: userData.id, name: userData.username };

      const token = signToken(payLoad);

      if (!token) {
        throw { name: "InvalidToken" };
      }

      res.status(200).json({ access_token: token });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async googleLoginController(req, res, next) {
    try {
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const { token_google } = req.body;

      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: token_google,
          audience: process.env.CLIENT_ID,
          // "1066193754238-hh0b0pk3urqbm6rl4fvcpvcj0cb0c7oh.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();

        const userData = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            username: payload.name,
            email: payload.email,
            password: "aQ12#fG%^$3%^%^$j*(U*(B))",
            phoneNumber: "082123982173",
            address: "Jakarta",
          },
          hooks: false,
        });

        let data = userData[0];
        const payLoad = { id: data.id, name: data.username }; //buat payload
        const token = signToken(payLoad); //buat token

        if (!token) {
          throw { name: "InvalidToken" };
        }

        res.status(200).json({
          access_token: token,
          data: {
            id: data.dataValues.id,
            username: data.dataValues.username,
            email: data.dataValues.email,
          },
        });
      }
      verify().catch(console.error);
    } catch (err) {
      console.error(err);
    }
  }

  static async githubLoginController(req, res, next) {
    try {
      const { email, username, imageUrl } = req.body.data;

      const userData = await User.findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          username: username,
          email: email,
          password: "aQ12#fG%^$3%^%^$j*(U*(B))",
          phoneNumber: "082123982173",
          address: "Jakarta",
          imageUrl: imageUrl,
        },
        hooks: false,
      });

      let data = userData[0];
      const payLoad = { id: data.id, name: data.username }; //buat payload
      const token = signToken(payLoad); //buat token

      if (!token) {
        throw { name: "InvalidToken" };
      }

      res.status(200).json({
        access_token: token,
        data: {
          id: data.dataValues.id,
          username: data.dataValues.username,
          email: data.dataValues.email,
        },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}
module.exports = UserController;
