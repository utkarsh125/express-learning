import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    // username: mongoose.Schema.Types.Stringm,
    // displayName: mongoose.Schema.Types.String,
    // password: mongoose.Schema.Types.String

    //Let's say some of your fields might be required
    username:{
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true, //The username should be unique
    },
    displayName:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
});

// //Compile it into a model

export const User = mongoose.model('User', UserSchema); 
