import {
    Body,
    Delete,
    Get,
    HttpCode,
    JsonController,
    Param,
    Post
} from "routing-controllers";

import { ChatMessage } from "../models/ChatModel";
import { ChatService } from "../services/ChatService";
@JsonController("/chatmessage")
export class ChatMessageController {

    private readonly service: ChatService;

    constructor() {
        this.service = new ChatService();
    }

    @HttpCode(200)
    @Post("/create")
    async CreateChatMessage(@Body() chat: ChatMessage) {

        return await this.service.CreateChatMessage(chat);
    }

    @HttpCode(200)
    @Get("/:id")
    async GetMessageById(@Param("id") id: number) {

        return await this.service.GetMessageById(id);
    }

    @HttpCode(200)
    @Get("/chat/:chatId")
    async GetMessagesByChatId(@Param("chatId") chatId: number) {

        return await this.service.GetMessagesByChatId(chatId);
    }

    @HttpCode(200)
    @Get("/document/:documentId")
    async GetMessagesByDocumentId(
        @Param("documentId") documentId: number
    ) {

        return await this.service.GetMessagesByDocumentId(documentId);
    }

    @HttpCode(200)
    @Get("/")
    async GetAllMessages() {

        return await this.service.GetAllMessages();
    }

    @HttpCode(200)
    @Delete("/:id")
    async DeleteMessage(@Param("id") id: number) {

        return await this.service.DeleteMessage(id);
    }
}