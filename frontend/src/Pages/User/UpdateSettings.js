/* eslint-disable */
import axios from 'axios';

// type is either 'password' or 'data'
export const updateSettings = async (data, type, user) => {
  // export const updateData = async (name, email) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3001/api/v1/users/updateMyPassword'
        : 'http://localhost:3001/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });

    if (res.data.status === 'success') {
      console.log('success', `${type.toUpperCase()} updated successfully!`);
      console.log('RESPONSE', res);
      return res;
    }
  } catch (err) {
    console.log('error', err.response.data.message);
  }
};
