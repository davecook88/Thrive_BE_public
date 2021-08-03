import React, {useState, useEffect} from 'react'
import PersonLists from './components/personlists'

interface iData {
    number:number,
    people: {
        name:string,
        age:number,
        remarks?: string,
    }[],

}
function Typestate2() {
    const [number, setNumber] = useState<iData['number']>(4);

    const [persons, setPersons] = useState<iData['people']>([]);

    // const clickMEOK = () =>{
    //     alert("Hello");
    // }

    function clickMEOK(){
        alert("CLICK ME")
    }

    useEffect(() => {
        setPersons([
            {
                name:"Krishna",
                age:15,
                remarks:"I am Good"
            },
            {
                name:"Santa",
                age:15
            }
        ])
    }, [])

    return (
        <div>
            <h1>the number is {number}</h1>
            <button onClick={clickMEOK}>Click Me</button>
            <ul>
            {
                persons.map((person)=>(
                   
                   <PersonLists key={Math.floor(Math.random() * 10)} people={person}/>
                ))
            }
            </ul>
            
        </div>
    )
}

export default Typestate2
