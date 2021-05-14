<template>
    <b-container>
        <b-row>
            Pending Reviews
        </b-row>
        <b-row>
            <b-table striped hover :items="pendingReviews">
            </b-table>                
        </b-row>
    </b-container>
</template>
<script>
    export default {
        data() {
            return {
                pendingReviews: [
                    { name: 'Jason', id: 1 },
                    { name: 'Jason2', id: 2 },
                ]
            }
        }
    }
</script>