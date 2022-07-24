
export const state = () => ({
  actualWeather : [],
  loading:false
})

export const mutations = {
  WEATHER(state,payload){
    state.actualWeather = payload;
  },
  LOADING(state,payload){
    state.loading = payload;
  }
}

export const actions = {
  async getWeather({commit},contry){
    commit("LOADING",true);
    // /weather/ is an proxy:{} name in nuxt.config.js file
    const res = await this.$axios.$get(`/weather/data/2.5/weather?q=${contry}&appid=${process.env.WEATHER_APP_ID}`);
    if(res){
      setTimeout(function(){ commit("LOADING",false); }, 2000);
      commit("WEATHER",res);
    }
  }
}

export const getters = {
  weather(state){
    return state.actualWeather;
  },
  getLoading(state){
    return state.loading;
  }
}
