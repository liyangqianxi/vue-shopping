<template>
    <!-- 首页分类 -->
    <div>
        <div id="subclassification">
            <div v-for="(val,key) in arr" :key="key">
                <img class="classification" :src="val.image" alt />
                <div>{{val.mallCategoryName}}</div>
            </div>
        </div>
        <img class="advertising" :src="text" alt />
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        arr: {
            type: Array,
            required: true
        },
        text: {
            required: true
        }
    },
    data () {
        return {
        }
    },
    components: {},
    methods: {},
    mounted () {
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
#subclassification {
    width: 90%;
    display: flex;
    background: white;
    padding: 10px;
    margin: 10px auto;
    border-radius: 10px;
    font-size: 15px;
}
.classification {
    width: 60px;
    margin: 0 4px;
}
.advertising {
    width: 345px;
    margin: 10px;
}
</style>
