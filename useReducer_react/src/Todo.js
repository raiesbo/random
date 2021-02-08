import { ACTIONS } from "./App"


export default function Todo({ item, id, dispatch }) {


    return (
        <div key={id}>
            <span style={{ color: !item.completed ? "black" : "grey" }}>
                {item.name}
            </span>
            <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id } })}>Toogle</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })}>Delete</button>
        </div>

    )
}