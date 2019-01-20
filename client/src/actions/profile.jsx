import axios from 'axios';

// Get profile if exists
export const getProfile = () => dispatch =>{
    dispatch(loadingProfile());
    axios.get('/api/profile').then(res =>
        dispatch({
            type:'GET_PROFILE',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'GET_PROFILE',
            payload:{}
        })
    );
};

export const getProfiles = () => dispatch =>{
    dispatch(loadingProfile());
    axios.get('/api/profile/all').then(res =>
        dispatch({
            type:'GET_PROFILES',
            payload:res.data
        })
    ).catch(error=>
        dispatch({
            type:'GET_PROFILES',
            payload:null
        })
    );
};

// Go to dashboard when profile created
export const createProfile = (data, history) => dispatch =>{
    axios.post('/api/profile',data).then(res =>{
        history.push('/dashboard');
    }).catch(error=>{
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    });
};

export const getProfilebyRoute = (data) => dispatch =>{
    dispatch(loadingProfile());
            axios.get(`/api/profile/route/${data}`).then(res =>{
            dispatch({
                type: 'GET_PROFILE',
                payload: res.data
            })
        }).catch(error=>{
            dispatch({
                type:'ERRORS',
                payload: null
              })
        });
};

//Upload image
export const uploadImage = (data,history) => dispatch =>{
    console.log('in action');
    console.log(data);
    axios.post('/api/profile/img_data',data).then(res=>{
        history.push('/dashboard');
    }).catch(error=>{
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    });
};

// Create vehicle  information
export const createCarInfo = (data, history) => dispatch =>{
    axios.post('/api/profile/carInfo',data).then(res=>{
        history.push('/dashboard');
    }).catch(error=>{
        dispatch({
            type:'ERRORS',
            payload:error.response.data
        })
    });
};

export const deleteCarInfo = (infoID) => dispatch =>{
    if(window.confirm('You sure you want to delete your vehicle  information?')){
        axios.delete(`/api/profile/carinfo/${infoID}`).then(res =>{
            dispatch({
                type: 'GET_PROFILE',
                payload: res.data
            })
        }).catch(error=>{
            dispatch({
                type:'ERRORS',
                payload: error.response.data
              })
        });
    }
};


// Delete Account and Profile totaly
export const deleteAccount = () => dispatch =>{
    if(window.confirm('You sure you want to delete your account?')){
        axios.delete('/api/profile').then(res =>{
            dispatch({
                type: 'DECODED_USER',
                payload: {}
            })
        }).catch(error=>{
            dispatch({
                type:'ERRORS',
                payload: error.response.data
              })
        });
    }
};

// Set spinner gif when connecting
export const loadingProfile = ()=>{
    return{
        type:'LOADING_PROFILE'
    };
};

// Set user profile to null on disconnection 
export const clearConnectedProfile = ()=>{
    return{
        type:'CLEAR_CONNECTED_PROFILE'
    };
};

