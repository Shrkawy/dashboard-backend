const JwtStratigy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Role = require("../models/role");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
  passReqToCallback: true,
};

const userStrategy = new JwtStratigy(options, async (req, token, done) => {
  let role;

  try {
    role = await Role.findById(token.role);
  } catch (err) {
    return done(err, false);
  }

  if (!role) return done("user not found", false);

  req.role = role;

  if (role.userType === "super-admin") {
    const User = require("../models/user");
    let user;

    try {
      user = await User.findById(token.id);
    } catch (err) {
      return done(err, false, {
        message: "user not found!",
      });
    }

    if (user.id.toString() !== role.userId.toString())
      return done("not allowed", false);

    if (!user) return done("user not found", false);

    if (user) {
      req.user = user;
      req.requister = "user";
      return done(null, user);
    }
  }

  if (role.userType === "customer") {
    const Customer = require("../models/customer");
    let customer;

    try {
      customer = await Customer.findById(token.id);
    } catch (err) {
      return done(err, false, {
        message: "customer not found!",
      });
    }

    if (customer.id.toString() !== role.userId.toString())
      return done("not allowed", false);

    if (customer) {
      req.requister = "customer";
      req.customer = customer;
      return done(null, customer);
    }
  }

  return done("user not found", false);
});

module.exports = (passport) => {
  passport.use(userStrategy);
};
