
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
    await this.$axios.$get(`https://api.openweathermap.org/data/2.5/weather?q=${contry}&appid=${process.env.WEATHER_APP_ID}`)
    .then((res)=>{
      setTimeout(function(){ commit("LOADING",false); }, 2000);
      commit("WEATHER",res);
    });
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
