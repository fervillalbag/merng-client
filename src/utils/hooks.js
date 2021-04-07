
import { useState } from 'react'

function Hooks(callback, initialState = {}) {

  const [values, setValues] = useState(initialState)

  const onChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    callback()
  }

  return {
    onChange,
    onSubmit,
    values
  }
}

export default Hooks
