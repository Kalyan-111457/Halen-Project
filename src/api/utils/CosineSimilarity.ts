export class CosineSimilarity {

    public static CreateCosine(
        vector1: number[],
        vector2: number[]
    ): number {

        if (vector1.length !== vector2.length) {
            throw new Error("Both vectors must have the same dimensions.");
        }

        let dotProduct = 0;
        let magnitudeA = 0;
        let magnitudeB = 0;

        for (let i = 0; i < vector1.length; i++) {

            dotProduct += vector1[i] * vector2[i];

            magnitudeA += vector1[i] * vector1[i];

            magnitudeB += vector2[i] * vector2[i];
        }

        const magA = Math.sqrt(magnitudeA);
        const magB = Math.sqrt(magnitudeB);

        const denominator = magA * magB;

        if (denominator === 0) {
            return 0;
        }

        return dotProduct / denominator;
    }
}