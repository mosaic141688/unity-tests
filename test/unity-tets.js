import test from 'ava'
var unity = require('@locational/unity')
const store = new unity.Store()

store.registerValue('number_value',unity.value(9))
store.registerValue('table',[
    {
        name:'Sihle',
        surname:'Mbhamali',
        age:9
    },
    {
        name:'John',
        surname:'Smithi',
        age:10
    }
])

store.registerValue('list',[1, 2, 3])


const config_a = {
    input: {dep:'@list'},
    pipeline: [
        {
            type: 'where',
            options: {
                expression: {
                    gt: [
                        { dep: '$element' },
                        { value: 2 }
                    ]
                }
            }
        }
    ]
};




test('Store Register and lookup Value',t => {
  let actual = unity.value(9);
  let expected = store.lookupValue('number_value')
  console.log(expected)
  t.deepEqual(actual, expected)  
})

test('Store lookup table',t => {
    let actual = [
        {
            name:'Sihle',
            surname:'Mbhamali',
            age:9
        },
        {
            name:'John',
            surname:'Smithi',
            age:10
        }
    ]
    let expected = store.lookupValue('table')
    t.deepEqual(actual, expected)  
})

test('Store Config', t => {
    store.registerConfig('config_a',config_a)
    console.log(store.v('config_a'))
    t.true(true)
})