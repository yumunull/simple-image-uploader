import Image from "next/image";

const Top = () => {
    return (
        <div className={`flex justify-between px-24 items-center w-full border-b-[1px] border-light-gray border-solid py-4`}>
            <Image src={`/logo.svg`} alt={`logo`} width={150} height={150}/>
            <button className={`border-light-gray rounded-2xl border-[1px] border-solid h-12 aspect-square`}>
                <Image src={`/Moon_fill.svg`} alt={`dark theme icon`} width={20} height={20} className={`m-auto`}/>
            </button>
        </div>
    )
}

export default Top;