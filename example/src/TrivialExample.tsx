import React, { useReducer } from 'react'
import { createOrderedValues } from 'react-document-order'

const LabelOrder = createOrderedValues<string>()

const Label = ({ name }: { name: string }) => {
  LabelOrder.useRegister(name)
  const next = LabelOrder.useValueAfter(name)
  console.log("BEHOLD", name, next)
  return <div>Label {name} followed by {next}</div>
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
      <button onClick={() => addMiddleLabel(`new middle label ${middleLables.length}`)}>Add</button>
    </LabelOrder.Provider>
  )
}
