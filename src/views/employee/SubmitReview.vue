<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h2>{{ title }}</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <h2>{{ `Employee to review: ${getName(employee)}` }}</h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <div v-for="(question, index) in questions" :key="index">
                    <b-form-group :label="question.question_text" >
                        <b-form-radio-group
                            :options="options"
                            v-model="selected[index]"
                        ></b-form-radio-group>
                    </b-form-group>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-button @click="onSubmit">Submit</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { getReview, getRatings, getEmployee, postSubmission } from '@/apis'
import { getName } from '@/utils'
export default {
    data() {
        return {
            title: '',
            selected: [0, 0, 0, 0],
            questions: [],
            employee: {
                first_name: ''
            },
            options: []
        }
    },
    computed: {
        reviewId() {
            return parseInt(this.$route.params.reviewId)
        },
        revieweeId() {
            return parseInt(this.$route.params.revieweeId)
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                let apiResponses = await Promise.all([
                    getReview(this.reviewId),
                    getRatings(),
                    getEmployee(this.revieweeId),
                ])
                let review = apiResponses[0].data
                let ratings = apiResponses[1].data
                this.questions = review.questions
                this.title = review.title
                this.options = ratings.map(rating => {
                    return {
                        value: rating.id,
                        text: rating.rating_text
                    }
                })
                this.employee = apiResponses[2].data
                this.selected = new Array(review.questions.length).fill(0)
            } catch(e) {
                console.log(e)
            }
        },
        getName,
        async onSubmit() {
            let employee_id = this.employee.id
            let reviewer_id = this.$store.state.auth.employee.id

            const idToText = this.options.reduce((acc, option) => {
                acc[option.value] = option.text
                return acc
            }, {})
            
            let records = this.questions.map((question, index) => {
                let selectedOptionId = this.selected[index]
                return {
                    question_text: question.question_text,
                    answer: idToText[selectedOptionId]
                }
            })

            const payload = {
                employee: employee_id, 
                reviewer: reviewer_id, 
                performance_review: this.reviewId,
                review_data: JSON.stringify(records),
            }
            try {
                let apiResponse = await postSubmission(payload)
                console.log(apiResponse)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>>
