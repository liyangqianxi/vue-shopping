<template>
    <div>
        <div style="height: 54px; width: 100%;"></div>
        <div id="grabble">
            <roof></roof>
            <div id="seek">
                <van-search v-model.trim="value" show-action placeholder="请输入搜索关键词" ref="box" background="rgb(242, 242, 242)" @focus="focus" @blur="saveSearch">
                    <template #action>
                        <div>
                            <div v-if="display===false" @click="close">取消</div>
                            <div v-else>搜索</div>
                        </div>
                    </template>
                </van-search>
            </div>
        </div>
        <div v-if="display===false">
            <history :merchandise="merchandise" :price="price"></history>
        </div>
        <div v-if="display===true">
            <van-pull-refresh id="box" v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
                <carousel :list="list"></carousel>
                <subclassification :arr="arr" :text="text"></subclassification>
                <smooth :recommend="recommend"></smooth>
                <commodity v-if="floor1" :floor1="floor1" :floorName1="floorName1">
                    <template #floor>
                        <div class="lc">1F</div>
                    </template>
                </commodity>
                <commodity v-if="floor1" :floor1="floor2" :floorName1="floorName2">
                    <template #floor>
                        <div class="lc">2F</div>
                    </template>
                </commodity>
                <commodity v-if="floor1" :floor1="floor3" :floorName1="floorName3">
                    <template #floor>
                        <div class="lc">3F</div>
                    </template>
                </commodity>
                <sell v-if="hotGoods" :hotGoods="hotGoods"></sell>
            </van-pull-refresh>
            <div style="height: 50px;"></div>
        </div>
    </div>
</template>

<script>
import Roof from '../components/home/roof/Roof.vue'
import { Toast } from 'vant';
import Carousel from '../components/home/carousel/Carousel.vue';
import Subclassification from '../components/home/subclassification/Subclassification.vue';
import Smooth from '../components/home/smooth/Smooth.vue';
import Commodity from '../components/home/commodity/Commodity.vue';
import Sell from '../components/home/sell/Sell.vue';
import History from '../components/home/history/History.vue';


export default {
    name: '',
    props: {},
    data () {
        return {
            isLoading: false,
            // 轮播
            list: [],
            // 分类
            arr: [],
            //广告
            text: "",
            // 丝滑
            recommend: [],
            // 以下都是楼层数据
            floorName1: "",
            floorName2: "",
            floorName3: "",
            floor1: null,
            floor2: null,
            floor3: null,
            //热销
            hotGoods: [],
            // 搜索的值
            value: '',
            // 显示与隐藏
            display: true,
            // 搜索的商品
            merchandise: [],
            // 搜索值
            price: "",
            // 搜索历史记录
            records: [],
            obj1: [],
            // obj2: nul
        }
    },
    components: {
        Roof,
        Carousel,
        Subclassification,
        Smooth,
        Commodity,
        Sell,
        History,
    },
    methods: {
        onRefresh () {
            setTimeout(() => {
                Toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 1000);
        },
        getData () {
            this.$api.recommend().then(res => {
                // console.log(res);
                if (res.code === 200) {
                    // 轮播
                    res.data.slides.map(item => {
                        this.list.push(item.image)
                    })
                    // 分类
                    this.arr = res.data.category
                    // 广告
                    let a = res.data.advertesPicture
                    this.text = Object.values(a)
                    // 丝滑
                    this.recommend = res.data.recommend
                    // 以下都是楼层数据
                    this.floor1 = res.data.floor1
                    this.floor2 = res.data.floor2
                    this.floor3 = res.data.floor3
                    this.floorName1 = res.data.floorName.floor1
                    this.floorName2 = res.data.floorName.floor2
                    this.floorName3 = res.data.floorName.floor3
                    // console.log(this.floorName1, this.floorName2, this.floorName3);
                    // 热销
                    this.hotGoods = res.data.hotGoods
                    // 分类路由存储数据
                    localStorage.setItem("obj", JSON.stringify(res.data.category))

                }

            }).catch(err => {
                console.log(err);
            })
        },
        //取消
        close () {
            this.display = true
            this.value = ""

        },
        focus () {
            this.display = false
        },
        saveSearch () {
            this.$utils.saveHistory({
                key: 'search',
                data: this.price,
                attr: 'name'
            })
        }


    },
    mounted () {
        this.getData()
    },
    computed: {},
    watch: {
        value (val) {
            if (val !== "") {
                // 搜索商品
                this.$api.search(this.value).then(res => {
                    if (res.data.list.length > 0) {
                        this.merchandise = res.data.list
                        this.price = val
                    } else {
                        Toast('搜索失败');
                    }
                }).catch(err => {
                    console.log(err);
                })

            }
            if (val === "") {
                this.merchandise = []
            }
        }
    }
}
</script>

<style lang='scss' scoped>
#box {
    width: 100%;
    background: rgb(242, 242, 242);
}
.lc {
    width: 20px;
    height: 20px;
    background: red;
    color: white;
    border-radius: 100%;
}
#grabble {
    background: rgb(242, 242, 242);
    display: flex;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
}
</style>
