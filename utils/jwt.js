const { sign } = require("jsonwebtoken");

exports.issueJWT = (user, role) => {
  const payload = {
      id: user._id,
      role: role.id,
    },
    secret = process.env.SECRET_KEY,
    expiresIn = "2w",
    token = `Bearer ${sign(payload, secret, {
      expiresIn,
    })}`;

  return { value: token, expiresIn };
};
