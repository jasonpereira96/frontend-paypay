<template>
    <b-container>
        <b-row>
            <b-col cols="12">
                <h1> {{ isViewMode ? 'View Performance Review' : 'Add Performance Review' }} </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="9">
                <b-form-input
                    v-model="title"
                    placeholder="Enter Title"
                    required
                ></b-form-input>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-form-group id="input-group-1">
                    <b-row v-for="(question, index) in questions" :key="index">
                        <b-col cols="9">
                            <b-form-input
                                v-model="questions[index].question_text"
                                placeholder="Enter Question"
                                required
                            ></b-form-input>
                        </b-col>
                        <b-col cols="3">
                            <b-button @click="onRemove(index)" v-show="questions.length > 1">Remove</b-button>
                        </b-col>
                    </b-row>
                </b-form-group>    
            </b-col>
        </b-row>
        
         <b-row>
            <b-col cols="12">
                <b-button @click="onSave">Save</b-button>
                <b-button @click="onAdd">Add</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { getReview, patchPerformanceReview, postPerformanceReview, deleteQuestion } from '@/apis'
import { showToast } from '@/utils';

export default {
    data() {
        return {
            employees: [],
            loading: false,
            title: 'Sample Review Title',
            questions: [],
            toDelete: []
        }
    },
    computed: {
        isViewMode() {
            return !!this.$route.meta.isViewMode
        },
        reviewId() {
            return parseInt(this.$route.params.id)
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        onAdd() {
            this.questions.push({
                question_text: 'Sample Question Text'
            })
        },
        onRemove(index) {
            let removedQuestion = this.questions.find((question, qIndex) => index === qIndex)
            this.toDelete.push(removedQuestion)
            this.questions = this.questions.filter((question, qIndex) => index !== qIndex)
        },
        async loadData() {
            this.loading = true
            try {
                if (this.isViewMode) {
                    const reviewId = parseInt(this.$route.params.id)
                    let apiResponse = await getReview(reviewId)
                    this.title = apiResponse.data.title
                    this.questions = apiResponse.data.questions
                } else {
                    this.onAdd()
                }
            } catch(e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async onSave() {
            let payload = {
                title: this.title,
                questions: this.questions
            }
            try {
                if (this.isViewMode) {
                    await patchPerformanceReview(this.reviewId, payload)
                    try {
                        await Promise.all(this.toDelete.map(question => {
                            return deleteQuestion(question.id)
                        }))
                        this.toDelete = []
                    } catch(e) {
                        console.log(e)
                    }
                } else {
                    await postPerformanceReview(payload)
                }
                showToast('Saved', this)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>