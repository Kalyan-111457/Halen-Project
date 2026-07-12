import OpenAI from "openai";
export class EmbeddingService {

    private readonly OpenAi: OpenAI;

    constructor() {
        this.OpenAi = new OpenAI({
            apiKey: process.env.OpenAI
        })
    }

    async CreateEmbedding(text: string): Promise<number[]> {
        const data = await this.OpenAi.embeddings.create({
            model: "text-embedding-3-small",
            input: text,
        });

        return data.data[0].embedding;
    }


    async generatesummary(text: string) {
        const response = await this.OpenAi.chat.completions.create({
            model: 'gpt-4.1-nano',
            messages:[
                {
                    role: "system",
                    content: "You are an assitant that summarize a document"
                },
                {
                    role: "user",
                    content: `Summarie the follewing documnet ${text}`
                }
            ]
            
        })
        return response.choices[0].message.content ?? "";
    }

}