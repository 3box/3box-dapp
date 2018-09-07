const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: {
    products,
  },
});

const fetchProductsError = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: {
    error,
  },
});

function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductsBegin());
    return fetch('/products')
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchProductsSuccess(json.products));
        return json.products;
      })
      .catch(error => dispatch(fetchProductsError(error)));
  };
}


export {
  fetchProducts,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  fetchProductsBegin,
  fetchProductsSuccess,
  fetchProductsError,
};