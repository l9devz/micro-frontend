import Nested from '@/components/Nested'
import '@l9/common/styles/index.css'
import * as React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

export default function Example() {
  return (
    <div className='text-blue-700'>
      Example
      <br />
      <Link to='/'>Back to home</Link>
      <br />
      <Link to='/example/nested'>Go to nested</Link>
      <Routes>
        <Route path='nested' element={<Nested />}></Route>
      </Routes>
    </div>
  )
}
