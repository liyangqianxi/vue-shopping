<template>
    <!-- 定位选择 -->
    <div id="orientation">
        <div class="longin">
            <div class="box">
                <div class="icn" @click="goto">
                    <van-icon name="arrow-left" size="20px" />
                </div>
                <div class="text">城市列表</div>
            </div>
            <div style="padding: 5px;">
                <van-search v-model="value" placeholder="请输入搜索关键词" />
            </div>
            <div v-if="value ===''">
                <div class="cities">当前城市</div>

                <div class="hot" style="margin-left:15px ;" @click="Chengdu">{{present}}</div>
                <van-divider :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }" />

                <div class="cities">热门城市</div>
                <div class="city">
                    <div class="hot" v-for="item in list" :key="item" @click="hot(item)">{{item}}</div>
                </div>
                <van-divider :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }" />

                <van-index-bar :index-list="Object.keys(obj)" class="bar" highlight-color="red">
                    <template v-for="(val,key) in obj">
                        <van-index-anchor :index="key" :key="key" />
                        <van-cell :title="item.name" v-for="item in obj[key]" :key="item.id" @click="alter(item.name)" />
                    </template>
                </van-index-bar>
            </div>
            <div v-else>
                <div class="hot" v-for="item in arr" :key="item" @click="hot(item)">{{item}}</div>
                <div v-if="arr.length===0" class="absence">
                    <van-tag type="danger">没有该城市</van-tag>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import city from '../../lib/city'
export default {
    name: '',
    props: {},
    data () {
        return {
            value: "",
            // 当前城市
            present: "",
            // 热门
            list: [],
            // 首字母分类城市
            obj: [],
            // 搜索
            arr: []
        }
    },
    components: {
        city
    },
    methods: {
        // 返回上一级
        goto () {
            this.$router.back()
        },
        // 获取首字母城市
        alter (val) {
            this.$store.commit("setCity", val)//修改共享数据
            this.$router.push("/")
        },
        // 当前城市
        Chengdu () {
            this.$store.commit("setCity", this.present)
            this.$router.push("/")
        },
        // 热门城市
        hot (val) {

            this.$store.commit("setCity", val)//修改共享数据
            this.$router.push("/")
        }

    },
    mounted () {
        // 当前城市
        this.present = localStorage.getItem("position1")
        // 热门城市
        let arr = city.data.hotCities
        arr.map(item => {
            this.list.push(item.name)
        })

        // 首字母分类城市
        // console.log(city.data.cities);
        this.obj = city.data.cities
        // console.log(this.obj);
        // console.log(this.arr);
    },
    computed: {},
    watch: {
        value (val) {
            console.log(val);
            for (let i in this.obj) {
                this.obj[i].map(item => {
                    if (item.name.includes(val) === true || item.spell.includes(val) === true) {
                        this.arr.push(item.name)
                    }
                })
            }
            console.log(this.arr);
            if (val === "") {
                this.arr = []
            }
        }
    }
}
</script>

<style lang='scss' scoped>
#orientation {
    width: 94%;
    .box {
        display: flex;
        width: 100%;
        height: 30px;
        border: 1px solid gray;
        line-height: 30px;
        padding: 10px;
        .icn {
            width: 140px;
            margin-top: 5px;
        }
    }
}
.text {
    font-size: 20px;
    font-weight: bolder;
}
.cities {
    font-size: 20px;
    font-weight: bolder;
    margin: 10px 0;
}
.city {
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
}
.hot {
    width: 100px;
    padding: 5px;
    border: 1px solid #ddd;
    text-align: center;
    margin: 6px 0;
}
.box1 {
    .van-index-bar__index {
        line-height: 25px;
        color: rgba(12, 165, 236, 0.89);
    }
}
.absence {
    width: 80px;
    margin: 10px auto;
}
</style>
