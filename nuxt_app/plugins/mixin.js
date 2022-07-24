import Vue from 'vue';

const myMixin =  {
  data(){
    return {
      test: 'mixin'
    }
  },
  filters: {
    UPPERCASE(value){
      if (!value) return '';
      return value.toUpperCase();
    },
    CAPITALIZE(value){
      if (!value) return '';
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}

Vue.mixin(myMixin);
