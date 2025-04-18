"use client"
import React, {FC, useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface Props {
    id: string
}

const ImagePreviewer: FC<Props> = ({id}) => {
    const router = useRouter()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3000/api/download/${id}`)
            if (!res.ok) router.push(`/`)
            const url = await res.json()
            console.log(url)
            setImageUrl(url)
        })()
    }, [id])
    return (
        <>
            <div className={`card h-[360px] mx-auto`}>
                <div className={`w-full h-full relative rounded-[inherit] overflow-hidden`}>
                    {imageUrl ? <Image src={imageUrl} alt={`image`} fill className={`pointer-events-none`}/> : <div>Loading</div>}
                </div>
            </div>

            <div className={`flex justify-center gap-x-4 mt-8`}>
                <button
                    className={`bg-sky-blue px-4 py-2 rounded-md flex text-xs items-center gap-x-2 hover:cursor-pointer text-white`}>
                    <Image src={`/Link.svg`} alt={`share icon`} width={16} height={16}/>
                    <span>Share</span>
                </button>
                <button
                    className={`bg-sky-blue px-4 py-2 rounded-md flex text-xs items-center gap-x-2 hover:cursor-pointer text-white`}>
                    <Image src={`/download.svg`} alt={`download icon`} width={16} height={16}/>
                    <span>Download</span>
                </button>

            </div>
        </>
    )
}

export default ImagePreviewer
