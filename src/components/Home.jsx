import React from 'react'
import AuthDetails from './AuthDetails'

export default function Home(props) {
  return (
    <div>
        <AuthDetails changeSuccess = {props.changeSuccess} />
    </div>
  )
}
