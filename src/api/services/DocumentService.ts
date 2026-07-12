import { DocumentUpload } from "../utils/DocumentAws";
import { DocumentRespository } from "../repository/DocumentRespository";
import { Document, DocumentModel } from "../models/DocumentModel";
import { textextraction } from "../utils/textextraction";
import { TextChunker } from "../utils/TextChunker";
import { chunkrepository } from "../repository/ChunkRepository";
import { EmbeddingService } from "../utils/EmbeddingService";
export class DocumentService{
    private readonly service:DocumentRespository;
    private readonly Documentupload:DocumentUpload;
    private readonly ChunkRepository:chunkrepository;
    private readonly Embeddingservice:EmbeddingService;
    constructor(){
        this.service=new DocumentRespository();
        this.Documentupload=new DocumentUpload();
        this.ChunkRepository=new chunkrepository();
        this.Embeddingservice=new EmbeddingService();
    }

    async Createanduploaddocument(data:Document){

        const response1 =await textextraction.textextract(data.base64); //whter the documnet is usppott or not

    

        const response=await this.Documentupload.UploadDocumenttoaws(data.fileName,data.base64,data.userid,data.projectId);

        //upload that documnet and get the url from there

    
        const summarybyai=await  this.Embeddingservice.generatesummary(response1);

    

        
        const data1:DocumentModel={
            fileName:response.filename,
            fileSize:response.fileSize,
            fileUrl:response.fileUrl,
            fileType:response.fileType,
            projectId:data.projectId,
            content:response1.toString(),
            summary:summarybyai,
            isdeleted:false,
        };

        //then we need to create a chunks in that one

        const chunks=await TextChunker.textchuks(response1.toString());

       const document= await this.service.CreateandUploadDocument(data1);

       //the we need to pass the documnetid as well as chunks 

        await this.ChunkRepository.CreateChunk(document.id,chunks);


    }

    async deletedoc(id:number){
        if(id<=0){
         const response=await this.service.DeleteProjectDocument(id);
         return response;
        }
        else{
            return "the id must be greater than zero"
        }
    }

    async projectid(id:number){
        if(id<=0){
            const response=await this.service.getalldocumentsbasedonprojectid(id);
            return response;
        }
        else{
            return "the id must be greater than zero"
        }
    }
}