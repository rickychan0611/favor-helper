import React from 'react'

const FormatDate = ({ date }) => {
  return (
    <>
      {date.toDate().toLocaleString(
        'en-US',
        {
          weekday: 'short',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }
      )}
    </>
  )
}

export default FormatDate