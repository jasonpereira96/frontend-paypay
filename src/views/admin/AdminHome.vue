<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <b-button @click="createEmployee">
                    + Create Employee
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-table striped hover :items="employees" :fields="fields" :busy="loading">
                <template #cell(view)="row">
                    <b-button size="sm" @click="viewEmployee(row)" class="mr-2">
                        View
                    </b-button>
                </template>
                 <template #cell(delete)="row">
                    <b-button size="sm" @click="deleteEmployee(row)" class="mr-2" :disabled="deleting">
                        Delete
                    </b-button>
                </template>
                <template #table-busy>
                    <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                    </div>
                </template>
            </b-table>                
        </b-row>
    </b-container>
</template>
<script>
import { getEmployees, deleteEmployee } from '@/apis'
import { showToast } from '@/utils'

export default {
    data() {
        return {
            employees: [],
            loading: false,
            deleting: false,
            fields: ['first_name', 'last_name', 'email', 'view', 'delete'],
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                let apiResponse = await getEmployees()
                this.employees = apiResponse.data.filter(employee => !employee.deleted)
                this.loading = false
            } catch(e) {
                console.log(e)
            }
        },
        createEmployee() {
            this.$router.push({
                name: 'AddEmployee'
            })
        },
        viewPerformanceReviews() {
            this.$router.push({
                name: 'PerformanceReviews'
            })
        },
        async deleteEmployee(row) {
            let id = row.item.id
            this.deleting = true
            try {
                await deleteEmployee(id)
                showToast('Employee Deleted', this)
                this.deleting = false
                this.loadData()
            } catch(e) {
                console.log(e)
            }
        },
        viewEmployee(row) {
            this.$router.push({
                name: 'ViewEmployee',
                params: {
                    id: row.item.id
                }
            })
        }
    }
}
</script>