import {Schema,model, CallbackWithoutResultAndOptionalError} from 'mongoose';
import bcrypt from 'bcrypt';
let SALT_WORK_FACTOR = 10;
interface IUser{
    id?:number,
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    password_confirm:string

}

const userSchema=new Schema<IUser>({
    id:{type:Number},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true,index:{unique:true}},
    password:{type:String,required:true},
    password_confirm:{type:String,required:true}
})

 userSchema.pre<IUser>('save',function(this:IUser,next:CallbackWithoutResultAndOptionalError){
    let user=this;

    console.log(user," user in pre defined");
        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);
    
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one
                user.password = hash;
                user.password_confirm=hash;
                next();
            });
        });
    // }

        });


const User=model<IUser>('User',userSchema);

export default User;