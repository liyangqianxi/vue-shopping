<template>
    <!-- 头部标题栏 -->
    <div class="app">
        <slot name="top"></slot>
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
.app {
    font-size: 18px;
    height: 41px;
    line-height: 41px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid #ddd;
    background: white;
    position: fixed;
    top: 0;
    background: white;
    z-index: 99;
}
</style>
