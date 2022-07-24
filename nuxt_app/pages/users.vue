<template>
    <v-container>
      <v-layout  v-if="allUsersGetter" align-center justify-center>
        <v-flex xs12 sm7 md8>
          <v-card elevation="2" outlined shaped tile>
            <v-simple-table fixed-header height="500px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">N0_</th>
                    <th class="text-left">Name</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in allUsersGetter" :key="item.id">
                    <td>{{ item.id ?? ''}}</td>
                    <td>{{ item.name ?? '' | CAPITALIZE }}
                        <v-chip v-if="user ? user.result.user.id == item.id : false" class="ma-2"  color="green" text-color="white" >
                          <v-avatar left>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          It's you
                        </v-chip>
                    </td>
                    <td>{{ item.email ?? ''}}</td>
                    <td>{{ $dateFns.format(item.created_at) ?? ''}} </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>

import {mapActions,mapGetters} from 'vuex';
export default {
  name: 'UsersPage',
  layout: 'customLayout',
  middleware: ['customAuth'],
  head: {
    title: 'Users'
  },
  computed:{
    ...mapGetters('authenthication/auth',['allUsersGetter','error','loading']),
    user() {
      return this.$auth.user;
    }
  },
  mounted(){
    this.allUsersAction();
  },
  methods:{
    ...mapActions('authenthication/auth',['allUsersAction']),
  }
}
</script>
