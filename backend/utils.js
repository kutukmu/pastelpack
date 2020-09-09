import jwt from "jsonwebtoken";
import config from "./config";
import UserModel from "./Models/userModel";

const getToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          msg: "Invalid Token",
        });
      }

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      msg: "token is not supplied",
    });
  }
};

const isAdmin = async (req, res, next) => {
  const extUser = await UserModel.findOne({ _id: req.user.id });

  if (extUser.isAdmin) {
    return next();
  }

  return res.status(401).send({ msg: "Admin not valid" });
};

export { getToken, isAuth, isAdmin };
