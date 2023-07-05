import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { createPolicyService, deletePolicyService, getAllPolicyService, updatePolicyService } from "../Services/policyService";

const initialState= {
    isLoading: false,
    listPolicy: [],
};
export const getAllPolicyAsync = createAsyncThunk(
    "getAllPolicy",
    async (pages) => {
        const response = await getAllPolicyService(pages);
        return response.data;
    }
);
export const deletePolicyAsync = createAsyncThunk(
    "deletePolicy",
    async (id) => {
        const response = await deletePolicyService(id);
        return response.data;
    }
);
export const createPolicyAsync = createAsyncThunk(
    "createPolicy",
    async (params) => {
        const response = await createPolicyService(params);
        return response.data;
    }
);
export const updatePolicyAsync = createAsyncThunk(
    "updatePolicy",
    async (params) => {
        const response = await updatePolicyService(params.id,params);
        return response.data;
    }
);


export const policySlice = createSlice({
    name: "listPolicy",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getAllPolicyAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getAllPolicyAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.listDriver = action.payload;
            }
        })
        .addCase(deletePolicyAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(deletePolicyAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(createPolicyAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(createPolicyAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(updatePolicyAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(updatePolicyAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
    },
});
export const selectPolicy = (state) => state.listPolicy;
export default policySlice.reducer;