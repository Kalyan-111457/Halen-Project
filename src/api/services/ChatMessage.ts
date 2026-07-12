import { ChatMessage } from "../models/ChatModel";
import { ChatMessageRepository } from "../repository/ChatMessageRepository";

export class ChatMessageService {

    private readonly repository: ChatMessageRepository;

    constructor() {
        this.repository = new ChatMessageRepository();
    }

    async CreateChatMessage(chat: ChatMessage) {

        if (!chat.content || chat.content.trim().length === 0) {
            throw new Error("Message content cannot be empty.");
        }

        if (!chat.role || chat.role.trim().length === 0) {
            throw new Error("Role is required.");
        }

        if (chat.chatId <= 0) {
            throw new Error("Invalid Chat Id.");
        }

        return await this.repository.CreateChatMessage(chat);
    }

    async GetMessageById(id: number) {

        if (id <= 0) {
            throw new Error("Invalid Message Id.");
        }

        return await this.repository.GetMessageById(id);
    }

    async GetMessagesByChatId(chatId: number) {

        if (chatId <= 0) {
            throw new Error("Invalid Chat Id.");
        }

        return await this.repository.GetMessagesByChatId(chatId);
    }

    async GetMessagesByDocumentId(documentId: number) {

        if (documentId <= 0) {
            throw new Error("Invalid Document Id.");
        }

        return await this.repository.GetMessagesByDocumentId(documentId);
    }

    async GetAllMessages() {

        return await this.repository.GetAllMessages();
    }

    async DeleteMessage(id: number) {

        if (id <= 0) {
            throw new Error("Invalid Message Id.");
        }

        return await this.repository.DeleteMessage(id);
    }
}