import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activeUserService, changeUserRoleService, createUserService, deleteUserService, getAllUserService } from "../Services/registerService";

const initialState= {
    isLoading: false,
    listUser: {}
};
export const getAllUserAsync = createAsyncThunk(
    "getAllUser",
    async (pages) => {
        const response = await getAllUserService(pages);
        return response.data;
    }
);
export const deleteUserAsync = createAsyncThunk(
    "deleteUser",
    async (id) => {
        const response = await deleteUserService(id);
        return response.data;
    }
);
export const createUserAsync = createAsyncThunk(
    "createUser",
    async (params) => {
        const response = await createUserService(params);
        return response.data;
    }
);
export const changeUserRoleAsync = createAsyncThunk(
    "changeUserRole",
    async (data) => {
        const response = await changeUserRoleService(data);
        return response.data;
    }
);
export const activeUserAsync = createAsyncThunk(
    "activeUser",
    async (data) => {
        const response = await activeUserService(data);
        return response.data;
    }
);


export const userSlice = createSlice({
    name: "listUsers",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getAllUserAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getAllUserAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.listUser = action.payload;
            }
        })
        .addCase(deleteUserAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(deleteUserAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(createUserAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(createUserAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(changeUserRoleAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(changeUserRoleAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(activeUserAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(activeUserAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
    },
});
export const selectUsers = (state) => state.listUsers;
export default userSlice.reducer;