<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <div>
                    <b-form-group
                        id="fieldset-1"
                        description="Email"
                        label="Email"
                        label-for="input-1"
                        >
                        <b-form-input id="input-1" v-model="email" trim></b-form-input>
                    </b-form-group>
                </div>
                <div>
                    <b-form-group
                        id="fieldset-2"
                        description="Password"
                        label="Password"
                        label-for="input-2"
                        >
                        <b-form-input id="input-2" v-model="password" trim type="password"></b-form-input>
                    </b-form-group>
                </div>
                <div>
                    <b-button @click="login">Login</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { login } from '@/apis'
import store from '@/store'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                let apiResponse = await login({
                    email: this.email,
                    password: this.password
                })
                store.commit('login', apiResponse.data)
                if (apiResponse.data.isAdmin) {
                    this.$router.push({
                        name: 'AdminHome'
                    })
                } else {
                    this.$router.push({
                        name: 'EmployeeHome'
                    })
                }
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>>
