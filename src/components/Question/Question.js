import React from 'react'

import styles from './styles'

const Question = ({item}) => {
  return (
    <div>
    <h4 style={{marginBottom: 0}}>
      Q: {item.question} </h4>
      <p style={{marginBottom: 10, fontSize: 10}}>({item.createAt.toDate().toLocaleString()})</p>
      {/* ({item.createAt.toDate().toLoca}) */}
    
    </div>
  )
}

export default Question