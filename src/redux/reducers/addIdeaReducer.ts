import { addIdeaConstants } from "redux/actionTypes/addIdeaConstants";

const initialState = {
    title: "",
    description: "",
    documents: [],
    idea_tags: [1,2,3,4],
}

const updateIdeaInfoReducer = (state = initialState, action: any)=>{
    switch(action.type){
        case addIdeaConstants.IDEA_UPDATE_TITLE:
            return {
                ...state,
                title: action.payload,
            }
        case addIdeaConstants.IDEA_UPDATE_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            }
        case addIdeaConstants.IDEA_UPDATE_DOCUMENTS:
            return {
                ...state,
                documents: action.payload,
            }    
        case addIdeaConstants.IDEA_UPDATE_IDEA_TAGS: 
            return {
                ...state,
                idea_tags: action.payload, 
            }    
        case addIdeaConstants.IDEA_UPDATE_LOOKING_FOR_TEAM:
            return {
                ...state,
                looking_for_team: action.payload,
            }    
        case addIdeaConstants.IDEA_UPDATE_LOOKING_FOR_MENTOR: 
            return {
                ...state,
                looking_for_mentor: action.payload,
            }    
        case addIdeaConstants.IDEA_UPDATE_ROLE_LOOKING_FOR: 
            return {
                ...state,
                required_roles: action.payload,
            }   
        case addIdeaConstants.IDEA_CLEAR_DATA:
             return {
                 ...initialState,
             }
        default: return state;
    }
}

export {
    updateIdeaInfoReducer,
}