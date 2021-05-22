import { Appointment } from '@prisma/client';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import config from 'config';
import { parseIds } from 'store/utils';
import { useDispatch } from 'react-redux';

const SERVER_API_ENDPOINT = config.get('SERVER_API_ENDPOING', '/api');

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const parsedResponse = await response.json();
  return parsedResponse;
}

async function deleteData(url = '', id) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
  });
  const parsedResponse = await response.json();
  return parsedResponse;
}

export const postAppointment = createAsyncThunk(
  'postAppointment',
  async (bodyData: Record<string, any>) => {
    postData(`${SERVER_API_ENDPOINT}/appointments`, bodyData);
  },
);

export const deleteAppointment = createAsyncThunk(
  'deleteAppointment',
  async (deletedID: number) => {
    deleteData(`${SERVER_API_ENDPOINT}/appointments`, deletedID);
  },
);

const appointmentsAdapter = createEntityAdapter<Appointment>({});

export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export default appointmentsSlice;
