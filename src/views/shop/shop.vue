<template>
    <!-- 购物车 -->
    <div>
        <Top>
            <template #top>
                <div class="set1">购物车</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div v-if="name===null">
            <div class="shop">
                <img src="../../assets/order.gif" alt />
            </div>
            <div class="text">未登录</div>
            <div class="stroll">
                <van-button round type="danger" class="bottom-button" block @click="goto('/login')">登录</van-button>
            </div>
        </div>
        <div v-else>
            <div v-if="shopList.length>0">
                <div id="vehicle">
                    <div id="refer">
                        <div>
                            {{condition}}
                            <input type="checkbox" v-model="checked" @change="all" />
                        </div>
                        <div class="number">
                            <div>
                                合计：
                                <span style="color: red;">￥{{num}}</span>
                            </div>
                            <div>请确认订单</div>
                        </div>
                    </div>
                    <div style="height: 55px;">
                        <div class="btn">
                            <van-button @click="omit" style="margin-right:10px ;" color="rgb(230,5,127)">删除</van-button>
                            <van-button @click="accounts" color="rgb(230,5,127)">去结算</van-button>
                        </div>
                    </div>
                </div>
                <div class="trade" v-for="(item,index) in shopList" :key="index">
                    <van-checkbox v-model="item.check" @change="Choice(item)"></van-checkbox>
                    <img :src="item.image_path" alt />
                    <div class="information">
                        <div>{{item.name}}</div>
                        <div class="box">
                            <div style="color: red;">￥{{item.present_price}}</div>
                            <div>
                                <van-stepper v-model="item.count" theme="round" button-size="22" disable-input />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <son></son>
            </div>
        </div>
        <div style="height: 40px;"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import Son from '../../components/shop/Son';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data () {
        return {
            // 全选
            checked: false,
            condition: "全选",
            shopList: [],
            id: [],
            name: []
        }
    },
    components: { Son },
    methods: {
        // 返回
        goto (val) {
            this.$router.push(val)
        },
        // 查询获取购物车数据
        getCard () {
            this.$api.getCard().then(res => {
                // console.log(res);
                if (res.code === 200) {
                    this.shopList = res.shopList
                }
                // console.log(this.shopList);
            }).catch(err => {
                console.log(err);
            })
        },
        // 去结算
        accounts () {
            this.getID()
            // console.log(this.shopList, "list");
            // console.log(this.id, "id");
            if (this.id.length > 0) {
                this.$router.push({
                    path: "/immediately",
                    query: {
                        obj: JSON.stringify(this.shopList),
                        idDirect: 0
                    }
                })
            } else {
                Toast('没有选中商品');
            }

        },
        //商品单选关联全选的状态
        Choice () {
            console.log();
            this.checked = this.shopList.every(item => {
                return item.check === true;
            });
        },
        all () {
            this.shopList.map(item => {
                item.check = this.checked;
            });
        },
        // 选中商品id
        getID () {
            this.shopList.map((item, index) => {
                if (item.check === true) {
                    this.id.push(item.cid)
                }
            });
        },
        // 删除
        omit () {
            this.getID()
            // console.log(this.id);
            if (this.id.length > 0) {
                this.$api.deleteShop(this.id).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        Toast.success('删除成功');
                        this.getCard()
                        this.id = []
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                Toast('没有选中商品');
            }

        }


    },
    mounted () {
        this.getCard()
        this.name = localStorage.getItem("nickname")
        // console.log(this.name);


    },
    computed: {
        num () {
            let num = 0;
            this.shopList.map((item, index) => {
                if (item.check === true) {
                    num += item.present_price * item.count;
                }
            });
            return Number(num.toFixed(2));
        }
    },
    watch: {
        // checked () {
        //     if (this.checked === false) {
        //         this.condition = "全选"
        //         this.shopList.map(item => {
        //             item.check = false
        //         })

        //     } else {
        //         this.condition = "取消全选"
        //         this.shopList.map(item => {
        //             item.check = true
        //         })

        //     }
        // },
    }
}
</script>

<style lang='scss' scoped>
.shop {
    img {
        width: 375px;
    }
}
.text {
    width: 65px;
    margin: 50px auto;
}
.stroll {
    width: 100%;
    position: fixed;
    bottom: 60px;
}
.set1 {
    position: relative;
    left: 45%;
}
#vehicle {
    #refer {
        margin-bottom: 10px;
        padding: 20px 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        .van-checkbox {
            margin-top: 10px;
        }
        .number {
            width: 150px;
        }
    }
    .btn {
        right: 10px;
        position: absolute;
    }
}
.trade {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px;
    display: flex;
    img {
        margin-left: 5px;
        width: 100px;
        border: 1px solid #ddd;
    }
    .information {
        width: 200px;
        padding: 10px;
        .box {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
