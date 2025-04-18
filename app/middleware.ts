import {NextRequest, NextResponse} from "next/server";

export const middleware = (req: NextRequest) => {
    const res = NextResponse.next()
    
    res.headers.set("Access-Control-Allow-Origin", "https://simple-image-uploader-8f918b7dc2bcadffcb44222be7ea7da0.s3.ap-southeast-2.amazonaws.com")
    res.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Image-Type")
    
    return res
}

export const config = {
    matcher: "/api/:path*"
}