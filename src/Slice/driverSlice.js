import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createDriverService, deleteDriverService, getAllDriverService, searchLicensePlateService, updateDriverService } from "../Services/driverService"

const initialState= {
    isLoading: false,
    listDriver: {}
};
export const getAllDriverAsync = createAsyncThunk(
    "getAllDrivers",
    async (pages) => {
        const response = await getAllDriverService(pages);
        return response.data;
    }
);
export const deleteDriverAsync = createAsyncThunk(
    "deleteDriver",
    async (id) => {
        const response = await deleteDriverService(id);
        return response.data;
    }
);
export const createDriverAsync = createAsyncThunk(
    "createDriver",
    async (params) => {
        const response = await createDriverService(params);
        return response.data;
    }
);
export const updateDriverAsync = createAsyncThunk(
    "updateDriver",
    async (params) => {
        const response = await updateDriverService(params.id,params);
        return response.data;
    }
);
export const searchLicensePlateAsync = createAsyncThunk(
    "searchLicensePlate",
    async (params) => {
        const response = await searchLicensePlateService(params.id,params);
        return response.data;
    }
);


export const driverSlice = createSlice({
    name: "listDrivers",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getAllDriverAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getAllDriverAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.listDriver = action.payload;
            }
        })
        .addCase(deleteDriverAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(deleteDriverAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(createDriverAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(createDriverAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(updateDriverAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(updateDriverAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
        .addCase(searchLicensePlateAsync.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(searchLicensePlateAsync.fulfilled,(state, action) =>{
            if(action.payload){
                state.isLoading = false;
                state.list = action.payload;
            }
        })
    },
});
export const selectDrivers = (state) => state.listDrivers;
export default driverSlice.reducer;