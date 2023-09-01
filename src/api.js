import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get user data by username. */
  static async getUserData(username){
    let res = await this.request(`users/${username}`)
    return res.user;
  }

  /** Login with username & password. */
  static async login(loginData){
    let res = await this.request(`auth/token`, loginData, "post")
    return res.token;
  }

  /** Register new user. */
  static async signUp(signUpData){
    let res = await this.request(`auth/register`, signUpData, "post")
    return res.token;
  }

  /** Edit user profile with form data. */
  static async editProfile(username, data){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    // console.log()
    return res.company;
  }

  /** Get array of jobs by title */
  static async getJobs(title) {
    let res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /** Get array of companies with optional nameLike filter */
  static async getCompanies(nameLike) {
    let res = await this.request(`companies`, { nameLike });
    return res.companies;
  }

}

export default JoblyApi;