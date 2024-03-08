import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

axios.defaults.baseURL =process.env.React_App_BASE_URL

const getData=createAction("getData");
const getSearchData=createAsyncThunk("searchData/getSearchData",async(params)=>{

    const {skip,limit}=params
    
    const category=params.params || params.category
  

    return  await axios.get(`/api/v1/products?searchData=${category}&skip=${skip}&limit=${limit}`).then(res=>{
        
        return res.data

    })
})

const getSingleProductData=createAsyncThunk("searchData/getSingleProductData",async(id)=>{
    return await axios.get(`/api/v1/product?prdID=${id}`).then(res=>{
           
       

        return res.data.data
    })
})

// const getLoadingData=createAsyncThunk("searchData",async(type,)=>{

// })


const searchDataSlice=createSlice({
    name:"searchData",
    initialState:{
        data:[],
        error:null,
         Loading:true,
       singleData:null,
       searchData:null,
       skip:0
    },
    reducers:{
        getClean(state){
            state.data=[];
state.skip=0
        },
        setSkip(state,{payload}){
            state.skip=payload
        },
        setLoading(state){
            state.Loading=true;
        }

    },


    extraReducers:(builder)=>{
        builder.addCase(getSearchData.pending,(state)=>{
            state.Loading=true;
        })

 
         builder.addCase(getSearchData.fulfilled,(state,{payload})=>{
            let {data,skip}=payload;
                state.Loading=false;

                if(data.length!=0){
                   
                    state.data=[...state.data,...data];
                  
                    state.skip=state.skip + skip;
                    console.log(state.data);
                }
                
            })
            
            builder.addCase(getSingleProductData.pending,(state)=>{
                state.Loading=true;
            })
    
     
             builder.addCase(getSingleProductData.fulfilled,(state,{payload})=>{
    
                    state.Loading=false;
                    state.singleData=payload;
                })

             builder.addCase(getData,(state,{payload})=>{
                state.searchData=payload
                console.log(`getdata =${state.searchData}`)
             })   
},

})

export const{getClean,setSkip,setLoading}=searchDataSlice.actions

export default searchDataSlice.reducer
export {getSearchData}
export{getSingleProductData}
export{ getData}