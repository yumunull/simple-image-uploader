import {NextRequest, NextResponse} from "next/server";
import {s3Client} from "@/lib/s3";
import {GetObjectCommand, HeadObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const GET = async (req: NextRequest,
                   {params}: { params: Promise<{ filename: string }> }) => {
    const {filename} = await params
    try {
        const command = new HeadObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
        })
        await s3Client.send(command)
    } catch {
        return NextResponse.json("", {status: 404})
    }

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filename,
        })
        const url = await getSignedUrl(s3Client, command, {expiresIn: 600})
        return NextResponse.json(url)
    } catch {
        return NextResponse.json("Failed to generate url", {status: 500})
    }
}

export {GET}
