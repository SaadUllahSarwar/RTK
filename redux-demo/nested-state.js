import redux from "redux";
import produce from "immer";


const initialState = {
  name: "saadUlahSarwar",
  address: {
    houseNo: "54b",
    city: "lahore",
    state: "punjab",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateHouse = (houseNO) => {
  return {
    type: STREET_UPDATED,
    payload: houseNO,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       houseNo: action.payload,
    //     },
    //   } 
    return produce(state,(draft)=>{
        draft.address.houseNo = action.payload
    })
      default : {
          return state
      }
  }
};

const store = redux.createStore(reducer); // HOLDING APP STATE
console.log("initial State", store.getState()); //GET STATE
const unsubscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(updateHouse("62B,UET"));
unsubscribe()
