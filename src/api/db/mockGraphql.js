import fake from 'faker'
import { MockList } from 'graphql-tools'

export default {
  Query: () => ({
    getUSDAData: () => {
      console.log('list')
      return [new MockList(1)]
    }
  }),
  USDADataList: () => ({
    q: fake.random.word(),
    sr: 'Standard Release',
    ds: 'Standard Reference',
    start: '0',
    end: '25',
    total: '100',
    group: '1000',
    sort: 'n',
    item: () => new MockList(25)
  }),
  USDADataItem: () => ({
    offset: 1,
    group: '100',
    name: fake.random.word(),
    ndbno: () => (fake.random.number({min: 10000, max: 99999}).toString()),
  }),
  USDAData: () => ({
    list: () => new MockList(1)
  })
}