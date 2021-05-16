<template>
    <b-container>
        <b-row>
            <h1> Pending Reviews </h1>
        </b-row>
        <b-row>
            <b-table striped hover :items="pendingSubmissions" :fields="fields" :busy="loading"
            empty-text="No reviews to submit" show-empty>
                <template #cell(view)="row">
                    <b-button size="sm" @click="submitReview(row)" class="">
                        Submit
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
import { getEmployees, getReviews, getReviewSubmissions } from '@/apis'
import { getName } from '@/utils'
export default {
    data() {
        return {
            loading: true,
            pendingSubmissions: [],
            fields: [{
                key: 'title', label: 'Title'
            }, {
                key: 'employeeName', label: 'Employee to Review'
            }, 'view']
        }
    }, 
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                let apiResponses = await Promise.all([getEmployees(), getReviews(), getReviewSubmissions()])
                this.employees = apiResponses[0].data.filter(employee => !employee.deleted)
                this.reviews = apiResponses[1].data
                this.submissions = apiResponses[2].data

                let loggedInEmployee = this.$store.state.auth.employee
                this.submissions = this.submissions.filter(submission => submission.reviewer === loggedInEmployee.id)

                let myReviewees = this.employees.filter(employee => employee.reviewers.includes(loggedInEmployee.id))

                let allSubmissions = []

                for (let review of this.reviews) {
                    for (let reviewee of myReviewees) {
                        allSubmissions.push({
                            performance_review: review.id,
                            title: review.title,
                            employee: reviewee.id,
                            employeeName: getName(reviewee)
                        })
                    }
                }
                let pendingSubmissions = allSubmissions.filter(submission => {
                    const alreadySubmitted = this.submissions.some(_submission => {
                        return submission.employee === _submission.employee && 
                        submission.performance_review === _submission.performance_review
                    })
                    return !alreadySubmitted
                })
                this.pendingSubmissions = pendingSubmissions

            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        submitReview(row) {
            let reviewId = row.item.performance_review
            let revieweeId = row.item.employee
            this.$router.push({
               name: 'SubmitReview',
               params: {
                   reviewId, revieweeId
               }
            })
        }
    }
}
</script>