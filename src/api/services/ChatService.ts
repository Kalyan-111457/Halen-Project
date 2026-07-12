import { ChatRepository } from "../repository/ChatRepository";
import { ChatModel } from "../models/ChatModel";

export class ChatService{
    private readonly repository:ChatRepository;

    constructor(){
        this.repository=new ChatRepository();
    }

    async CreateandupdateChat(chat:ChatModel){

        return await this.repository.CreateandupdateChat(chat);
    
    }

    async getchatbyid(chatid:number){

        if(chatid<=0){
            throw new Error("the chat id is must be greater than zero");
        }
        return await this.repository.getchatbyid(chatid);
    }

    
    async getchatbyprojectid(projectid:number){

        if(projectid<=0){
            throw new Error("the project id must be greater than zero");
        }

        return await this.repository.getchatByProjectId(projectid);
    }


    async getchatbyuserid(userid:number){
        if(userid<=0){
            throw new Error("the user id must be greater than zero");
        }
    }

    async deletechat(chatid:number){
        if(chatid<=0){
            throw new Error("the chat id is must be greater than zero");
        }

        return await this.repository.deletechat(chatid);
    }

    async getallchats(){
        return await this.repository.GetAllChats();
    }

}