<template>
    <!-- 分类 -->
    <div>
        <div id="classify">商品分类</div>
        <div id="broadside">
            <van-sidebar v-model="activeKey" class="box">
                <van-sidebar-item v-for="(val,key) in arr" :key="key" :title="val.mallCategoryName" @click="print(key)" />
            </van-sidebar>
        </div>

        <div id="label">
            <van-tabs v-model="active" animated @click="onclick" :ellipsis="false">
                <van-tab v-for="(item,index) in sign" :key="index" :title="item.mallSubName">
                    <div v-for="(val,key) in obj" :key="key" class="commodity" @click="goto(val.id)">
                        <div class="logo">
                            <img :src="val.image" alt />
                        </div>
                        <div class="text">
                            <div style="color: red;">{{val.name}}</div>
                            <div style="display: flex; margin: 10px 0;">
                                <div style="color: red;">￥{{val.present_price}}</div>
                                <div style="text-decoration: line-through ;margin-left:10px ;">￥{{val.orl_price}}</div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 55px;"></div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: '',
    props: {},
    data () {
        return {
            activeKey: 0,
            active: 0,
            arr: [],
            sign: [],
            id: "",
            obj: "",
            sub: '',

        }
    },
    components: {},
    methods: {
        // 二级标题
        print (key) {
            this.sign = this.arr[key].bxMallSubDto
            // console.log(this.sign);
            // 内容
            this.id = this.sign[this.active].mallSubId
            this.$api.classification(this.id).then(res => {
                // console.log(res.dataList);
                if (res.code === 200) {
                    this.obj = res.dataList
                }
            }).catch(err => {
                console.log(err);
            })
            // console.log(this.activeKey);

        },
        // 内容
        onclick (index) {
            // console.log(index);
            this.id = this.sign[index].mallSubId
            // console.log(this.id);
            // 发请求
            this.$api.classification(this.id).then(res => {
                // console.log(res.dataList);
                if (res.code === 200) {
                    this.obj = res.dataList
                }
            }).catch(err => {
                console.log(err);
            })
        },
        // 跳转到详情页
        goto (val) {
            // console.log(val);
            this.$router.push({
                path: '/single',
                query: {
                    id: val
                }
            })
        },
    },
    mounted () {
        if (this.$route.query.key) {
            this.activeKey = this.$route.query.key
        }
        this.arr = JSON.parse(localStorage.getItem('obj'))
        this.sign = this.arr[this.activeKey].bxMallSubDto
        // console.log(this.arr);
        this.id = this.sign[0].mallSubId
        this.$api.classification(this.id).then(res => {
            // console.log(res.dataList);
            if (res.code === 200) {
                this.obj = res.dataList
                // console.log(this.obj);
            }
        }).catch(err => {
            console.log(err);
        })
        // 判断是不是从首页进来的
        // this.sub = this.$route.query.key

        // this.arr.map(item => {
        //     if (item.mallCategoryId === this.sub) {
        //         this.sign = item.bxMallSubDto
        //         return
        //     }
        // })



    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
#classify {
    width: 100%;
    height: 40px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    line-height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    background: white;
    z-index: 10;
}
.box {
    position: fixed;
    top: 10.6vw;
    bottom: 0;
    background: rgb(241, 248, 255);
    border: 1px solid #ddd;
}
.commodity {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    display: flex;
}
.logo img {
    width: 90px;
    border: 1px solid #ddd;
}
.text {
    font-size: 15px;
    padding: 10px;
}
</style>
