import React from 'react'

const About = () => {
    return (
        <div className="bg-skin-fill dark:bg-skin-dark m-auto flex justify-center h-screen">

            <div className='my-auto'>
            {/* <button 
            className="
            h-auto p-5 bg-skin-button-accent-hover border-2 rounded-md align-middle
            dark:border-white dark:border-2 dark:bg-skin-dark dark:text-skin-muted
            ">
                <small>Krishna</small>
            </button> */}

           <div className=" relative  w-28 h-28 ">
           <img src="/avatar.jpg" className="rounded-full border border-gray-100 shadow-sm "/>
           
           <div className="absolute bottom-0 right-0 w-6 h-6 my-2 border-2 border-white rounded-full bg-green-400 z-2
           	hover:bg-skin-dark hover:scale-200
           ">
               
           </div>
           </div>
            </div>

            
            
        </div>
    )
}

export default About
