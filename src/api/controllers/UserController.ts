import { Body, Get, HttpCode, JsonController, Param, Post } from "routing-controllers";
import { UserModel } from "../models/UserModel";
import { UserService } from "../services/UserService";
@JsonController("/users")
export class Usercontroller{
    private readonly controller:UserService;

    constructor(){
        this.controller=new UserService();
    }

    @HttpCode(200)
    @Post("/Create-and-update")
    async Createandupdateuser(@Body() user:UserModel){
      const response=  await this.controller.CreateandupdateUser(user);
      return response;
    }

    @HttpCode(200)
    @Get("/list-of-users")
    async ListofUsers(){
        const response=await this.controller.listofusers();
        return response;
    }

    @HttpCode(200)
    @Post("/deleteuser/:id")
    async deleteuser2(@Param("id") id:number){
        const response=await this.controller.deleteuser(id);
        return response;
    }


}