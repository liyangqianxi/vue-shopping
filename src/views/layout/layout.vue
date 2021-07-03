<template>
    <div id="app">
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home">标签</van-tabbar-item>
            <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
        </van-tabbar>
    </div>
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
    mounted () { },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>
