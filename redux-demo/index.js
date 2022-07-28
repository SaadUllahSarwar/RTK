import redux from "redux";
import reduxLogger from "redux-logger";

const applyMiddleware = redux.applyMiddleware; //MIDDLEWARE
const logger = reduxLogger.createLogger();     // MIDDLEWARE'S LOGGER

const createStore = redux.createStore;

const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKEDS";

const ordercake = () => {
  // ORDERING A CAKE
  return {
    // ACTION
    type: CAKE_ORDERED,
    payload: 1,
  };
};
const restockCake = (qty = 1) => {
  // RESTOCKING A CAKE
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
};
const orderIcecream = (qty = 1) => {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
};
const restockIcecream = (qty = 1) => {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
};
// (previousState, action) => newState

// const initialState = {
//     //GLOBAL STATE
//     numOfCakes : 10,
//     numOfIcecreams :20,
// }
const initialIcecreamState = {
  numOfIcecreams: 20,
};

const initialCakeState = {
  numOfCakes: 10,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};
const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({ // COMBINE REDUCERS
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer,applyMiddleware(logger)); // HOLDING APP STATE
console.log("initial State", store.getState()); //GET STATE
const unsubscribe = store.subscribe(() =>{}); //SUBSCRIBE LISTENER &&& LOGGER MIDDLEWARE 
// store.dispatch(ordercake()); //DISPATCH
// store.dispatch(ordercake()); //DISPATCH
// store.dispatch(ordercake()); //DISPATCH
// store.dispatch(restockCake(4));

const actions = bindActionCreators(
  { ordercake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
//ACTION DISPATCHED
actions.ordercake();
actions.ordercake();
actions.restockCake(3);
actions.orderIcecream();
actions.restockIcecream(5);

unsubscribe();
