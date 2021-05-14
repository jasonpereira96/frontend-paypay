<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <b-button @click="createEmployee">
                    Create Employee
                </b-button>
                <b-button @click="viewPerformanceReviews">
                    Performance Reviews
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
            </b-table>                
        </b-row>
    </b-container>
</template>
<script>
import { getEmployees } from '@/apis'
export default {
    data() {
        return {
            employees: [],
            loading: false,
            fields: ['first_name', 'last_name', 'email', 'view'],
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
                this.employees = apiResponse.data
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