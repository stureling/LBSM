<template>
    <div id="post-area">
        <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
        <pre class="mt-3 mb-0">{{ text }}</pre>
    </div>
</template>

<script>
export default {
    name: "post-area",
    data() {
        return {
            text: ''
        }
    },
}
</script>


<style>
#post-area {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: 0%;
}
</style>