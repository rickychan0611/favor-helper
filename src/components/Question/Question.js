import React from 'react'

import styles from './styles'

const Question = ({item, key}) => {
  return (
    <div>
    <p>
      Q{key}: {item.question}
    </p>
    </div>
  )
}

export default Question