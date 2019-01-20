import axios from 'axios';

// Add new post 
export const addPost = (data) => dispatch =>{
    dispatch(resetErrors());
    axios.post('/api/posts',data).then(res =>
        dispatch({
            type:'ADD_POST',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const addComment = (postID,data) => dispatch =>{
    dispatch(resetErrors());
    axios.post(`/api/posts/comment/${postID}`,data).then(res =>
        dispatch({
            type:'GET_POST',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const getPost = (id) => dispatch =>{
    axios.get(`/api/posts/${id}`).then(res =>
        dispatch({
            type:'GET_POST',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'GET_POST',
            payload:null
        })
    );
};

export const deletePost = (id) => dispatch =>{
    axios.delete(`/api/posts/${id}`).then(res =>
        dispatch({
            type:'DELETE_POST',
            payload:id
        })
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const deleteComment = (postID,commentID) => dispatch =>{
    axios.delete(`/api/posts/comment/${postID}/${commentID}`).then(res =>
        dispatch({
            type:'GET_POST',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const likePost = (id) => dispatch =>{
    axios.post(`/api/posts/like/${id}`).then(res =>
        dispatch(getPosts())
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};

export const removeLike = (id) => dispatch =>{
    axios.post(`/api/posts/unlike/${id}`).then(res =>
        dispatch(getPosts())
    ).catch(error=>
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    );
};


export const getPosts = () => dispatch =>{
    dispatch(loadingPost());
    axios.get('/api/posts').then(res =>
        dispatch({
            type:'GET_POSTS',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'GET_POSTS',
            payload:null
        })
    );
};

// Set spinner gif when connecting
export const loadingPost = ()=>{
    return{
        type:'LOADING_POSTS'
    };
};

export const resetErrors = ()=>{
    return{
        type:'RESET_ERRORS'
    };
};


