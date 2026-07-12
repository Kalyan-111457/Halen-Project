import { PrismaClient } from "@prisma/client";
import { DocumentModel } from "../models/DocumentModel";

export class DocumentRespository {
    private readonly Prisma: PrismaClient;

    constructor() {
        this.Prisma = new PrismaClient();
    }


    async CreateandUploadDocument(data: DocumentModel) {
        const response = await this.Prisma.document.create({
            data: data
        });

        return response;

    }

    async DeleteProjectDocument(documentid: number) {

        const checkingxist = await this.Prisma.document.findFirst({
            where: {
                id: documentid,
                isdeleted: false
            }
        });

        if (!checkingxist) {
            return "This Document is Not Found"
        }
        const deletedocument = await this.Prisma.document.update({
            where: {
                id: documentid
            },
            data: {
                isdeleted: true
            }
        });
        return "Document has been deleted Sucessfully"

    }



    async getalldocumentsbasedonprojectid(projectid: number): Promise<DocumentModel[] | string > {

        const response1 = await this.Prisma.document.count({
            where: {
                projectId: projectid
            }
        });

        if (response1 <= 0) {
            return "There are no documents found.";
        }

        const response = await this.Prisma.document.findMany({
            where: {
                projectId: projectid
            }
        });

        return response;
    }

}