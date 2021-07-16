<template>
    <!-- 购买或加入购物车弹框 -->
    <div id="son">
        <van-popup v-model="show" closeable close-icon="close" position="bottom" :style="{ height: '40%' }">
            <div class="logo">
                <img :src="arr[0].image" alt />
            </div>
            <div class="title">{{arr[0].name}}</div>
            <div class="price">￥{{arr[0].present_price}}</div>
            <div class="buy">
                <div>
                    <div>购买数量：</div>
                    <div class="buy1">
                        <span style="color:gray ;">剩余 1000件</span>
                        <span style="margin-left:20px ;color: red;">每人限购50件</span>
                    </div>
                </div>
                <div class="buy2">
                    <van-stepper v-model="value" min="1" max="50" />
                </div>
            </div>
            <div>
                <div v-if="purchase===true">
                    <van-button type="danger" block @click="promptly">立即购买</van-button>
                </div>
                <div v-if="join===true">
                    <van-button type="danger" block @click="accession">加入购物车</van-button>
                </div>
            </div>
        </van-popup>

        <div class="btn">
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
                <van-goods-action-icon icon="cart-o" text="购物车" :badge="get" />
                <van-goods-action-button type="warning" text="加入购物车" @click="vehicle" />
                <van-goods-action-button type="danger" text="立即购买" @click="showPopup" />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {
        arr: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            obj: [],
            show: false,
            // 购买数量
            value: 1,
            // 购买或者加入购物车
            purchase: false,
            join: false,
            count: 1,
        }
    },
    components: {},
    methods: {
        // 立即购买按钮显示
        showPopup () {
            this.$utils.checkLogin({
                key: 'nickname',
                next: this.checkshowPopup,
                item: 1
            })
        },
        checkshowPopup () {
            this.purchase = true
            this.show = true
        },
        // 加入购物车按钮显示
        vehicle () {
            this.$utils.checkLogin({
                key: 'nickname',
                next: this.checkvehicle,
                item: 1
            })
        },
        checkvehicle () {
            this.join = true
            this.show = true
        },
        //立即买跳转
        promptly () {
            localStorage.removeItem("location")
            // this.obj.push(this.arr)
            // console.log(this.obj, "obj");
            this.$router.push({
                path: "/immediately",
                query: {
                    obj: JSON.stringify(this.arr),
                    count: this.count,
                    idDirect: 1
                }
            })
        },
        //加入到购物车
        accession () {
            console.log(this.arr[0].id);
            this.$api.addShop(this.arr[0].id).then(res => {
                if (res.code === 200) {
                    Toast.success('加入成功');
                    this.$api.getCard().then(res => {
                        // console.log(res);
                        localStorage.setItem('badge', res.shopList.length)
                        this.$store.commit('setBadge', res.shopList.length)
                    }).catch(err => {
                        console.log(err);
                    })
                    this.$router.back()
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }



    },
    mounted () {

        // console.log(this.obj, "22");

    },
    computed: {
        get () {
            if (localStorage.getItem("nickname")) {
                if (this.$store.state.badge == 0) {
                    return ""
                } else {
                    return this.$store.state.badge
                }
            }
        }
    },
    watch: {
        value (val) {
            this.count = val
            // this.$set(this.arr, "count", val);
            // // console.log(this.arr, "arr");
        }
    }
}
</script>

<style lang='scss' scoped>
.logo {
    width: 100px;
    height: 100px;
    position: relative;
    top: -20px;
    left: 20px;
    border: 1px solid #ddd;
    img {
        width: 100px;
    }
}
.title {
    width: 170px;
    white-space: nowrap; //强制不换行
    // over-flow: hidden; //超出的文字部分隐藏
    overflow: hidden;
    text-overflow: ellipsis; //超出部分省略号代替

    position: relative;
    top: -85px;
    left: 148px;
    font-size: 18px;
}
.price {
    position: relative;
    top: -75px;
    left: 148px;
    font-size: 18px;
    color: red;
}
.buy {
    border: 1px solid #ddd;
    padding: 10px;
    position: relative;
    top: -45px;
    display: flex;
    justify-content: space-between;
    .buy1 {
        margin-top: 10px;
    }
    .buy2 {
        margin: 10px;
    }
}
</style>
