import * as actions from "./actionsTypes";
// []
let lastId = 0;

export default function reducer(state = [], action) {
    if (action.type === "ADD_BUG") {
        return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            }
        ];
    } else if (action.type === "REMOVE_BUG") {
        return state.filter(bug => bug.id !== action.payload.id);
    } else if (action.type === "RESOLVE_BUG") {
        return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
    } else {
        return state;
    }
}

//  DOESNT MATTER WHAT TYPE OF SYSTEM WE USE, REDUX DOESNT CARE

// function reducer2(state = [], action) {
//     switch (action.type) {
//         case actions.ADD_BUG:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: fase
//                 }
//             ]
//         case actions.REMOVE_BUG:
//             return state.filter(bug => bug.id !== action.payload.id);
//         default:
//             return state;
//     }
// }