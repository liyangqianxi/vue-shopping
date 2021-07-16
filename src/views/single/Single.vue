<template>
    <!-- 单个商品详情 -->
    <div>
        <!-- 返回按键 -->
        <div class="back" @click="goto">
            <van-icon name="arrow-left" size="16" color="white" />
        </div>
        <!-- 单个详情轮播 -->
        <div class="carousel">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index" @click="Change">
                    <img v-lazy="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="ckg" v-if="images.length>0">
            <van-image-preview v-model="show" :images="images" @change="onChange">
                <!-- <img :src="images[0]" />
                <img :src="images[1]" />
                第{{index}}页-->
                <template v-slot:index>第{{index+1}}页</template>
            </van-image-preview>
        </div>
        <!-- 价格 -->
        <div class="money">
            <div class="title">{{list.name}}</div>
            <div class="cont-price">
                <span class="price">￥{{list.present_price}}</span>
            </div>
        </div>
        <div class="operate">
            <div class="btn">运费：0</div>
            <div class="btn">剩余：1000</div>
            <div class="btn" @click="collect">
                <div v-if="like===true">
                    收藏：
                    <van-icon name="like-o" />
                </div>
                <div v-if="like===false">
                    取消收藏：
                    <van-icon name="like" color="red" />
                </div>
            </div>
        </div>
        <div class="operate1">
            <div style="display: flex;">
                <van-icon name="shop-o" size="20px" />有赞的店
                <div style="margin-left:10px ;">
                    <van-tag type="danger">官方</van-tag>
                </div>
            </div>

            <div class="store">
                进入店铺
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="tab">
            <van-tabs type="card">
                <van-tab title="商品详情">
                    <div style="font-size:0" v-html="list.detail"></div>
                </van-tab>
                <van-tab title="商品评论">
                    <div v-if="review.length>0">
                        <remark :review="review"></remark>
                    </div>

                    <div class="without" v-if="review.length===0">暂无评论~~</div>
                </van-tab>
            </van-tabs>
        </div>
        <son v-if="arr.length>0" :arr="arr"></son>
        <div style="height: 50px;"></div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';
import { Lazyload } from 'vant';
import Son from '../../components/single/Son';
import Remark from '../../components/single/Remark';


Vue.use(Lazyload);
export default {
    name: '',
    props: {},
    data () {
        return {
            //查看单个图片
            show: false,
            index: 0,
            like: true,
            images: [],
            id: "",
            list: [],
            // 判断当前是否收藏
            isCollection: -1,
            arr: [],
            // 评论
            review: []

        }
    },
    components: {
        Son,
        Remark
    },

    methods: {
        // 查看单个图片
        onChange (index) {
            this.index = index;
        },
        Change () {
            this.show = true
        },

        //收藏按钮判断登录状态
        collect () {
            this.$utils.checkLogin({
                key: 'nickname',
                next: this.checkcollect,
                item: this.isCollection
            })

        },
        //收藏
        checkcollect (val) {
            // console.log(this.goods);
            if (val === 0) {
                this.$api.collection(this.list).then(res => {
                    console.log(res);
                    this.like = false
                    Toast('收藏成功');
                }).catch(err => {
                    console.log(err);
                })
            } else {
                this.$api.cancelCollection(this.id).then(res => {
                    console.log(res);
                    this.like = true
                    Toast('取消收藏');
                }).catch(err => { console.log(err); })
            }
            this.getIsCollection()
        },
        getData () {
            //获取到id发请求
            this.$api.goods(this.id).then(res => {
                if (res.code === 200) {
                    console.log(res, "zy");
                    // this.goods = res.goods
                    // console.log(this.goods);
                    this.list = res.goods.goodsOne
                    this.arr.push(this.list)
                    this.review = res.goods.comment
                    console.log(this.review, "111");
                    // 轮播图
                    this.images.push(this.list.image)
                    this.images.push(this.list.image_path)
                    // console.log(this.images);
                    this.History()

                }
            }).catch(err => {
                console.log(err);
            })

        },
        History () {
            this.$utils.saveHistory({
                user: localStorage.getItem('nickname'),
                key: 'list',
                data: this.list,
                attr: 'id',
            })
        },


        // 返回
        goto () {
            this.$router.back()
        },
        // 进去页面当前商品是否收藏
        getIsCollection () {
            this.$api.isCollection(this.id).then(res => {

                this.isCollection = res.isCollection
                // console.log(this.isCollection);
                if (this.isCollection === 0) {
                    this.like = true
                } else {
                    this.like = false
                }

            }).catch(err => {
                console.log(err);
            })
        },
    },
    mounted () {
        // 获取传递过来的id
        this.id = this.$route.query.id
        // console.log(this.id);
        this.getData()

        if (localStorage.getItem("nickname")) {
            // 判断当前是否收藏
            this.getIsCollection()
        } else {
            this.isCollection = 0
        }


    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.without {
    height: 300px;
    text-align: center;
    line-height: 250px;
}
.back {
    width: 30px;
    height: 30px;
    background: gray;
    border-radius: 100%;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.operate {
    display: flex;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0 20px 0;
    font-size: 17px;
    color: gray;
    .btn {
        width: 33.3%;
    }
}
.operate1 {
    display: flex;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0 20px 0;
    font-size: 17px;
    justify-content: space-between;
}
// 轮播
.carousel img {
    width: 100%;
    height: 300px;
}
// 钱和标题
.money {
    padding: 10px;
    border-top: 1px solid #ddd;
    .title {
        font-size: 22px;
    }

    .price {
        color: red;
        margin-top: 5px;
        font-size: 19px;
    }
}
</style>
