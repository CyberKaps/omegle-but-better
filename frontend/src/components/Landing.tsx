import { useState } from "react"


export const Landing = () => {

    const [name, setName] = useState("");

    return <div>
        <input onChange={(e) => {
            setName(e.target.value)
        }} type="text" />
        <button onClick={() => {
            // join room logic here
        }}>Join</button>
    </div>
}