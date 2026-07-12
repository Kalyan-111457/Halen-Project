import { PrismaClient } from "@prisma/client";
import { ChatModel } from "../models/ChatModel";

export class ChatRepository {
    private readonly Prisma: PrismaClient;

    constructor() {
        this.Prisma = new PrismaClient();
    }

    // Create & Update Chat
    async CreateandupdateChat(chat: ChatModel) {

        const userExist = await this.Prisma.user.findFirst({
            where: {
                id: chat.userId,
                isdeleted: false
            }
        });

        if (!userExist) {
            throw new Error("User not found.");
        }

        const projectExist = await this.Prisma.project.findFirst({
            where: {
                id: chat.projectId,
                isdeleted: false
            }
        });

        if (!projectExist) {
            throw new Error("Project not found.");
        }

        // Update
        if (chat.id) {

            const chatExist = await this.Prisma.chat.findFirst({
                where: {
                    id: chat.id,
                    isdeleted: false
                }
            });

            if (!chatExist) {
                throw new Error("Chat not found.");
            }

            return await this.Prisma.chat.update({
                where: {
                    id: chat.id
                },
                data: {
                    title: chat.title,
                    userId: chat.userId,
                    projectId: chat.projectId
                }
            });
        }

        // Create
        return await this.Prisma.chat.create({
            data: {
                title: chat.title,
                userId: chat.userId,
                projectId: chat.projectId
            }
        });
    }

    // Get Chat By Id
    async getchatbyid(chatid: number) {

        const chat = await this.Prisma.chat.findFirst({
            where: {
                id: chatid,
                isdeleted: false
            },
            include: {
                user: true,
                project: true
            }

        });

        if (!chat) {
            throw new Error("Chat not found.");
        }

        return chat;
    }

    // Get Chats By Project Id
    async getchatByProjectId(projectid: number) {

        const project = await this.Prisma.project.findFirst({
            where: {
                id: projectid,
                isdeleted: false
            }
        });

        if (!project) {
            throw new Error("Project not found.");
        }

        return await this.Prisma.chat.findMany({
            where: {
                projectId: projectid,
                isdeleted: false
            }
        });
    }

    // Get Chats By User Id
    async getchatbyuserid(userid: number) {

        const user = await this.Prisma.user.findFirst({
            where: {
                id: userid,
                isdeleted: false
            }
        });

        if (!user) {
            throw new Error("User not found.");
        }

        return await this.Prisma.chat.findMany({
            where: {
                userId: userid,
                isdeleted: false
            }
        });
    }

    // Get All Chats
    async GetAllChats() {

        const count = await this.Prisma.chat.count({
            where: {
                isdeleted: false
            }
        });

        if (count === 0) {
            throw new Error("No chats found.");
        }

        return await this.Prisma.chat.findMany({
            where: {
                isdeleted: false
            },
            include: {
                user: true,
                project: true
            }
        });
    }

    // Soft Delete Chat
    async deletechat(id: number) {

        const chat = await this.Prisma.chat.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        });

        if (!chat) {
            throw new Error("Chat not found.");
        }

        return await this.Prisma.chat.update({
            where: {
                id: id
            },
            data: {
                isdeleted: true
            }
        });
    }


}