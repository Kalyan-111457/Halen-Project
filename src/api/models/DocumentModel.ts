export interface DocumentModel{
    projectId: number;
    id?: number;
    fileName: string;
    fileType: string;
    fileUrl: string;
    fileSize: number;
    content?: string | null;
    summary?: string | null;
    status?: string;
    isdeleted: boolean;
}

export interface Document{
    projectId:number,
    userid:number,
    fileName:string,
    base64:string
}