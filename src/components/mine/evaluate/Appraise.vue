<template>
    <!-- 评论详情 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">评价详情</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div>
            <div style="display: flex; padding: 10px;">
                <div style="display: flex;width: 50%;">
                    <div style="margin: 10px 0;">
                        <van-image round width="50px" height="50px" class="round" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    </div>
                    <div>
                        <div style="margin: 10px 0;">{{name}}</div>
                        <van-rate v-model="evaluate.rate" disabled />
                    </div>
                </div>
                <div style="width: 50%;margin-top:20px ;margin-left:29px ; font-size:13px">{{evaluate.comment_time}}</div>
            </div>
            <div id="remark">评价内容：{{evaluate.content}}</div>
            <div style="display: flex;  margin: 20px 0;" v-if="evaluate.goods">
                <div class="commodity">
                    <img style="width: 60px;margin-right:10px ;" :src="evaluate.goods[0].image" alt />
                    <div>{{evaluate.goods[0].name}}</div>
                </div>
                <div class="join">
                    <div class="box" @click="accession">
                        <van-icon color="red" size="30px" name="shopping-cart-o" />
                    </div>
                </div>
            </div>

            <div style="padding:10px;">
                <van-button type="primary" size="large" @click="goto">返回</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data () {
        return {
            message: "",
            checked: false,
            evaluate: [],
            value: 0,
            name: "小白",
            obj: []
        }
    },
    components: {},
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },
        getevaluateOne () {
            this.$api.evaluateOne({
                id: this.obj.goods[0].id,
                _id: this.obj._id
            }).then(res => {
                console.log(res);
                this.evaluate = res.evaluateOne
                if (this.evaluate.anonymous === false) {
                    this.name = res.evaluateOne.user[0].nickname
                } else {
                    this.name = "小白"
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //加入到购物车
        accession () {
            this.$api.addShop(this.evaluate.goods[0].id).then(res => {
                if (res.code === 200) {
                    Toast.success('加入成功');
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted () {
        this.obj = JSON.parse(this.$route.query.comment)
        this.getevaluateOne()
        // console.log(this.obj);
        // console.log(this.obj.goods[0].id);
        // console.log(this.obj._id);
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.graph {
    width: 100px;
}
.round {
    margin-right: 10px;
}
.commodity {
    width: 265px;
    font-size: 16px;
    display: flex;
}
.join {
    width: 100px;
    // border: 1px solid red;
    // display: flex;
    position: relative;

    .box {
        border-radius: 100%;
        width: 50px;
        height: 50px;
        background: rgb(255, 230, 226);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 5px;
    }
}
#remark {
    margin: 10px 0;
}
</style>
