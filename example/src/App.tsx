import React from 'react'
import ReadmeExample from './ReadmeExample'
import ToDoList from './ToDoList'
import TrivialExample from './TrivialExample'

const App = () => {
  return (
    <div>
      <h1><code>react-document-order</code> Demo</h1>

      <section>
        <h2>Readme Example</h2>
        <p>Use the up and down arrow keys to move between fields,
          with and without an email address ending in "@example.com".</p>
        <ReadmeExample />
      </section>

      <section>
        <h2>Trivial Example</h2>
        <p>Look at the code to see how each label refers to the next label.</p>
        <TrivialExample />
      </section>

      <section>
        <h2>Hierarchical To-Do List</h2>
        <ToDoList />
      </section>

    </div>
  )
}

export default App
