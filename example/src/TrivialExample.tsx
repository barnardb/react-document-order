import React, { useReducer } from 'react'
import { createOrderedValues } from 'react-document-order'

const LabelOrder = createOrderedValues<string>()

const Label = ({ name }: { name: string }) => {
  LabelOrder.useRegister(name)
  const next = LabelOrder.useValueAfter(name)
  return <div style={label}>
    Label {name} followed by {
      next || <span role="img" aria-label="nothing" style={nullIndicator}>❌</span>
    }
  </div>
}

export default function TrivialExample() {
  const [middleLables, addMiddleLabel] = useReducer(([...labels], label: string) => [...labels, label], ["baz"])

  return (
    <LabelOrder.Provider>
      <Label name="foo" />
      <LabelOrder.Provider>
        {middleLables.map(l => <Label key={l} name={l} />)}
      </LabelOrder.Provider>
      <Label name="bar" />
      <button onClick={() => addMiddleLabel(`mid ${middleLables.length}`)}>Add</button>
    </LabelOrder.Provider>
  )
}

const label = { margin: "0.4em", backgroundColor: "#def", padding: "0.4em", borderRadius: "1em" }
const nullIndicator = { lineHeight: 1 }
