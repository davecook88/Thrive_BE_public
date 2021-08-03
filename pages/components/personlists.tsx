import React from 'react'

interface iProps {
    // number:number,
    people: {
        name:string,
        age:number,
        remarks?: string,
    },

}

function Personlists({people}:iProps) {
    return (
        <>
            <li key={Math.floor(Math.random() * 10)}>
                      <p className="">My name is {people.name}. My age is {people.age} and my comment is {people.remarks}</p>
            </li>
        </>
    )
}

export default Personlists
