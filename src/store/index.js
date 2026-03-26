import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from './doctor'
import userSlice from './user'
import authSlice from './auth'

const sepsis = configureStore({
    reducer:{
        doctor: doctorSlice,
        user: userSlice,
        auth: authSlice
    }
})

export default sepsis;