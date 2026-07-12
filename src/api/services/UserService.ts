import { UserRepository } from "../repository/UserRepository";
import { UserModel } from "../models/UserModel";
export class UserService{
    private readonly respository:UserRepository;

    constructor(){
        this.respository=new UserRepository();

    }

    async CreateandupdateUser(user:UserModel){
        if(!user.email.includes("@")){
            throw new Error("Invalid email format");
        }
        if(user.password.length<6){
            throw new Error("Password must be at least 6 characters long");
        }
        if(user.phone.length<10){
            throw new Error("Phone number must be at least 10 characters long");
        }
        if(!user.address || user.address.length<5 ||!user.email || !user.phone || !user.password || !user.fullName){
            throw new Error("All fields are required and must meet the specified criteria");
        }
        const response=await this.respository.CreateandUpdateUser(user);

        return response;

    }

    async deleteuser(id:number){
        if(id<=0){
            throw new Error("the id is not less than zero");
        }

        const deleteuser=await this.respository.DeleteUser(id);
        return deleteuser

    }

    async listofusers(){
        const response=await this.respository.listofusers();
        return response;
    }
}