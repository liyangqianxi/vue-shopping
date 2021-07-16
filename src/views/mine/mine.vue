<template>
    <div>
        <div class="vip">会员中心</div>
        <div class="middle">
            <div class="setting">
                <van-icon name="setting" class="setting1" @click="options('/options')" />
            </div>

            <div v-if="name!=null">
                <div class="portrait">
                    <van-image round width="80px" height="80px" src="https://img01.yzcdn.cn/vant/cat.jpeg" cover />
                </div>
                <div class="wen">欢迎您: {{name}}</div>
                <div class="zi" @click="quit">退出登录</div>
            </div>
            <div v-else>
                <div class="portrait">
                    <van-icon size="85px" name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
                </div>
                <div class="zi" @click="ascend" style="margin-top:20px ;">登录/注册</div>
            </div>
        </div>
        <div class="icon">
            <div class="icon-one">
                <van-icon name="pending-payment" class="pending" />
                <div class="words">待付款</div>
            </div>
            <div class="icon-two">
                <van-icon name="tosend" class="pending" />
                <div class="words">待发货</div>
            </div>
            <div class="icon-three">
                <van-icon name="logistics" class="pending" />
                <div class="words">待收货</div>
            </div>
            <div class="icon-four" @click="options('/evaluate')">
                <van-icon name="orders-o" class="pending" />
                <div class="words">待评价</div>
            </div>
            <div class="icon-fife" @click="options('/complete')">
                <van-icon name="points" class="pending" />
                <div class="words">已完成</div>
            </div>
        </div>
        <div class="records">
            <div @click="options('/entire')" class="my">
                <div>
                    <van-icon name="records" size="20px" />
                    <span class="word">全部订单</span>
                </div>
                <div>
                    <van-icon name="arrow" size="20px" class="search-icon" />
                </div>
            </div>
        </div>
        <div @click="options('/enshrine')" class="my">
            <div>
                <van-icon name="star-o" size="20px" />
                <span class="word">收藏商品</span>
            </div>
            <div>
                <van-icon name="arrow" size="20px" class="search-icon" />
            </div>
        </div>

        <div @click="options('/site')" class="my">
            <div>
                <van-icon name="location-o" size="20px" />
                <span class="word">地址管理</span>
            </div>
            <div>
                <van-icon name="arrow" size="20px" class="search-icon" />
            </div>
        </div>
        <div @click="options('/browse')" class="my">
            <div>
                <van-icon name="eye-o" size="20px" />
                <span class="word">最近浏览</span>
            </div>
            <div>
                <van-icon name="arrow" size="20px" class="search-icon" />
            </div>
        </div>
    </div>
</template>

<script>
import { Notify } from 'vant';
export default {
    name: "",
    props: {},
    data () {
        return {
            name: null
        };
    },
    components: {},
    methods: {
        // 判断登录 执不执行下一步
        options (val) {
            this.$utils.checkLogin({
                key: 'nickname',
                next: this.checkoptions,
                item: val
            })

        },
        checkoptions (item) {
            this.$router.push(item)
        },
        // 退出登录
        quit () {
            this.$api.loginOut().then(res => {
                // console.log(res);
                localStorage.removeItem("nickname")
                Notify({ type: 'success', message: "退出成功" })
                // this.name = localStorage.getItem('nickname')
                window.location.reload(true)
            }).catch(err => {
                console.log(err);
            })

        },
        // 跳转登录
        ascend () {
            this.$router.push("/login")
        }
    },
    mounted () {
        //获取name名
        this.name = localStorage.getItem('nickname')
    },
    computed: {},
    watch: {},
};
</script>

<style lang='scss' scoped>
.vip {
    font-size: 18px;
    height: 41px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.middle {
    width: 100%;
    height: 200px;
    background-color: #e30c7b;
}
.icon {
    width: 100%;
    display: flex;
    margin-top: 15px;
}
.pending {
    font-size: 30px;
}
.words {
    font-size: 13px;
}
.icon-one {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
.icon-two {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
.icon-three {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
.icon-four {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
.icon-fife {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
}
.custom-title {
    margin-right: 4px;
    vertical-align: middle;
}

.search-icon {
    line-height: inherit;
    color: #cebdb7;
}
.records {
    margin-top: 15px;
}
.setting {
    width: 100%;
    height: 10px;
    font-size: 20px;
    color: #fff;
    text-align: right;
    padding-top: 15px;
    position: relative;
    left: -15px;
}

.wen {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-bottom: 10px;
}
.zi {
    color: #fff;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.portrait {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.my {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .word {
        left: 10px;
        position: relative;
        top: -4px;
    }
}
</style>
