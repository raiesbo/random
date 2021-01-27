import * as actions from "./actionsTypes";

// export function bugAdded(description) {
//     return {
//         type: actions.ADD_BUG,
//         payload: {
//             description: description
//         }
//     }
// }


// export function bugRemoved(id) {
//     return {
//         type: actions.REMOVE_BUG,
//         payload: {
//             id: id
//         }
//     }
// }

// ARROW FUNCTIONS ARE A BIT CLEANER IN THIS CASE

export const bugAdded = description => ({
    type: actions.ADD_BUG,
    payload: {
        description: description
    }
})


export const bugRemoved = id => ({
    type: actions.REMOVE_BUG,
    payload: {
        id: id
    }
})

export const bugResolved = id => ({
    type: actions.RESOLVE_BUG,
    payload: {
        id: id
    }
})