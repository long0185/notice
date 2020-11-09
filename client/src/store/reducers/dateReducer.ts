
export type dateArrType = {
    year: number,
    month: number,
    day: number,
    chooseDate: {
        month: number,
        day: number
    }
}
const intialState: dateArrType = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    chooseDate: {
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    }
}
function reducer(state = intialState, action) {
    switch (action.type) {
        case 'change-year':
            return { ...state, year: action.payload }
        case 'change-month':
            return { ...state, month: action.payload }
        case 'change-day':
            return { ...state, day: action.payload }
        case 'change-choosedate-month':
            return { ...state, chooseDate:{...state.chooseDate, month:action.payload } }
            case 'change-choosedate-day':
                return { ...state, chooseDate:{...state.chooseDate, day:action.payload } }
        default:
    return state
}
}
export default reducer