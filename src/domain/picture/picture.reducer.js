import { types } from './picture.actions';

export default function reducer(state, action) {
    let {pictures} = state;
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            const idx = pictures.findIndex(picture => picture._id === action.payload._id);
            pictures[idx] = {...pictures[idx], ...action.payload};
            //pictures[idx] = { ...pictures[idx], likedBy: [...pictures[idx].likedBy, state.user._id] };
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_UNLIKED:
            const idxUnlike = pictures.findIndex(picture => picture._id === action.payload._id);
            const likedBy = pictures[idxUnlike].likedBy.filter(userId => userId !== state.user._id)
            //pictures[idxUnlike] = { ...pictures[idxUnlike], likedBy: likedBy };
            pictures[idxUnlike] = {...pictures[idxUnlike], ...action.payload};
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
