<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h1> {{ title }} </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-button @click="createReview">Create New Performance Review</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-tabs content-class="mt-3">
                    <b-tab title="Reviews" active>
                        <b-table responsive striped hover :busy="loading"
                        :items="reviews" :fields="reviewFields">
                            <template #cell(view)="row">
                                <b-button size="sm" @click="viewReview(row)" class="">
                                    View
                                </b-button>
                            </template>
                            <template #table-busy>
                                <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                                </div>
                            </template>                            
                        </b-table>
                    </b-tab>
                    <b-tab title="Submissions">
                        <b-table responsive striped hover
                        :items="submissionRows" :fields="submissionFields" :busy="loading">
                            <template #cell(view)="row">
                                <b-button size="sm" @click="viewSubmission(row)" class="">
                                    View
                                </b-button>
                            </template>
                            <template #table-busy>
                                <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                                </div>
                            </template>
                        </b-table>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
        <b-modal size="lg" v-model="submissionModal.visible" :title="submissionModal.title"
        >
            <b-table responsive striped hover 
                :items="submissionModal.reviewData" :fields="['question_text', 'answer']">
            </b-table>
        </b-modal>
    </b-container>
</template>
<script>
import {  getReviews, getEmployees, getReviewSubmissions } from '@/apis'
import {  getName } from '@/utils'

export default {
    data() {
        return {
            loading: false,
            reviewFields: ['title', 'view'],
            submissionFields: ['title', 'reviewer', 'reviewee', 'view'],
            reviews: [{
                title: 'Sample 1',
                id: 1
            }],
            submissionModal: {
                reviewData: [],
                title: '',
                reviewer: '',
                reviewee: '',
                visible: false
            },
            employees: [],
            submissions: [],

        }
    },
    computed: {
        title() {
            return 'Performance Reviews'
        },
        submissionRows() {
            return this.submissions.map(submission => {
                let reviewer = this.employees.find(employee => employee.id === submission.reviewer)
                let reviewee = this.employees.find(employee => employee.id === submission.employee)
                let review = this.reviews.find(review => review.id === submission.performance_review)
                
                return {
                    id: submission.id,
                    reviewer: getName(reviewer),
                    reviewee: getName(reviewee),
                    title: review.title, 
                    reviewData: JSON.parse(submission.review_data)
                }
            })
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                let apiResponses = await Promise.all([getReviews(), getReviewSubmissions(), getEmployees()])
                let reviews = apiResponses[0].data
                let submissions = apiResponses[1].data
                let employees = apiResponses[2].data
                this.employees = employees
                this.reviews = reviews
                this.submissions = submissions
                this.loading = false
            } catch(e) {
                console.log(e)
            }
        },
        viewReview(row) {
            this.$router.push({
                name: 'ViewPerformanceReview',
                params: {
                    id: row.item.id
                }
            })
        },
        viewSubmission(row) {
            let record = row.item
            this.submissionModal.title = record.title
            this.submissionModal.reviewData = record.reviewData
            this.submissionModal.visible = true
        },
        createReview() {
            this.$router.push({
                name: 'AddPerformanceReview',
            })
        }
    }
}
</script>