<template>
    <!-- 收藏 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto('/mine')">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">收藏</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <!-- <div>
            <van-swipe-cell class="enshrine" v-for="(item,index) in obj" :key="index" :before-close="beforeClose">
                <van-card :price="`${item.present_price}.00`" :title="item.name" class="goods-card" :thumb="item.image_path" />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>-->
        <div v-if="obj.length>0">
            <van-swipe-cell :right-width="110" v-for="(item,index) in obj" :key="index" class="enshrine">
                <div class="box" slot="default" @click="buy(item.cid)">
                    <img :src="item.image_path" alt />
                    <div class="text">
                        <div class="toe1">{{item.name}}</div>
                        <span class="toe2">{{`￥${item.present_price}`}}</span>
                    </div>
                </div>
                <div class="delete-button" slot="right">
                    <van-button type="danger" block @click="Close(item,index)">删除</van-button>
                </div>
            </van-swipe-cell>
        </div>
        <div v-else>
            <van-empty description="暂无收藏" />
            <div class="btn">
                <van-button type="danger" block @click="goto('/')">去逛逛</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Dialog, Toast } from 'vant';
Vue.use(Dialog, Toast);
export default {
    name: '',
    props: {},
    data () {
        return {
            obj: []
        }
    },
    components: {},
    methods: {
        // 返回
        goto (val) {
            this.$router.push(val)
        },
        // 收藏
        getCollection () {
            this.$api.getCollection().then(res => {
                if (res.code === 200) {
                    this.obj = res.data.list
                }
                // console.log(this.obj);
            }).catch(err => {
                console.log(err);
            })
        },
        // 删除
        // beforeClose ({ position, instance }, item, index) {
        //     switch (position) {
        //         case 'left':
        //         case 'cell':
        //         case 'outside':
        //             instance.close();
        //             break;
        //         case 'right':
        //             Dialog.confirm({
        //                 message: '确定删除吗？',
        //             }).then(() => {
        //                 console.log('111');
        //                 console.log(this.obj[index]);
        //                 setTimeout(() => {
        //                     // this.list.splice(index, 1);//从列表删除该数据
        //                     console.log(this.obj[index]);
        //                 }, 2000)
        //             }).catch(() => {
        //                 Toast('您取消了操作');
        //             });
        //             break;
        //     }
        // },

        Close (item, index) {
            Dialog.confirm({
                message: '确定删除吗？',
            }).then(() => {
                // console.log('111');
                // console.log(this.obj[index]._id);
                this.$api.cancelCollection(this.obj[index].cid).then(res => {
                    // console.log(res);
                    if (res.code === 200) {
                        Toast.success('删除成功');
                        this.getCollection()
                    }
                }).catch(err => {
                    console.log(err);
                })

                // setTimeout(() => {
                //     // this.list.splice(index, 1);//从列表删除该数据
                //     console.log(this.obj[index]);
                // }, 2000)
            }).catch(() => {
                Toast('您取消了操作');
            });
        },
        buy (val) {
            // console.log(val);
            this.$router.push({
                path: '/single',
                query: {
                    id: val
                }
            })
        }


    },
    mounted () {
        this.getCollection()
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}
.default {
    img {
        width: 100px;
    }
}
.btn {
    width: 375px;
    position: fixed;
    bottom: 0;
}
</style>
