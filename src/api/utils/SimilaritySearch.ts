import { ResultModel } from "../models/ResultModel";
import { chunkrepository } from "../repository/ChunkRepository";
import { CosineSimilarity } from "./CosineSimilarity";
import { EmbeddingService } from "./EmbeddingService";


export class SimilaritySearch {
    private readonly chunkrepo: chunkrepository;
    private readonly Embedding: EmbeddingService;

    constructor() {
        this.Embedding = new EmbeddingService();
        this.chunkrepo = new chunkrepository();
    }

    async CreateSimialritySearch(text: string) {


        const response1 = await this.Embedding.CreateEmbedding(text);

        const result:ResultModel[]=[];

        const chunks = await this.chunkrepo.GetAllChunks();

        for (const chunk of chunks) {

            const score = CosineSimilarity.CreateCosine(response1,chunk.embedding);

            result.push({
                content:chunk.content,
                score:score,
                documentId:chunk.documentId
            });

        }

        result.sort((a,b)=>b.score-a.score);

        return result[0];

    }





}