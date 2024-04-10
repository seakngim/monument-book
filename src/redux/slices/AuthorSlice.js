import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allAuthors: [],
    featureAuthor: []
    
    
}

export const AuthorSlices = createSlice({
name: "author",
initialState,
reducers:{
    setAllAuthor: (state, action)=>{
        state.allAuthors = action.payload
    },
    setfeatureAuthor: (state, action)=>{
        state.featureAuthor = action.payload
    }
 },
});
export const {setAllAuthor,setfeatureAuthor} = AuthorSlices.actions;
export default AuthorSlices.reducer;
