import React, { useContext, useState } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = () => {
  return (
    <div>
      <AddNote />
      <Notes></Notes>
    </div>
  )
}

export default Home