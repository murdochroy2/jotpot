import { useState } from "react"
import NoteContext from "./NoteContext"
const NoteState = (props) => {
    const defaultState = {
        name: "Rohi",
        class: 1
    }
    const [state, setState] = useState(defaultState)
    const update = () => {
        setTimeout(() => {
            setState({name:"Modak", "class": 2})
        }, 1000);
    }
    return (<NoteContext.Provider value={{ state, update }}>
        {props. children}
    </NoteContext.Provider>)
}

export default NoteState