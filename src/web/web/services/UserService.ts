import { User } from "@/types/User"
import api from "@/src/lib/axios";
export class UserService{

    async CreateandUpdate(UserData:User){
        const response=api.post("/users/Create-and-update/",UserData);
        return (await response).data
    }


    async ListOfUsers():Promise<User[]>{
        const response=api.get("/users/list-of-users");
        return (await response).data;
    }


    async deleteUser(id:number){
        const response=api.post(`/users/${id}`);
        return response;

    }


}


export default new UserService();