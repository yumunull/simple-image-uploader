import {NextRequest, NextResponse} from "next/server";
import {s3Client} from "@/lib/s3";
import {GetObjectCommand, ListBucketsCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const GET = async (req: NextRequest, 
                   { params } : { params: Promise<{filename: string}> }) => {
    const {filename} = await params
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename,
    })
    console.log("downloaded")
    const url = await getSignedUrl(s3Client, command, {expiresIn: 600})
    return NextResponse.json(url)
}

export {GET}
