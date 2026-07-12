import { HttpCode, JsonController, Param, Post, QueryParam } from "routing-controllers";
import { ChatService } from "../services/ChatService";
import { ChatModel } from "../models/ChatModel";
import { Body,Get } from "routing-controllers";


@JsonController("/chat")
export class ChatRepo{
    private readonly controller:ChatService;

    constructor(){
        this.controller=new ChatService();
    }


    @HttpCode(200)
    @Post("/Create-and-update")
    async CreateandUpdateChat(@Body() chat:ChatModel){
        await this.controller.CreateandupdateChat(chat);
    }

    @HttpCode(200)
    @Get("/ChatById/:id")
    async GetChatById(@Param("id") id:number){
        await this.controller.getchatbyid(id);
    }


    @HttpCode(200)
    @Get("/GetChatByUserId/:id")
    async GetChatByUserId(@Param("id") id :number){
        await this.controller.getchatbyid(id);
    }


    @HttpCode(200)
    @Get("/GetChatByProjectId/:id")
    async GetChatByProjectId(@QueryParam("id") id:number){
        await this.controller.getchatbyprojectid(id);
    }

    @HttpCode(200)
    @Get("/GetAllChats")
    async GetAllChat(){
        await this.controller.getallchats();
    }

    @HttpCode(200)
    @Post("/deletechat/:id")
    async DeleteChat(@Param("id") id :number){
        await this.controller.deletechat(id)
    }


}