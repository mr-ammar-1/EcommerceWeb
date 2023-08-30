import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
    },
    reducers: {
        SetUser: (state, action) => {
             state.user =  action.payload
        },
    }
});

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: null,
    },
    reducers: {
        SetSearch: (state, action) => {
             state.seacrh =  action.payload
        },
    }
});


export const { SetUser,SetSearch } = usersSlice.actions;