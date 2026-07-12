import { PrismaClient } from "@prisma/client";
import { EmbeddingService } from "../utils/EmbeddingService";
export class chunkrepository {
    private readonly prisma: PrismaClient;
    private readonly embedding: EmbeddingService;

    constructor() {
        this.prisma = new PrismaClient();
        this.embedding = new EmbeddingService();
    }


    async CreateChunk(documentId: number, chunks: string[]) {

        for (let i = 0; i < chunks.length; i++) {

            const chunk = chunks[i];

            const embedding = await this.embedding.CreateEmbedding(chunk);

            await this.prisma.chunk.create({
                data: {
                    content: chunk,
                    chunkIndex: i,
                    embedding: embedding,
                    documentId: documentId
                }
            });
        }

        return "Chunks created successfully";
    }


    async GetAllChunks(){
        const response=await this.prisma.chunk.findMany({
            include:{
                document:true
            }
        });
        return response;
    }


    async GetChunkByDocumentId(documentid:number){
        const response=await this.prisma.chunk.findMany({
            where:{
                documentId:documentid
            }

        });

        return response;
    }




}