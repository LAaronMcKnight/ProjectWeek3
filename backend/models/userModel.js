const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Username required'],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      require: [true, 'E-mail required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [5, 'Password length of at least 6 characters required'],
      required: [true, 'Password required'],
      select: false,
    },
  },
  {
    timestamps: true,
    tooObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()

    return;
  }

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

// compare password using bcryptjs to log in
userSchema.methods.comparePassword = async function (
  plainText,
  hashedPassword
) {
  return await bcrypt.compare(plainText, hashedPassword);
};


const User = mongoose.model("User", userSchema);

module.exports = User