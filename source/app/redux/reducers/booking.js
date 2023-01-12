import {actionTypes} from '@actions';

const initialState = {
  data: null,
  pagination: {},
  sortOptions: [],
  statusOptions: [],
  request: {
    data: null,
    pagination: {},
    sortOptions: [],
    statusOptions: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_BOOKING_LIST:
      return {
        ...state,
        data: action.data,
        pagination: action.pagination,
        sortOptions: action.sortOptions,
        statusOptions: action.statusOptions,
      };

    case actionTypes.SAVE_BOOKING_REQUEST_LIST:
      return {
        ...state,
        request: {
          data: action.data,
          pagination: action.pagination,
          sortOptions: action.sortOptions,
          statusOptions: action.statusOptions,
        },
      };

    case actionTypes.RESET_BOOKING_LIST:
      return initialState;

    default:
      return state;
  }
};
