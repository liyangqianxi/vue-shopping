<template>
    <div id="app">
        <div>
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
        <div>
            <tabbar></tabbar>
        </div>
    </div>
</template>
<script>
import Tabbar from '../../components/tabbar/Tabbar.vue'
export default {
    name: '',
    props: {},
    data () {
        return {}
    },
    components: { Tabbar },
    methods: {},
    mounted () { },
    computed: {

    },
    watch: {}
}
</script>

<style lang='scss' scoped>

</style>
