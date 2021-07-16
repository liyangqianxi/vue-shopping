<template>
    <div>
        <div class="text">热销商品</div>
        <div class="commodity">
            <div class="box" v-for="(val,key) in hotGoods" :key="key" @click="details(val)">
                <div>
                    <img :src="val.image" alt />
                </div>
                <div class="name">{{val.name}}</div>
                <div class="money">
                    <div class="cont-dest">￥{{ val.mallPrice }}</div>
                    <div class="cont-price">
                        <span class="price">￥{{ val.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        hotGoods: {
            type: Array,
            required: true,
        }
    },
    data () {
        return {
        }
    },
    components: {},
    methods: {
        // 单个商品详情传递参数
        details (val) {
            this.$router.push({
                path: '/single',
                query: {
                    id: val.goodsId
                }
            })
            // console.log(val.goodsId);
        }
    },
    mounted () {
        // console.log(this.hotGoods);
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.commodity {
    display: flex;
    flex-wrap: wrap;
}
.text {
    margin: 20px auto;
    color: red;
    width: 70px;
    font-size: 15px;
}
.box {
    width: 185px;
    height: 235px;
    border: 1px solid #ddd;
    background: white;
}
.box img {
    width: 185px;
}
.name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 185px;
}
.money {
    width: 76.5px;
    display: flex;
    margin: 0 auto;
}
.cont-price {
    color: red;
    text-decoration: line-through;
}
</style>
