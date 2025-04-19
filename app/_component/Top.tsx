"use client"
import Image from "next/image";
import {useEffect, useState} from "react";

const Top = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    useEffect(() => {
        // On mount, initialize from localStorage or system preference
        const savedTheme = localStorage.theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const handleSwitchTheme = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)

        if (newMode) {
            localStorage.theme = 'dark'
            document.documentElement.classList.add('dark')
        } else {
            localStorage.theme = 'light'
            document.documentElement.classList.remove('dark')
        }
    }
    
    return (
        <div className={`flex justify-between px-8 lg:px-12 xl:px-24 items-center w-full border-b-[1px] border-light-gray dark:border-dark-gray border-solid py-4`}>
            <Image src={isDarkMode ? `/logo-dark-theme.svg` : `/logo.svg`} alt={`logo`} width={150} height={150}/>
            <button className={`border-light-gray rounded-xl border-[.5px] border-solid h-12 aspect-square dark:bg-dark-gray`} onClick={handleSwitchTheme}>
                <Image src={isDarkMode ? `/Sun_fill.svg` : `/Moon_fill.svg`} alt={`dark theme icon`} width={20} height={20} className={`m-auto`}/>
            </button>
        </div>
    )
}

export default Top;