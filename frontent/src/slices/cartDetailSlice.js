import { createSlice } from "@reduxjs/toolkit";

const cartDetail= createSlice({
    name:'cartDetail',
    initialState:{
        data:{}
      
    },
    reducers:{
        savecart(state,action){
           console.log(action.payload)
            const {price,image,title,category,rating,description,_id}=action.payload
            state.data={              
                title,
                price,
                description,
                category,
                image,
                rating,
                prdId:_id            
            }

            // console.log(`data is${JSON.stringify(action.payload)}`)
            return state
        }
    }
})

export default cartDetail.reducer;
export const {savecart}=cartDetail.actions;