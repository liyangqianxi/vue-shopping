<template>
    <!-- 丝滑 -->
    <div class="recommand-wrap">
        <div class="recommend">商品推荐</div>
        <div ref="wrapper" class="wrapper">
            <!-- /* 这里是父盒子*/ -->
            <ul class="cont" ref="cont">
                <!-- /* 这里是子盒子，即滚动区域*/ -->
                <li class="cont-item" v-for="(item, index) in recommend" :key="index" @click="details(item.goodsId)">
                    <div class="cont-img">
                        <img class="img" :src="item.image" />
                    </div>
                    <div class="name">{{ item.goodsName }}</div>
                    <div class="cont-pr">
                        <div class="cont-dest">￥{{ item.mallPrice }}</div>
                        <div class="cont-price">
                            <span class="price">￥{{ item.price }}</span>
                        </div>
                    </div>
                    <div class="btn">
                        <van-icon name="shopping-cart" class="icon" @click.stop="add(item)" />
                        <div class="xiang">查看详情</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
import BScroll from "better-scroll";
export default {
    name: "",
    props: {
        recommend: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {};
    },
    components: {},
    methods: {
        verScroll () {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.wrapper, {
                        startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: "vertical",
                    });
                } else {
                    this.scroll.refresh(); //如果dom结构发生改变调用该方法
                }
            });
        },
        //跳转到单个商品详情
        details (item) {
            this.$router.push({
                path: '/single',
                query: {
                    id: item
                }
            })
            // console.log(item);
        },
        add (item) {
            this.$utils.checkLogin({
                key: 'nickname',
                next: this.collect,
                item: item
            })

        },
        collect (item) {
            console.log(item);
            //加入到购物车
            // console.log(item.goodsId);
            this.$api.addShop(item.goodsId).then(res => {
                if (res.code === 200) {
                    Toast.success('加入成功');
                    this.$api.getCard().then(res => {
                        // console.log(res);
                        localStorage.setItem('badge', res.shopList.length)
                        this.$store.commit('setBadge', res.shopList.length)
                    }).catch(err => {
                        console.log(err);
                    })
                    // this.$router.back()
                }
                // console.log(res);
            }).catch(err => {
                console.log(err);
            })


        }
    },
    mounted () {
        this.$nextTick(() => {
            this.verScroll();
        });
    },
    computed: {},
    watch: {},
};
</script>

<style lang='scss' scoped>
.recommand-wrap {
    width: 100%;
    background: white;
}
.recommend {
    padding: 10px;
    font-size: 15px;
    border-bottom: 1px solid gray;
    margin: 10px 0;
}
.img {
    width: 130px;
    height: 120px;
}
.cont {
    display: flex;
    flex: 1;
}
.cont-pr {
    margin: 5px 0;
    display: flex;
}
.cont-dest {
    text-align: center;
    margin: 0 5px;
    line-height: 3.5vw;
}
.name {
    width: 130px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wrapper {
    display: flex;
    overflow: hidden;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #feca3a;
    color: #fff;
    border-radius: 10px 0px 0px 10px;
}
.xiang {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff4c38;
    width: 80px;
    height: 30px;
    color: #fff;
    border-radius: 0px 10px 10px 0px;
}
.cont-item {
    margin-right: 5px;
    background: white;
    padding: 5px;
}
.price {
    text-decoration: line-through;
}
.btn {
    display: flex;
    margin: 0 20px;
}
</style>

