import { createOrderedValues } from '.'

// TODO FIXME We need real tests. This is essentially just the stub that create-react-library gave us.

const OrderedLabels = createOrderedValues<string>()

describe('OrderedValues', () => {
  it('is truthy', () => {
    expect(OrderedLabels).toBeTruthy()
  })
})
