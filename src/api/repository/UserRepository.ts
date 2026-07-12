import { PrismaClient } from "@prisma/client";
import { UserModel } from "../models/UserModel";

export class UserRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async CreateandUpdateUser(User: UserModel) {
        if (User.id) {

            const UserExist=await this.prisma.user.findFirst({
                where:{
                    id:User.id,
                    isdeleted:false
                }
            })

            if(!UserExist){
                return "User is Not Found"
                
            }
            const checkdetails = await this.prisma.user.findFirst({
                where: {
                    
                    AND: [
                        {
                            OR: [
                                {
                                    email: User.email
                                },
                                {
                                    phone: User.phone
                                }
                            ]
                        }, {
                            NOT: {
                                id: User.id
                            }
                        }
                    ]
                }
            });

            if (checkdetails) {
                return "Please check email and Phone no Somebody Using This One"
            }


            await this.prisma.user.update({
                where: {
                    id: User.id
                },
                data: {
                    fullName: User.fullName,
                    email: User.email,
                    password: User.password,
                    address:User.address,
                    phone:User.phone
                }
            });

            return "Sucessfully Updated"
        }

        else {
            const checkdetails = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email: User.email
                        },
                        {
                            phone: User.phone

                        }
                    ]
                }
            })

            if (checkdetails) {
                return "Already Email is Exist";
            }
            await this.prisma.user.create({
                data: {
                    fullName: User.fullName,
                    email: User.email,
                    password: User.password,
                    address: User.address,
                    phone: User.phone
                }
            })

            return "SucessFully Created the User"
        }

    }

    async DeleteUser(id:number){

        const checkuser=await this.prisma.user.findFirst({
            where:{
                id:id,
                isdeleted:false
            }
        });

        if(!checkuser){
            return "No User is Found"
        }
        await this.prisma.user.update({
            where:{
                id:id,
            },data:{
                isdeleted:true
            }
        });

        return "Sucessfully Deleted"

    }

    async listofusers(){
        const length=await this.prisma.user.count({
            where:{
                isdeleted:false
            }
        });
        if(length<=0){
            return "No Users is Found";
        }

        return await this.prisma.user.findMany(
            {
                where:{
                    isdeleted:false
                }
            }
        );
    }
}
