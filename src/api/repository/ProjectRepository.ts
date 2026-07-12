import { PrismaClient } from "@prisma/client"
import { ProjectModel } from "../models/ProjectModel";
export  class ProjectRepository{
    private readonly prisma:PrismaClient;

    constructor(){
        this.prisma=new PrismaClient();
    }

    async CreateProject(Project:ProjectModel){

        const checkuserexist=await this.prisma.user.findFirst({
            where:{
                id:Project.UserId,
                isdeleted:false

            }
        });
        
        if(!checkuserexist){
            return "No User is Found";
        }

        await this.prisma.project.create({
            data:{
                title:Project.title,
                thumbnail:Project.thumbnail,
                description:Project.description,
                userId:Project.UserId
            }
        })

    }


    async deleteproject(id:number){
        const checkexist=await this.prisma.project.findFirst({
            where:{
                id:id,
                isdeleted:false
            }
        });

        if(!checkexist){
            return "No Project if Found"
        }
        await this.prisma.project.update({
            where:{
                id:id
            },
            data:{
                isdeleted:true
            }
            
        })

    }

    
    async listofprojects(){

        const projects=await this.prisma.project.count({
            where:{
                isdeleted:false
            }
        });

        if(projects<=0){
            return "There is No Projects Currently"
        }

        return await this.prisma.project.findMany({
            where:{
                isdeleted:false
            }
        });
    }


    async getprojectsbasedonuserid(UserId:number){
        const user=await this.prisma.user.findFirst({
            where:{
                isdeleted:false,
                id:UserId
            }
        });

        if(!user){
            return "No User is Found on this details";
        }

        return await this.prisma.project.findMany({
            where:{
                isdeleted:false,
                userId:UserId
            }
        });

    }

}