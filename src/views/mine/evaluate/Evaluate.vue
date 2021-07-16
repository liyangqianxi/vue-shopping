<template>
    <!-- 待评价 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">待评价</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div class="logo">
            <img src="../../../assets/evaluate.jpg" alt />
        </div>
        <div id="entertain">
            <van-tabs v-model="active">
                <van-tab title="待评价">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item" /> -->
                            <div class="particulars" v-for="(item,index) in list" :key="index">
                                <div>
                                    <img class="graph" :src="item.image_path" alt />
                                </div>
                                <div>
                                    <div class="text">{{item.name}}</div>
                                    <div class="btn">
                                        <van-button plain type="danger" round @click="simple(item)">
                                            <van-icon color="red" name="chat" />评论晒单
                                        </van-button>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
                <van-tab title="已评价">
                    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                            <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item" /> -->
                            <div class="particulars" v-for="(val,key) in obj" :key="key">
                                <div>
                                    <img class="graph" :src="val.goods[0].image_path" alt />
                                </div>
                                <div>
                                    <div class="text">{{val.goods[0].name}}</div>
                                    <div class="btn">
                                        <van-button plain type="danger" round @click="simple1(val)">
                                            <van-icon color="red" name="chat" />查看评论
                                        </van-button>
                                    </div>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
            active: 2,
            page: 1,
            // page1: 1,
            list: [],
            obj: [],
            loading: false,
            finished: false,
            refreshing: false,
            count: 0
        }
    },
    components: {},
    methods: {
        // 去评论
        simple (item) {
            // console.log(item);
            this.$router.push({
                path: "/comment",
                query: {
                    comment: JSON.stringify(item),
                }
            })
        },
        // 查看评论
        simple1 (val) {
            this.$router.push({
                path: "/appraise",
                query: {
                    comment: JSON.stringify(val),
                }
            })
        },
        // 返回
        goto () {
            this.$router.back()
        },
        // 待评价
        getData () {
            this.$api.tobeEvaluated(this.page).then(res => {
                this.list = this.list.concat(res.data.list)
                // console.log(res);
                this.count = res.data.count
            }).catch(err => {
                console.log(err);
            })
        },
        // 已评价
        getalready () {
            this.$api.alreadyEvaluated(this.page).then(res => {
                this.obj = this.obj.concat(res.data.list)
                // console.log(this.obj, "obj");
                this.count = res.data.count

            }).catch(err => {
                console.log(err);
            })
        },
        // 下拉刷新组件
        onLoad () {
            setTimeout(() => {
                if (this.refreshing) {
                    this.list = [];
                    this.refreshing = false;
                }
                this.loading = false;
                // this.page++
                this.getData()
                if (this.list.length >= this.count) {
                    this.finished = true;
                }
            }, 1000);
        },
        onRefresh () {
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            this.getalready();

        },
    },
    mounted () {
        this.getData()
        this.getalready()
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.logo {
    img {
        width: 375px;
    }
}

.particulars {
    margin: 10px 0;
    display: flex;
    border-bottom: 1px solid #ddd;
    .graph {
        width: 100px;
    }
    .text {
        margin-top: 20px;
    }
    .btn {
        margin-left: 130px;
        margin-top: 10px;
    }
}
</style>
