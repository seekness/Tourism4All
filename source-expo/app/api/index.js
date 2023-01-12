import http from './http';

const endPoints = {
  login: '/jwt-auth/v1/token',
  authValidate: '/jwt-auth/v1/token/validate',
  user: '/listar/v1/auth/user',
  register: '/listar/v1/auth/register',
  forgotPassword: '/listar/v1/auth/reset_password',
  changeProfile: '/wp/v2/users/me',
  setting: '/listar/v1/setting/init',
  submitSetting: '/listar/v1/place/form',
  home: '/listar/v1/home/init',
  categories: '/listar/v1/category/list',
  discovery: '/listar/v1/category/list_discover',
  withLists: '/listar/v1/wishlist/list',
  addWishList: '/listar/v1/wishlist/save',
  removeWishList: '/listar/v1/wishlist/remove',
  clearWithList: '/listar/v1/wishlist/reset',
  listing: '/listar/v1/place/list',
  deleteProduct: '/listar/v1/place/delete',
  authorList: '/listar/v1/author/listing',
  authorInfo: '/listar/v1/author/overview',
  authorReview: '/listar/v1/author/comments',
  tags: '/listar/v1/place/terms',
  comments: '/listar/v1/comments',
  saveComment: '/wp/v2/comments',
  product: '/listar/v1/place/view',
  saveProduct: '/listar/v1/place/save',
  locations: '/listar/v1/location/list',
  upload: '/wp/v2/media',
  bookingForm: '/listar/v1/booking/form',
  calcPrice: '/listar/v1/booking/cart',
  order: '/listar/v1/booking/order',
  bookingDetail: '/listar/v1/booking/view',
  bookingList: '/listar/v1/booking/list',
  bookingRequestList: '/listar/v1/author/booking',
  bookingCancel: '/listar/v1/booking/cancel_by_id',
  deactivate: '/listar/v1/auth/deactivate',
};

const getSetting = params => {
  return http.get(endPoints.setting, {params});
};

const getHome = params => {
  return http.get(endPoints.home, {params});
};

const getDiscovery = params => {
  return http.get(endPoints.discovery, {params});
};

const getCategory = params => {
  return http.get(endPoints.categories, {params});
};

const getLocation = params => {
  return http.get(endPoints.locations, {params});
};

const getWishList = params => {
  return http.get(endPoints.withLists, {params});
};

const addWishList = params => {
  return http.post(endPoints.addWishList, {params, loading: true});
};

const getListing = (params, loading) => {
  return http.get(endPoints.listing, {params, loading});
};

const clearWishList = params => {
  return http.post(endPoints.clearWithList, {params, loading: true});
};

const removeWishList = params => {
  return http.post(endPoints.removeWishList, {params, loading: true});
};

const login = params => {
  return http.post(endPoints.login, {params, loading: true});
};

const forgotPassword = params => {
  return http.post(endPoints.forgotPassword, {params, loading: true});
};

const register = params => {
  return http.post(endPoints.register, {params, loading: true});
};

const editProfile = params => {
  return http.post(endPoints.changeProfile, {
    params,
    headers: {'Content-Type': 'multipart/form-data'},
    loading: true,
  });
};

const getUser = params => {
  return http.get(endPoints.user, {params});
};

const getReview = params => {
  return http.get(endPoints.comments, {params});
};

const saveReview = params => {
  return http.post(endPoints.saveComment, {
    params,
    headers: {'Content-Type': 'multipart/form-data'},
    loading: true,
  });
};

const validateToken = params => {
  return http.post(endPoints.authValidate, {params});
};

const changePassword = params => {
  return http.post(endPoints.changeProfile, {params, loading: true});
};

const deactivateAccount = params => {
  return http.post(endPoints.deactivate, {params, loading: true});
};

const deleteProduct = params => {
  return http.post(endPoints.deleteProduct, {params, loading: true});
};

const getProduct = params => {
  return http.get(endPoints.product, {params});
};

const getAuthorList = (params, loading) => {
  return http.get(endPoints.authorList, {params, loading});
};

const getAuthorInfo = params => {
  return http.get(endPoints.authorInfo, {params});
};

const getAuthorReview = params => {
  return http.get(endPoints.authorReview, {params});
};

const getBookingList = (params, loading) => {
  return http.get(endPoints.bookingList, {params, loading});
};

const getRequestBookingList = (params, loading) => {
  return http.get(endPoints.bookingRequestList, {params, loading});
};

const getBookingDetail = params => {
  return http.get(endPoints.bookingDetail, {params});
};

const cancelBooking = params => {
  return http.post(endPoints.bookingCancel, {params, loading: true});
};

const bookingCalcPrice = params => {
  return http.post(endPoints.calcPrice, {params, loading: true});
};

const bookingOrder = params => {
  return http.post(endPoints.order, {params, loading: true});
};

const getBookingForm = params => {
  return http.get(endPoints.bookingForm, {params, loading: true});
};

const getSubmitSetting = params => {
  return http.get(endPoints.submitSetting, {params, loading: true});
};

const submitListing = params => {
  return http.post(endPoints.saveProduct, {
    params,
    headers: {'Content-Type': 'multipart/form-data'},
    loading: true,
  });
};

const getTags = params => {
  return http.get(endPoints.tags, {params});
};

const uploadMedia = (params, onProgress) => {
  return http.post(endPoints.upload, {
    params,
    headers: {'Content-Type': 'multipart/form-data'},
    onProgress,
  });
};

const downloadFile = (url, {params, onProgress}) => {
  return http.download(url, {params, onProgress});
};

export default {
  getSetting,
  getHome,
  getDiscovery,
  getWishList,
  clearWishList,
  removeWishList,
  getCategory,
  getLocation,
  login,
  forgotPassword,
  register,
  validateToken,
  editProfile,
  getUser,
  changePassword,
  getListing,
  getProduct,
  uploadMedia,
  downloadFile,
  addWishList,
  getReview,
  getAuthorList,
  getAuthorReview,
  saveReview,
  deleteProduct,
  deactivateAccount,
  getBookingList,
  getRequestBookingList,
  getBookingDetail,
  cancelBooking,
  getBookingForm,
  bookingCalcPrice,
  getAuthorInfo,
  bookingOrder,
  getSubmitSetting,
  submitListing,
  getTags,
};
