import React from 'react'
import Toggle from '../../toggle';
// import DarkMode from '../../darkmode';
// import { FaGithubSquare } from 'react-icons/fa';
import GithubIcon from '../../icons/github'
import Link from 'next/link'




const Navigation = () => {
    return (
        <div>
            <div className="ml-10 flex items-baseline space-x-4">
                <div><Toggle/></div>
                {/* <div><FaGithubSquare/></div> */}
                <div className="max-w-1 w-1"><GithubIcon /></div>

                <div>
                <Link href="/">
                    <a>Home</a>
                </Link>
                </div>

                <div>
                <Link href="/about">
                    <a>About Us</a>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation
