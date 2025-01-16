import ErrorDisplay from '../../(components)/common/ErrorDisplay'
import React from 'react'

const TestingPage = () => {
  const error = 'This is an error message'
  return (
    <div className="flex justify-center items-center h-full">
      <ErrorDisplay messages={[error]} />
    </div>
  )
}
export default TestingPage
