import {useState} from 'react'

export default function SearchBar(props) {
    const {onSubmit} = props
    // array destructuring
    const [term, setTerm] = useState('')
    const handleChange = (event) => {
        // TODO
        setTerm(event.target.value)  // update the state, this new state is bound to the term value
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onSubmit(term)
    }
    return (
        <div>
            <form onSubmit = {handleFormSubmit} >
            <input onChange = {handleChange} value = {term} />
            </form>
        </div>
    )
}