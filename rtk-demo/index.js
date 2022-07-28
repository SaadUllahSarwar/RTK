const store = require('./app/store');

const cakeActions = require('./app/features/cake/cakeSlice').cakeActions;
const icecreamActions = require('./app/features/icecream/icecreamSlice').icecreamActions

console.log('initital state is :', store.getState())
const unsubscribe = store.subscribe(()=>{
    console.log('updated state is :', store.getState())
})

store.dispatch(cakeActions.ordered()); //1
store.dispatch(cakeActions.ordered()); //2
store.dispatch(cakeActions.ordered()); //3
store.dispatch(cakeActions.ordered()); //4
store.dispatch(cakeActions.ordered()); //5
store.dispatch(cakeActions.restocked(3)); //1

store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.ordered());
store.dispatch(icecreamActions.restocked(12));


unsubscribe();