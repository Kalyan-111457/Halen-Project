import { PrismaClient } from "@prisma/client";
import { S3Client,PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { textextraction } from "./textextraction";
export class DocumentUpload{
    private readonly Prisma:PrismaClient;

    constructor(){
        this.Prisma=new PrismaClient();
    }

    async UploadDocumenttoaws(filename:string,base64:string,userid:number,projectid:number){
        const projectcheck=await this.Prisma.project.findFirst({
            where:{
                id:projectid,
                isdeleted:false
            }
        });


        const usercheck=await this.Prisma.user.findFirst({
            where:{
                id:userid,
                isdeleted:false
            }
        });

        

        if(!projectcheck || !usercheck){
            throw new Error("Project or User not found");

        }

        const buffer=Buffer.from(base64,"base64");


        const uploadfilename=`${userid}/${Date.now()}/${projectid}/${Date.now()}-${filename}`;

        

        const connection=new S3Client({
            region:process.env.AWS_REGION,
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
            }
        });

        await connection.send(
            new PutObjectCommand({
                Bucket:process.env.AWS_BUCKET_NAME,
                Key:uploadfilename,
                Body:buffer
            })
        )

        const fileSize=buffer.length;

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadfilename}`;

        const fileType = base64.split(";")[0].split(":")[1];

        return {
            fileUrl,
            filename,
            fileSize,
            fileType
        }
    }
}