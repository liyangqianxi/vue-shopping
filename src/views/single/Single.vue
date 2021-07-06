<template>
    <div></div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
        }
    },
    components: {},
    methods: {},
    mounted () {
        this.$api.goods(id).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>
