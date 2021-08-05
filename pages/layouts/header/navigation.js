import React from 'react'
import Toggle from '../../components/toggle';
import DarkMode from './../../components/darkmode';


const Navigation = () => {
    return (
        <div>
            <div className="ml-10 flex items-baseline space-x-4">
                <DarkMode/>
                <Toggle/>
            </div>
        </div>
    )
}

export default Navigation
