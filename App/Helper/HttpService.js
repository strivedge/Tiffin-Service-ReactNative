// Constants

// const BASE_URL = 'https://wm.testdevurl.com/api/';
// const IMAGE_URL = 'https://wm.testdevurl.com/';

//
const BASE_URL = 'https://appadmin.whattameal.com/public/api/';
const IMAGE_URL = 'https://appadmin.whattameal.com/public/';

// const BASE_URL = 'http://192.168.1.59:8001/api/';
// const IMAGE_URL = 'http://192.168.1.59:8001/';

export const GET_TRACTION_URL = 'https://api.razorpay.com/v1/payments';

export const PAYMENT_CREDENTIAL = {
  username: 'rzp_test_9M9aEfAL8AOJAgdsdsd',
  password: 'jD8gGk3VbZ63YLn1yRsz0Ar8dsd',
};

export const razorpayKey = 'rzp_test_9M9aEfAL8AOJAghehrh';

export const Endpoint = {
  // Auth
  get_token: 'get-token',
  login: 'user_login',
  get_schools: 'get_schools',
  resend_otp: 'user_otp_resend',
  verify_otp: 'user_otp_verification',
  forget_pass: 'user_forgot_password',
  reset_pass: 'user_reset_password',
  register: 'user_registration',
  user_profile: 'user_profile',
  update_profile: 'user_profile_update',
  image_upload: 'user_image_upload',
  create_student: 'create_student',
  update_student_profile: 'update_student_profile',
  delete_student: 'delete_student',
  create_payment: 'create_payment',
  get_payment_history: 'get_payment_history',
  cancel_meal: 'cancel_meal',
  user_account_delete: 'user_account_delete',
  user_update_password: 'user_update_password',
  delete_cart_item: 'delete_cart_item',
  // NON Auth
  dashboard_banner: 'dashboard_banner',
  get_meal_types: 'get_meal_types',
  get_food_menu: 'get_food_menu',
  get_students: 'get_students',
  create_subscription: 'create_subscription',
  get_cart_item: 'get_cart_item',
  get_student_subscription_orders: 'get_student_subscription_orders',
  get_subscriptions_list: 'get_subscriptions_list',
  change_biodegradable_status: 'change_biodegradable_status',
  get_birthday_party_setting: 'get_birthday_party_setting',
  create_birthday_party_order: 'create_birthday_party_order',
  update_feedback: 'update_feedback',
  //DELEVERY
  get_deliver_boy_dashboard: 'get_deliver_boy_dashboard',
  get_delivery_orders: 'get_delivery_orders',
  update_order_status: 'update_order_status',
  get_order_details: 'get-order-detail',
};

export const API = {
  BASE_URL: BASE_URL,
  IMAGE_URL: IMAGE_URL,
};
