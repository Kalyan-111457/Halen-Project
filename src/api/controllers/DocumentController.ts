import { JsonController, Post ,Body, HttpCode, QueryParam, Param} from "routing-controllers";
import { Document } from "../models/DocumentModel"
import { DocumentService } from "../services/DocumentService";

@JsonController("/Document")
export class DocumentController{
    private readonly controller:DocumentService;
    constructor(){
        this.controller=new  DocumentService();
    }

    @HttpCode(200)
    @Post("/Create-and-uploaddocument")
    async CreateDocument(@Body() data:Document){
       const response= await this.controller.Createanduploaddocument(data);
       return response;
    }

    @HttpCode(200)
    @Post("/deletedocument")
    public async deletedocument(@QueryParam("id") id:number){
       const response= await this.controller.deletedoc(id);
       return response;
    }


    @HttpCode(200)
    @Post("/get-all-documents-based-on-projectid/:id")
    public async getalldocuments(@Param("id") id:number){
        const response=await this.controller.projectid(id);
        return response;
    }
}