import mongoose, { Schema, Model, Document } from "mongoose";

class AuthModel {
  private readonly authSchema: Schema;

  constructor() {
    this.authSchema = new Schema({
      user: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      refreshToken: {
        type: String,
        required: true,
        trim: true,
      },
    });
  }

  get model(): Model<any> {
    return mongoose.model("Auth", this.authSchema);
  }
}

export default new AuthModel().model;
