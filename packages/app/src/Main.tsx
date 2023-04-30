import * as React from 'react'
import { Link } from 'react-router-dom'

export interface MainProps {}

export default function Main(props: MainProps) {
  return (
    <div>
      THIS IS MAIN
      <br />
      <Link to='/example'>Go to example</Link>
    </div>
  )
}
