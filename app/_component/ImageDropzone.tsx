"use client"
import React, {FC, useState} from "react";
import Image from "next/image";
import {useDropzone} from "react-dropzone";
import ImageUploading from "@/app/_component/ImageUploading";
import {useRouter} from "next/navigation";

const ImageDropzone = () => {
    const {getRootProps, getInputProps, isDragActive, acceptedFiles, inputRef} = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/gif": [".gif"]
        },
        maxFiles: 1,
        maxSize: 2 * 1024 * 1024,
        noClick: true,
        onDropAccepted: async (files) => {
            const file = files[0]
            await uploadFile(file)
        }
    })
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()
    const uploadFile = async (file: File) => {
        if (!file || file.type != "image/jpeg" && file.type != "image/png" && file.type != "image/gif") return
        const formData = new FormData()
        formData.append("file", file)

        try {
            setIsUploading(true)
            const res = await fetch("http://localhost:3000/api/upload", {
                method: "POST",
                body: formData,
            })
            const url = await res.json()
            router.push(`${url}`)
            
        } finally {
            setIsUploading(false)
        }
    }

    if (isUploading) return <ImageUploading/>
    
    const handleBrowseFile = () => {
        inputRef.current?.click()
    }
    
    return (
        <div className={`card h-[360px]`}>
            <div {...getRootProps()}
                 className={`rounded-[inherit] border-light-gray border-2 border-dashed flex flex-col justify-center items-center w-full h-full ${isDragActive ? `bg-light-gray` : ``}`}>

                <input type={`file`} accept={`image/jpeg,image/png,image/gif`} {...getInputProps()}/>
                <Image className={`pointer-events-none`} src={`/exit.svg`} alt={`upload icon`} width={40}
                       height={40}/>
                <span className={`mt-4 text-nearly-black text-[14px] font-medium`}>Drag & drop a file or <span
                    className={`text-sky-blue cursor-pointer hover:underline`}
                    onClick={handleBrowseFile}>browse files</span></span>
                <span className={`text-dark-blue text-[12px] font-light`}>JPG, PNG or GIF - Max file size 2MB</span>
            </div>
        </div>
    )
}

export default ImageDropzone;