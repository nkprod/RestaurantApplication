import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer FBLsvHKdTZggYjEE75lnYtdcJHd5H7D6v3gbKFA3jugN5xg3SgFlau4_utBhRSS8u0dYXE1e9wfyKo_HqgjW66zSzq2nq5-R-9RYyrQ04bJg-lvjY2967QkMGe9TX3Yx",
  },
});
