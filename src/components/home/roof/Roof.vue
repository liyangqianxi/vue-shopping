<template>
    <!--定位 -->
    <div>
        <div id="roof">
            <div id="site" @click="go">
                <div>{{city? city:'定位中'}}</div>
                <div class="roof-box">
                    <van-icon name="arrow-down" size="20px" />
                </div>
            </div>
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
            newcity: "",
        }
    },
    components: {},
    methods: {
        getLocation () {
            let that = this
            AMap.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })

                geolocation.getCurrentPosition()
                AMap.event.addListener(geolocation, 'complete', onComplete)
                AMap.event.addListener(geolocation, 'error', onError)

                function onComplete (data) {
                    // data是具体的定位信息
                    // console.log(data);
                    that.newcity = data.addressComponent.city
                    that.$store.commit("setCity", that.newcity)//修改共享数据
                    localStorage.setItem('position1', that.newcity)//将修改的数据保存到本地
                }

                function onError (data) {
                    // 定位出错
                    console.log(data)

                }
            })
        },
        // 跳转到选择城市
        go () {
            this.$router.push("/orientation")

        }
    },
    mounted () {
        // 如果没有值
        if (!this.city) {
            this.getLocation()
        }
    },
    computed: {
        city () {
            return this.$store.state.city; //获取共享数据
        },
    },
    watch: {}
}
</script>

<style lang='scss' scoped>
#roof {
    #site {
        width: 70px;
        height: 34px;
        padding: 10px;
        text-align: center;
        line-height: 34px;
        font-size: 15px;
        display: flex;
    }
}

.roof-box {
    margin: 5px 0;
}
</style>
