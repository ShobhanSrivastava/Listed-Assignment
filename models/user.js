import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
      },
      accessToken: {
        type: String,
        required: true
      },
      expirationTime: {
        type: Date,
        required: true
      },
      refreshToken: {
        type: String,
        required: true
    }
});

const User = model('user', userSchema);

export default User;