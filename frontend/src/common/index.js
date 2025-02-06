const backendDomin = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, "");

const SummaryApi = {
    signUP : {
        url : `${backendDomin}api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}api/signin`,
        method : "post"
    },
    submitReview: {
        url: `${backendDomin}api/submit-review`,
        method: "POST"
    },
    
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    orderDetails: {
        url: (orderId) => `${backendDomin}/api/order-details/${orderId}`,
        method: "get"
    },
    updateOrderStatus: {
        url: (orderId) => `${backendDomin}/api/update-order-status/${orderId}`,
        method: "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    
    getReviews:{
         url : `${backendDomin}/api/reviews`,
        method : 'get'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    saveShippingDetails: {
        url: `${backendDomin}/api/save-shipping`,
        method: "post",
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method  : 'post'
    },
    getOrder : {
        url : `${backendDomin}/api/order-list`,
        method : 'get'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    }
    
}


export default SummaryApi