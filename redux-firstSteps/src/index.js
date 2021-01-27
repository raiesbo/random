console.log("Hello World!");

import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";



store.subscribe(() => {
    console.log("Store changed!", store.getState()) // this funciton will get triggered everytime the state of the store gets changed
})

// console.log("store: ", store.getState())

store.dispatch(bugAdded("Bug 1"));

// console.log("store: ", store.getState())

//unsubscribe(); // this will prevents from memory leeks when the user goes away from the ui area
store.dispatch(bugResolved(1))


store.dispatch(bugRemoved(1))

// console.log("store: ", store.getState())