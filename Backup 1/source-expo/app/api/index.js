import network from '@services/network';

const endPoints = {
  login: 'index.php/wp-json/jwt-auth/v1/token',
  valid: 'index.php/wp-json/jwt-auth/v1/token/validate',
  signUp: 'index.php/wp-json/listar/v1/auth/register',
  userInfo: 'index.php/wp-json/listar/v1/auth/user',
  updateProfile: 'index.php/wp-json/wp/v2/users/me',
  changePassword: 'index.php/wp-json/wp/v2/users/me',
  wishList: 'index.php/wp-json/listar/v1/wishlist/list',
  resetWishList: 'index.php/wp-json/listar/v1/wishlist/reset',
  deleteWishList: 'index.php/wp-json/listar/v1/wishlist/remove',
  getHome: 'index.php/wp-json/listar/v1/home/init',
  productDetail: 'index.php/wp-json/listar/v1/place/view',
  getReview: 'index.php/wp-json/listar/v1/comments',
  saveReview: 'index.php/wp-json/wp/v2/comments',
  getCategory: 'index.php/wp-json/listar/v1/category/list',
  getList: 'index.php/wp-json/listar/v1/place/list',
  saveWishList: 'index.php/wp-json/listar/v1/wishlist/save',
  setting: 'index.php/wp-json/listar/v1/setting/init',
  area: 'index.php/wp-json/listar/v1/location/list',
};

export const fetchLogin = params => {
  return network.post(endPoints.login, {params});
};

export const fetchValid = params => {
  return network.post(endPoints.valid, {params});
};

export const getSetting = params => {
  return network.get(endPoints.setting, {params});
};

export const signUp = params => {
  return network.post(endPoints.signUp, {params});
};

export const updateProfile = params => {
  return network.post(endPoints.updateProfile, {params});
};

export const getUserInfo = params => {
  return network.get(endPoints.userInfo, {params});
};

export const changePassword = params => {
  return network.post(endPoints.changePassword, {params});
};

export const getWishList = params => {
  return network.get(endPoints.wishList, {params});
};

export const resetWishList = params => {
  return network.post(endPoints.resetWishList, {params});
};

export const deleteWishList = params => {
  return network.post(endPoints.deleteWishList, {params});
};

export const getHome = params => {
  return network.get(endPoints.getHome, {params});
};

export const getProductDetail = params => {
  return network.get(endPoints.productDetail, {params});
};

export const saveWishList = params => {
  return network.post(endPoints.saveWishList, {params});
};

export const getReview = params => {
  return network.get(endPoints.getReview, {params});
};

export const saveReview = params => {
  return network.post(endPoints.saveReview, {params});
};

export const getCategory = params => {
  return network.get(endPoints.getCategory, {params});
};

export const getListProduct = params => {
  return network.get(endPoints.getList, {params});
};

export const getListArea = params => {
  return network.get(endPoints.area, {params});
};
