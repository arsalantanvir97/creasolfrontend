export const stateConstants = {
  isLoading: false,
  isSuccess: false,
  message: "",
  error: "",
};


let API_PATH2=''
// if (window.location.hostname == "localhost") {
//   API_PATH2 = "https://localhost:4001";
 
// } else {
  API_PATH2 = "https://creasoldigital.com:4001";
 
// }

 
export const API_PATH = API_PATH2

export const toastConstant = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const STRIPE_PK =
  "pk_test_51MPtXPItbk5K5BY48SdqRcO2pO9iyolrFmdxt3P17oJiSzIFLoXsBOSTaWnyrphXBs3NvzTcmY7RNlbV814fYdNE00MbzQbNco";
