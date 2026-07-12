import { PrismaClient } from "@prisma/client";
import { ChatMessage } from "../models/ChatModel";

export class ChatMessageRepository {

    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // Create Chat Message
    async CreateChatMessage(chat: ChatMessage) {

        const chatExist = await this.prisma.chat.findFirst({
            where: {
                id: chat.chatId,
                isdeleted: false
            }
        });

        if (!chatExist) {
            throw new Error("Chat not found.");
        }

        if (chat.documentId) {

            const documentExist = await this.prisma.document.findFirst({
                where: {
                    id: chat.documentId,
                    isdeleted: false
                }
            });

            if (!documentExist) {
                throw new Error("Document not found.");
            }
        }

        return await this.prisma.chatMessage.create({
            data: {
                role: chat.role,
                content: chat.content,
                chatId: chat.chatId,
                documentId: chat.documentId
            }
        });
    }

    // Get Message By Id
    async GetMessageById(id: number) {

        const message = await this.prisma.chatMessage.findUnique({
            where: {
                id: id
            }
        });

        if (!message) {
            throw new Error("Message not found.");
        }

        return message;
    }

    // Get Messages By Chat Id
    async GetMessagesByChatId(chatId: number) {

        const chat = await this.prisma.chat.findFirst({
            where: {
                id: chatId,
                isdeleted: false
            }
        });

        if (!chat) {
            throw new Error("Chat not found.");
        }

        return await this.prisma.chatMessage.findMany({
            where: {
                chatId: chatId
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }

    // Get Messages By Document Id
    async GetMessagesByDocumentId(documentId: number) {

        const document = await this.prisma.document.findFirst({
            where: {
                id: documentId,
                isdeleted: false
            }
        });

        if (!document) {
            throw new Error("Document not found.");
        }

        return await this.prisma.chatMessage.findMany({
            where: {
                documentId: documentId
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }

    // Get All Messages
    async GetAllMessages() {

        const count = await this.prisma.chatMessage.count();

        if (count === 0) {
            throw new Error("No chat messages found.");
        }

        return await this.prisma.chatMessage.findMany({
            include: {
                chat: true,
                document: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });
    }

    // Delete Message
    async DeleteMessage(id: number) {

        const message = await this.prisma.chatMessage.findUnique({
            where: {
                id: id
            }
        });

        if (!message) {
            throw new Error("Message not found.");
        }

        return await this.prisma.chatMessage.delete({
            where: {
                id: id
            }
        });
    }
}