<template>
    <div>
        <roof></roof>
		
        <div>
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
            hotGoods: []

        }
    },
    components: {
        Roof,
        Carousel,
        Subclassification,
        Smooth,
        Commodity,
        Sell,
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
                console.log(res);
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

            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted () {
        this.getData()


    },
    computed: {},
    watch: {}
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
</style>
