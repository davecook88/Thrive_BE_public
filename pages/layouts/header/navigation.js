import React from 'react'
import Toggle from '../../components/toggle';
import DarkMode from './../../components/darkmode';
// import { FaGithubSquare } from 'react-icons/fa';
import GithubIcon from '../../components/icons/github'



const Navigation = () => {
    return (
        <div>
            <div className="ml-10 flex items-baseline space-x-4">
                <div><DarkMode/></div>
                {/* <div><FaGithubSquare/></div> */}
                <div className="max-w-1 w-1"><GithubIcon /></div>
            </div>
        </div>
    )
}

export default Navigation
