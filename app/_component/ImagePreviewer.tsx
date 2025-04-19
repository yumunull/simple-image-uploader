"use client"
import React, {FC, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

interface Props {
    id: string
}

const ImagePreviewer: FC<Props> = ({id}) => {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3000/api/download/${id}`)
            if (!res.ok) router.push(`/`)
            const url = await res.json()
            console.log(url)
            setImageUrl(url)
        })()
    }, [id])
    
    const handleCopyUrl = async () => {
        if (!imageUrl) return
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`)
    }
    
    const handleDownload = async () => {
        if (!imageUrl) return
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = id;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <>
            <div className={`card h-[360px] mx-auto`}>
                <div className={`w-full h-full relative rounded-[inherit] overflow-hidden flex justify-center items-center`}>
                    {imageUrl && <Image src={imageUrl} alt={`image`} fill className={`pointer-events-none`} priority onLoad={()=>setIsImageLoaded(true)}/> }

                    {(!imageUrl || !isImageLoaded) && <div>Loading</div>}
                </div>
            </div>

            <div className={`flex justify-center gap-x-4 mt-8`}>
                <button
                    onClick={handleCopyUrl}
                    className={`bg-sky-blue px-4 py-2 rounded-md flex text-xs items-center gap-x-2 hover:cursor-pointer text-white`}>
                    <Image src={`/Link.svg`} alt={`share icon`} width={16} height={16}/>
                    <span>Share</span>
                </button>
                <button
                    onClick={handleDownload}
                    className={`bg-sky-blue px-4 py-2 rounded-md flex text-xs items-center gap-x-2 hover:cursor-pointer text-white`}>
                    <Image src={`/download.svg`} alt={`download icon`} width={16} height={16}/>
                    <span>Download</span>
                </button>
            </div>
        </>
    )
}

export default ImagePreviewer
