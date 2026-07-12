import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export class textextraction{

    public static async textextract(base64:string):Promise<string>{

        const filetype=base64.split(";")[0].split(":");

        const buffer=Buffer.from(base64,"base64");

        if(filetype.includes(".pdf")){

            const data=new PDFParse(buffer);

            const result=await data.getText();

            return result.text;

        }

        if(filetype.includes("word") || filetype.includes("docx")){
            const  text=await mammoth.extractRawText({
                buffer:buffer
            });

            return text.value;
        }

        if(filetype.includes(".txt")){
            return buffer.toString("utf8");
        }
        throw new Error("please insert pdf or word files in it");

    }



}