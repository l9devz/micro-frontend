import '@l9/common/styles/index.css'
import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Main'
const Example = React.lazy(() => import('example/Example'))

export interface IAppProps {}

export default function App(props: IAppProps) {
  console.log(process.env.ENV)
  return (
    <div>
      <h1 className='text-red-600 text-7xl'>Hello</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />

          <Route
            path='example/*'
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Example />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
