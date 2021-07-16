<template>
    <div>
        <div v-if="like===true">
            <div class="searchHistory">
                <div>搜索历史</div>
                <div>
                    <van-icon name="delete-o" size="30px" @click="eliminate" />
                </div>
            </div>
            <div v-for="(item,index) in list" :key="index">{{item.name}}</div>
        </div>
        <div class="result" v-for="(item,index) in merchandise" :key="index" v-html="item.name.replace(price,`<span style='color:#eb3323'>${price}</span>`)" @click="goto(item.id)">{{item.name}}</div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        merchandise: {
            type: Array,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            list: null,
            like: false
        }
    },
    components: {},
    methods: {
        goto (val) {
            // console.log(val);
            this.$router.push({
                user: localStorage.getItem("nickname"),
                path: '/single',
                query: {
                    id: val
                }
            })
        },
        eliminate () {
            localStorage.removeItem("searchHistory")
            this.like = false
        }
    },
    mounted () {
        let history = localStorage.getItem("searchHistory");
        if (history !== undefined) {
            this.list = JSON.parse(localStorage.getItem("searchHistory"))
            this.like = true

        } else {
            this.like = false
        }


    },
    computed: {},
    watch: {
    }
}
</script>

<style lang='scss' scoped>
.result {
    margin: 20px 0;
    font-size: 16px;
    padding: 10px;
}
.searchHistory {
    padding: 10px;
    display: flex;
    justify-content: space-between;
}
</style>
