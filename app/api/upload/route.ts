import {NextRequest, NextResponse} from "next/server";
import {s3Client} from "@/lib/s3";
import {ListBucketsCommand, PutObjectCommand} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid";

const POST = async (req:NextRequest) => {
    const formData = await req.formData()
    const file = formData.get("file") as File
    if (!file) return NextResponse.json({error: "no file"},{status:400})
    const arrayBuffer  = await file.arrayBuffer()
    const buffer  = Buffer.from(arrayBuffer)
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: uuidv4(),
        Body: buffer,
        ContentType: file.type,
    })
    
    const res = await s3Client.send(command)
    console.log(res)
    return NextResponse.json(res);
}

export {POST}