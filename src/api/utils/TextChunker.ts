export class TextChunker {

    public static async textchuks(text: string, chunksize:number= 1000, overlap:number= 200): Promise<string[]> {


        if (text.length <= 0) {
            throw new Error("the text length must be greater than zero");
        }

        let start: number = 0;

        const chunks: string[] = [];

        while (start <= text.length) {

            chunks.push(text.substring(start, start + chunksize));

            start = start + chunksize - overlap;
        }

        return chunks;
    }

}