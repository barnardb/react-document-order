import React, { CSSProperties } from 'react'
import ReadmeExample from './ReadmeExample'
import ToDoList from './ToDoList'
import TrivialExample from './TrivialExample'

const App = () => {
  return (
    <div style={app}>

      <h1 style={h1}><code>react-document-order</code> Demo</h1>

      <p style={p}>
        This is a small demonstration of <a
          style={a}
          href="https://github.com/barnardb/react-document-order"
        >react-document-order</a>.

        The examples are best understood with reference to their code.

        The <a
          style={a}
          href="https://github.com/barnardb/react-document-order#react-document-order"
        ><code>README.md</code> file</a> walks through the code implmenting the "Readme Example"
      </p>

      <main style={main}>

        <section style={section("#ca8")}>
          <h2>Readme Example</h2>
          <p><a style={a} href="https://github.com/barnardb/react-document-order/blob/main/example/src/ReadmeExample.tsx">See the code in <code>.tsx</code></a></p>
          <p>Use the up and down arrow keys to move between fields,
          with and without an email address ending in "@example.com".</p>
          <ReadmeExample />
        </section>

        <section style={section("#8ca")}>
          <h2>Trivial Example</h2>
          <p><a style={a} href="https://github.com/barnardb/react-document-order/blob/main/example/src/TrivialExample.tsx">See the code in <code>TrivialExample.tsx</code></a></p>
          <p>Look at the code to see how each label refers to the next label.</p>
          <TrivialExample />
        </section>

        <section style={section("#a8c")}>
          <h2>Hierarchical To-Do List</h2>
          <p><a style={a} href="https://github.com/barnardb/react-document-order/blob/main/example/src/ToDoList.tsx">See the code in <code>ToDoList.tsx</code></a></p>
          <ToDoList />
        </section>

      </main>

    </div>
  )
}

export default App

// Good-enough-for-a-demo style managment ;)
const app: CSSProperties = { margin: "1.5em", display: "flex", flexDirection: "column", alignItems: "center" }
const h1: CSSProperties = { margin: "0.5em" }
const p: CSSProperties = { marginInline: "0.5em", maxWidth: "40em", textAlign: "center" }
const a: CSSProperties = { fontWeight: "bold" }
const main: CSSProperties = { width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }
const section = (color: string): CSSProperties => ({ margin: "0.5em", flex: "1 0 auto", maxWidth: "28em", width: "15em", border: `0.5em solid ${color}`, borderRadius: "1em", padding: "1em" })
