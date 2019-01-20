const initialState = {
    posts:[],
    post:{},
    loading:false
};

export default function (state = initialState, action){
    switch(action.type){
            
        case 'GET_POST':
            return{
                ...state,
                post: action.payload,
                loading: false
            }

        case 'ADD_POST':
            return{
                ...state,
                posts:[action.payload,...state.posts]
            }

        case 'LOADING_POSTS':
            return{
                ...state,
                loading:true
            }

        case 'GET_POSTS':
            return{
                ...state,
                posts: action.payload,
                loading: false
            }

        case 'DELETE_POST':
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)//delete in the UI for not refreshing the page
            }
        
        default:
            return state;
    }
}