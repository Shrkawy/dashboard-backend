const { model, Schema } = require("mongoose");

const roleSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, refPath: "onModel" },
    userType: { type: String, required: true },
    globalPerms: { type: Boolean, default: false },
    privatePerms: { type: Boolean, required: false },
    perms: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = model("Role", roleSchema);
