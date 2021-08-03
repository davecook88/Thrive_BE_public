import React from 'react'
import PropTypes from 'prop-types'

type userData = {
    title:string,
    age:number,
}

function Krishna({title,age}:userData) {
    return (
        <div>
           <h1>
           My name is {title} and I am {age} years old.
           </h1>
        </div>
    )
}



export default Krishna