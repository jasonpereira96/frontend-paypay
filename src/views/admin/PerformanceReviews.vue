<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h1> {{ title }} </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-button>Create New Performance Review</b-button>
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
                        </b-table>
                    </b-tab>
                    <b-tab title="Submissions">
                        <b-table responsive striped hover
                        :items="submissions" :fields="submissionFields">
                            <template #cell(view)="row">
                                <b-button size="sm" @click="viewSubmission(row)" class="">
                                    View
                                </b-button>
                            </template>
                        </b-table>
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {  getReviews, getReviewSubmissions } from '@/apis'

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
            submissions: [],

        }
    },
    computed: {
        title() {
            return 'Performance Reviews'
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                let apiResponses = await Promise.all([getReviews(), getReviewSubmissions()])
                let reviews = apiResponses[0].data
                let submissions = apiResponses[1].data
                this.reviews = reviews
                this.submissions = submissions.map(submission => {
                    let { employee, reviewer } = submission
                    return {
                        title: submission.performance_review.title,
                        reviewer: `${reviewer.first_name} ${reviewer.last_name}`,
                        reviewee: `${employee.first_name} ${employee.last_name}`
                    }
                })
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
        }
    }
}
</script>