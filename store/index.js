/**
 * Set State
 */
export const state = () => ({});

/**
 * Set Mutations
 */
export const mutations = {};

/**
 * Set Actions
 * @type {{logout(*): void, nuxtServerInit(*, *), RegisterUser(*, *): Promise<*>}}
 */
export const actions = {
  async nuxtServerInit({ commit }, { req }) {},
  /**
   * Register User Function
   * @param vuexContext
   * @param registerData
   * @returns {Promise<*>}
   * @constructor
   */
  RegisterUser(vuexContext, registerData) {
    this.$axios
      .post(process.env.apiBaseUrl + "users/register", registerData, {
        json: true,
        withCredentials: false,
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, Content-Type, X-Auth-Token, Authorization",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Credentials": true,
          "Content-Type":
            "multipart/form-data; boundary=" + registerData._boundary
        }
      })
      .then(response => {
        return response.data;
      });
  }
};

export const getters = {};
