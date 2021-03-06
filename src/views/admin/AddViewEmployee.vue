<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h1> {{ title }} </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                    v-model="employee.email"
                    id="input-1"
                    type="email"
                    placeholder="Enter email"
                    required
                    ></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="employee.first_name"
                    placeholder="Enter First Name"
                    required
                    ></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-form-group id="input-group-2" label="Last Name:" label-for="input-3">
                    <b-form-input
                    id="input-3"
                    v-model="employee.last_name"
                    placeholder="Enter Last Name"
                    required
                    ></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-form-group id="input-group-2" label="Reviewers:" label-for="input-4">
                    <multiselect  
                    :options="employees"
                    track-by="id"
                    v-model="employee.reviewers"
                    :searchable="true"
                    :multiple="true"
                    :custom-label="customLabel"
                    ></multiselect>
                </b-form-group>
            </b-col>
        </b-row>
         <b-row>
            <b-col cols="12">
                <b-button @click="onSave" :disabled="submitting">
                    <b-spinner v-if="submitting"/>
                    <template v-else>Save</template>
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {  getEmployees, patchEmployee, postEmployee } from '@/apis'
import { createLoader, showToast } from '@/utils'
import EmailValidator from 'email-validator';

function generatePreselectedOptions(ids, employees) {
    let employeesMap = employees.reduce((acc, employee) => {
        acc[employee.id] = employee
        return acc
    }, {})
    return ids.map(id => employeesMap[id])
}

export default {
    data() {
        return {
            employees: [],
            submitting: false,
            loading: false,
            employee: {
                first_name: '',
                last_name: '',
                email: '',
                reviewers: []
            }
        }
    },
    computed: {
        isViewMode() {
            return !!this.$route.meta.isViewMode
        },
        title() {
            return this.isViewMode ? 'View Employee' : 'Add Employee'
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        customLabel ({ first_name, last_name }) {
            return `${first_name} ${last_name}`
        },
        isValid() {
            let { email, first_name, last_name, reviewers } = this.employee
            const isEmailValid = EmailValidator.validate(email)
            if (!isEmailValid) {
                alert('Email invalid')
                return false
            }
            const isValid = first_name.length > 0 && last_name.length > 0 && reviewers.length > 0
            if (!isValid) {
                alert('Fill in all fields')
                return false
            }
            return true
        },
        async loadData() {
            let loader = createLoader(this)
            const employeeId = parseInt(this.$route.params.id)
            try {
                let apiResponse = await getEmployees()
                this.employees = apiResponse.data.filter(employee => !employee.deleted)
                console.log(this.employees)
                if (this.isViewMode) {
                    this.employee = this.employees.find(employee => employee.id === employeeId)
                    this.employee.reviewers = generatePreselectedOptions(this.employee.reviewers, this.employees)
                }
                loader.hide()
            } catch(e) {
                console.log(e)
            } 
        },
        async onSave() {
            let payload = {
                ...this.employee
            }
            if (!this.isValid()) {
                return
            }
            this.submitting = true
            payload.reviewers = payload.reviewers.map(employee => employee.id)
            if (this.$route.meta.isViewMode) {
                await patchEmployee(this.employee.id, payload)
                showToast('Saved', this)
            } else {
                await postEmployee(payload)
                this.$router.push({
                    name: 'AdminHome'
                })
            }
            this.submitting = false
        }
    }
}
</script>