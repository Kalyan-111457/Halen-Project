export interface ChatModel{
    id?:number | undefined,
    title:string,
    userId:number,
    projectId:number,
    isdeleted:boolean
}

export interface ChatMessage{
    id?:number,
    role:string,
    content:string,
    chatId:number,
    documentId?:number
}