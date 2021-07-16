<template>
    <!-- 完成订单 -->
    <div>
        <div class="details">
            <div class="indent" v-for="(item,index) in list" :key="index">
                <div class="serial">
                    <div>订单编号{{item.order_id}}</div>
                    <div style="color: red;">交易完成</div>
                </div>
                <van-card v-for="(val,key) in item.order_list" :key="key" :num="val.count" :price="val.present_price" :title="val.name" :thumb="val.image_path" />
                <div class="money">
                    <div>创建时间：{{item.add_time}}</div>
                    <div>收货地址：{{item.address}}</div>
                    <div>共计{{item.order_list.length}}件商品 合计:{{item.mallPrice}}</div>
                </div>
            </div>
            <!-- <div>
                <div class="indent" v-for="(item,index) in list" :key="index">
                    <div class="serial">
                        <div>订单编号{{item.order_id}}</div>
                        <div style="color: red;">交易完成</div>
                    </div>
                </div>
                <div v-for="(val,key) in obj" :key="key">
                    <van-card :num="val.count" :price="val.present_price" :title="val.name" :thumb="val.image_path" />
                </div>
                <div class="money" v-for="(item,index) in list" :key="index">
                    <div>创建时间：{{item.add_time}}</div>
                    <div>收货地址：{{item.address}}</div>
                    <div>共计{{item.order_list[0].count}}件商品 合计:{{item.mallPrice}}</div>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
            list: [],
            obj: []
        }
    },
    components: {},
    methods: {
        getMy () {
            this.$api.getMyOrder().then(res => {
                // console.log(res);
                if (res.code === 200) {
                    let a = res.list
                    a.map(item => {
                        // console.log(JSON.stringify(item.order_list[0]));
                        if (JSON.stringify(item.order_list[0]) !== undefined) {
                            this.list.push(item)
                            this.obj.push(item.order_list)
                        }
                    })
                }
                // console.log(this.list);
                // console.log(this.obj);
                // this.list.map(item => {
                //     console.log(item.order_list[0].name);
                // })
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted () {
        // 查询用户订单
        this.getMy()
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.details {
    padding: 20px 0;
    background: rgb(242, 242, 242);
    .money {
        text-align: right;
        font-size: 15px;
        div {
            margin: 10px 0;
        }
    }
}
.indent {
    width: 90%;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: white;
    .serial {
        font-size: 15px;
        display: flex;
        justify-content: space-between;
    }
}
</style>
