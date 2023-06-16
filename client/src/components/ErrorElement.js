import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorElement = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Something went wrong!!</h1>
      <p>{err.data}</p>
    </div>
  )
}

export default ErrorElement