import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../types/User";

interface UserState {
    Users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    Users: [],
    loading: false,
    error: null,
};

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.Users = action.payload;
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setUsers, setLoading, setError } = UserSlice.actions;

export default UserSlice.reducer;