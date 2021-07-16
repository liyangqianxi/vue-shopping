<template>
    <!-- 立即购买 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">订单结算</div>
            </template>
        </Top>
        <div style="height: 40px;"></div>

        <div>
            <div v-if="address===null" class="site1">
                <div style="margin-left:5px ;">暂无地址</div>
                <div style="margin-left:20px ;">
                    <van-icon name="arrow" size="20px" @click="leave" />
                </div>
            </div>
            <div v-else>
                <div class="site1">
                    <div>收货人：{{address.name}}</div>
                    <div style="margin-top: 5px;">{{address.tel}}</div>
                </div>
                <div class="site2" @click="leave">
                    <div>
                        <van-icon name="location-o" size="35px" />
                    </div>
                    <div style="margin-left:5px ;">收货地址：{{address.address}}</div>
                    <div style="margin-left:20px ;">
                        <van-icon name="arrow" size="20px" @click="leave" />
                    </div>
                </div>
            </div>
            <div class="logo">
                <img src="../../assets/caitiao.jpg" alt />
            </div>
        </div>
        <div class="merchandise" v-for="(item,index) in obj" :key="index">
            <div class="Photo">
                <img :src="item.image" alt />
            </div>
            <div class="specification">
                <div class="name">{{item.name}}</div>
                <div class="price">
                    <div>￥{{item.present_price}}</div>
                    <div class="amount">X{{item.count}}</div>
                </div>
            </div>
        </div>
        <van-submit-bar :price="num * 100" button-text="提交订单" @submit="onSubmit" />
    </div>
</template>

<script>
import Vue from 'vue';
import { SubmitBar, Toast } from 'vant';

Vue.use(SubmitBar, Toast);
export default {
    name: '',
    props: {},
    data () {
        return {
            obj: [],
            count: 1,
            // 默认地址
            address: [],
            // 用来判断是购物车结算还是直接购买
            idDirect: true,
            id: [],
            Direct: -1
        }
    },
    components: {},
    methods: {
        leave () {
            this.$router.push("/site")
        },
        // 返回上一步
        goto () {
            this.$router.back()
        },
        // 查询默认收货地址
        getDefault () {
            this.$api.getDefaultAddress().then(res => {
                // console.log(res);
                if (res.code === 200) {
                    this.address = res.defaultAdd
                    // console.log(this.address);
                }
                if (this.address === null) {
                    // localStorage.getItem("location")
                    this.address = JSON.parse(localStorage.getItem("location"))
                    // console.log();
                }
                if (JSON.parse(localStorage.getItem("location"))) {
                    this.address = JSON.parse(localStorage.getItem("location"))
                }
            }).catch(err => {
                console.log(err);
            })
        },

        // 提交订单
        onSubmit () {
            let buer = Boolean(Number(this.Direct))
            if (this.Direct == 1) {
                this.id.push(this.obj[0].id)
                // console.log(this.obj[0].id, "000");
                this.$api.placeOrder({
                    address: this.address.address,
                    tel: this.address.tel,
                    orderId: this.id,
                    totalPrice: this.num,
                    idDirect: buer,
                    count: this.count
                }).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        Toast.success('支付成功');
                        this.$router.push("/complete")
                    }
                    // this.$router.back()
                }).catch(err => {
                    console.log(err);
                })
            } else {
                this.$api.placeOrder({
                    address: this.address.address,
                    tel: this.address.tel,
                    orderId: this.id,
                    totalPrice: this.num,
                    idDirect: buer,
                    count: this.count
                }).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        Toast.success('支付成功');
                        let a = this.$store.state.badge
                        a = a - this.obj.length
                        localStorage.setItem('badge', a)
                        this.$store.commit('setBadge', a)
                        this.$router.push("/complete")
                    }
                    // this.$router.back()
                }).catch(err => {
                    console.log(err);
                })
            }
        },



    },
    mounted () {
        // 查询默认收货地址
        this.getDefault()


        this.Direct = this.$route.query.idDirect
        if (this.Direct == 1) {
            this.obj = JSON.parse(this.$route.query.obj)
            this.count = this.$route.query.count
            this.obj.map(item => {
                this.$set(item, "count", this.count);
            })
        } else {
            this.obj = JSON.parse(this.$route.query.obj)
            console.log(this.obj, "obj");
            this.obj.map(item => {
                this.$set(item, "image", item.image_path);
                this.id.push(item.cid)
            })

            // console.log(this.$route.query.obj, "传递");
        }

        // console.log(this.obj, "gouwu");
    },
    computed: {
        num () {
            let num = 0
            this.obj.map(item => {
                num += item.present_price * item.count
            })
            // console.log(num);
            return Number(num)
        }
    },
    watch: {}
}
</script>

<style lang='scss' scoped>
.site1 {
    width: 75%;
    margin: 10px auto;
    display: flex;
    font-size: 18px;
    justify-content: space-between;
}
.site2 {
    margin: 10px 0;
    display: flex;
    font-size: 14px;
    line-height: 38px;
    padding: 5px;
}
.logo {
    img {
        width: 375px;
    }
}
.merchandise {
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.Photo {
    width: 100px;
    border: 1px solid #ddd;
    img {
        width: 100px;
    }
}
.specification {
    color: red;
    font-size: 15px;
    margin-left: 10px;
    .name {
        margin-bottom: 20px;
    }
    .price {
        display: flex;
        justify-content: space-between;
        .amount {
            color: black;
        }
    }
}
</style>
