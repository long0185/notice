
export type listArrType = {
    id: string,
    noticeTime: string,
    complete: boolean,
    isNotice: boolean,
}
export type listType = {
    currentDate: string
    currentTime: string,
}
const intialState: listType = {
    currentDate: '',
    currentTime: (new Date().getHours()<10?'0'+new Date().getHours():new Date().getHours())+':'+(new Date().getMinutes()<10?'0'+new Date().getMinutes():new Date().getMinutes())
}
function reducer(state = intialState, action) {
    switch (action.type) {
        case 'change-date':
            return { ...state, currentDate: action.payload }
        case 'change-time':
            return { ...state, currentTime: action.payload }
        default:
            return state
    }
}
export default reducer