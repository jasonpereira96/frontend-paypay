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
                <b-button @click="onSave">Save</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {  getEmployees, patchEmployee, postEmployee } from '@/apis'

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
        async loadData() {
            this.loading = true
            const employeeId = parseInt(this.$route.params.id)
            try {
                let apiResponse = await getEmployees()
                this.employees = apiResponse.data
                console.log(this.employees)
                if (this.isViewMode) {
                    this.employee = this.employees.find(employee => employee.id === employeeId)
                    this.employee.reviewers = generatePreselectedOptions(this.employee.reviewers, this.employees)
                }
                this.loading = false
            } catch(e) {
                console.log(e)
            }
        },
        onSave() {
            let payload = {
                ...this.employee
            }
            payload.reviewers = payload.reviewers.map(employee => employee.id)
            if (this.$route.meta.isViewMode) {
                patchEmployee(this.employee.id, payload)
            } else {
                postEmployee(payload)
            }
        }
    }
}
</script>