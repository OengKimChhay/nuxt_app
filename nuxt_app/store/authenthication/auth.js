
export const state = () => ({
  allUsers: [],
  errors : [],
  error:'',
  errorsRegister : [],
  errorRegister:'',
  loading:false
})


export const mutations = {
  ALL_USERS(state,payload){
    state.allUsers = payload;
  },
  ERRORS(state,payload){
    state.errors = payload;
  },
  ERROR(state,payload){
    state.error = payload;
  },
  ERRORS_REGISTER(state,payload){
    state.errorsRegister = payload;
  },
  ERROR_REGISTER(state,payload){
    state.errorRegister = payload;
  },
  LOADING(state,payload){
    state.loading = payload;
  }
}


export const actions = {
  async login({commit},formData){
    commit("LOADING",true);
    try{

      const res = await this.$auth.loginWith('laravelJWT',{data:formData});
      commit("LOADING",false);
      // to set token after logged in
      this.$auth.strategy.token.set(res.data.result.token);

      // to set loggedIn = true so then we can use (this.$auth.loggedIn to check authorized)
      this.$auth.$storage.setUniversal('loggedIn', true);

      // to set user into this.$auth.user so we can get user logged infor global
      // setUser() get user info to use in this.$auth.user to display data the whole application.
      const token = this.$auth.strategy.token.get();
      const user = await this.$axios.get('http://localhost:8000/api/auth/get-user-logged-in',{data:token});
      this.$auth.setUser(user.data);

      this.$toast.success('Successfully authenticated!');
      this.$router.push({name:"users"});

    }catch(error){


      if(error.response.data.status === 400){

        commit("ERRORS",error.response.data.result.error);
        commit("ERROR",'');
        setTimeout(() => (commit("LOADING",false)), 1000);

      }else if(error.response.data.status === 401){

        commit("ERRORS",'');
        commit("ERROR",error.response.data.result.message);
        setTimeout(() => (commit("LOADING",false)), 1000);

      }
      this.$router.push({name:"login"});

    }
  },
  async register({commit},formData){
    commit("LOADING",true);
    try{
      await this.$axios.$post(`${process.env.BASE_URL}/api/register`,formData);
      commit("LOADING",false);
      this.$toast.success('Register successfully!');
      this.$router.push({name:"login"});

    }catch(error){

      if(error.response.data.status === 400){

        commit("ERRORS_REGISTER",error.response.data.result.error);
        commit("ERROR_REGISTER",'');
        setTimeout(() => (commit("LOADING",false)), 1000);

      }else if(error.response.data.status === 401){

        commit("ERRORS_REGISTER",'');
        commit("ERROR_REGISTER",error.response.data.result.message);
        setTimeout(() => (commit("LOADING",false)), 1000);

      }
      this.$router.push({name:"register"});

    }
  },
  async logout(){
    try{

      await this.$auth.logout();
      this.$router.push({name:"login"});
      this.$toast.success('Successfully logout!');

    }catch(error){

      console.log(error.response.data);

    }
  },
  async allUsersAction({commit}){
    commit("LOADING",true);
    try{
      const res = await this.$axios.$get(`${process.env.BASE_URL}/api/auth/get-users`);
      commit("LOADING",false);
      if(res.status === 200){
        commit("ALL_USERS",res.result.users);
      }else{
        commit("ALL_USERS",'');
      }
    }catch(error){
      commit("LOADING",false);
      commit("ERROR",error.response);
    }
  }
}


export const getters = {
  allUsersGetter(state){
    return state.allUsers;
  },
  errors(state){
    return state.errors;
  },
  error(state){
    return state.error;
  },
  errorsRegister(state){
    return state.errorsRegister;
  },
  errorRegister(state){
    return state.errorRegister;
  },
  loading(state){
    return state.loading;
  }
}
