import { getAddress } from '../../services/apiGeocoding';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

function getPosition() {
  // gets the long and lat
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// params: (action type name, payload creator thunk function:
// fetching data from an API and returns a result. This result will be dispatched as the payload of the fulfilled action (middle nigga)
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // this will produce 3 additional action types: that we should handle, pending state, fulfilled, rejected

    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in

    return { position, address }; //payload of the FULFILLED state
  }
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

// redux setup  step 1
// redux toolkit stuff, first create a slice that will contain the:
const userSlice = createSlice({
  name: 'user', //name of the slice
  initialState, // initial state
  reducers: {
    // reducers that can directly mutates the states
    updateName(state, action) {
      state.username = action.payload;
    },
  },

  // connecting the thunk actions to the slice, handling the fetch address return
  // we needa chain this stuff
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = 'There was a problem getting your address';
      }),
});

// exporting the stuff so that other components can use it
export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state) => state.user.username;
