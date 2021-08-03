import React, {useState} from 'react'

interface iData {
    number:number,
    people: {
        name:string,
        age:number,
        remarks?: string,
    }[],

}

const TypeState = () => {

    const [number, setNumber] = useState<iData['number']>(4);

    const [persons, setPersons] = useState<iData['people']>([]);


    // const clickMEOK = () => {
    //     alert("Hello");
    // }

    function clickMEOK(){
        alert("CLIK MEee")
    }

    return (
        <div>
            <h1>Krishna</h1>
            <button onClick={clickMEOK}>Click Me</button>
            <h3>The final value is {number}</h3>
           
        </div>
    )
}

export default TypeState
