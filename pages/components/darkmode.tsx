import React from 'react'

const DarkMode = () => {
    const enableDarkMode = () => {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark')
    }

    const disableDarkMode = () => {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark')

    }
    return (
        <>
            <button className="dark:text-white" onClick={enableDarkMode}>
                Enable Dark Mode
            </button>

            <button className="dark:text-white" onClick={disableDarkMode}>Disable Dark Mode</button>
        </>
    )
}

export default DarkMode
