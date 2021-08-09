import React from 'react'
import Logo from './logo'
import Navigation from './navigation'

const Header = () => {
    return (
        <>
            <section className="header bg-gray-10 border-b dark:bg-gray-900">
                <div className="flex items-center justify-between h-16 max-w-screen-lg mx-auto ">
                   <Logo />
                   <Navigation />
                </div>
            </section>
        </>
    )
}

export default Header
