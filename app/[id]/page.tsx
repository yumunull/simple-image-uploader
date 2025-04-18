"use client"
import {useParams} from "next/navigation";
import ImagePreviewer from "@/app/_component/ImagePreviewer";

const  HomeWithId= () => {
    const {id} = useParams<{id: string}>()
    return (
            <ImagePreviewer id={id}/>
    )
}

export default HomeWithId;