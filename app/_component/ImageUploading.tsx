const ImageUploading = () => {
    return (
        <div className={`card h-[120px] flex-col gap-y-5`}>
            <span><b>Uploading</b>, please wait..</span>
            <div className={`w-4/5 bg-light-gray h-2 rounded-full overflow-hidden relative`}>
                <div className={`bg-sky-blue w-1/5 h-full animate-loading-bar rounded-[inherit] absolute`}></div>
            </div>
    </div>
    )
}

export default ImageUploading;