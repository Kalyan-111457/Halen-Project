import { HttpCode, Param, Post,Get } from "routing-controllers";
import { ProjectModel } from "../models/ProjectModel";
import { ProjectService } from "../services/ProjectService";
export class ProjectController{
    private readonly controller:ProjectService;
    constructor(){
        this.controller=new ProjectService();
    }

    @HttpCode(200)
    @Post("/CreateProject")

    async create(
        data:ProjectModel
    ){
        const response=await this.controller.CreateProject(data);
        return response;
        
    }


    @HttpCode(200)
    @Post("/deleteuser/:id")
    async delete(@Param("id") id:number){
        const response=await this.controller.deleteproject(id);
        return response;
    }

    @HttpCode(200)
    @Post("/list-of-project")
    async listofproject(){
        const response=await this.controller.getlistofprojects();
        return response;
    }

    @HttpCode(200)
    @Get("/based-on-userid/:id")
    async getprojectbasedonuserid(@Param("id") id:number){
        return await this.controller.getprojectbasedonuserid(id);
    }
}
