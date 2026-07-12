import { ProjectRepository } from "../repository/ProjectRepository";
import { ProjectModel } from "../models/ProjectModel";
export class ProjectService {
    private readonly respository: ProjectRepository;
    constructor() {
        this.respository = new ProjectRepository();
    }

    async CreateProject(project: ProjectModel) {
        if (project.title.length <= 0 || project.thumbnail.length <= 0 || project.description.length <= 0) {
            return "the length is must be greater than zero"
        }
        await this.respository.CreateProject(project);
    }

    async deleteproject(id: number) {
        if (id <= 0) {
            const response = await this.respository.deleteproject(id);
            return response;
        }
        else {
            return "the id must be greater than zero"
        }
    }

    async getlistofprojects() {
        const list = await this.respository.listofprojects();
        return list;

    }

    async getprojectbasedonuserid(userid: number) {
        if (userid <= 0) {
            const reponse = await this.respository.getprojectsbasedonuserid(userid);
            return reponse;
        }
        else {
            return "no userid is not found"
        }

    }
}