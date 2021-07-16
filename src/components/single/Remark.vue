<template>
    <!-- 评论详情 -->
    <div class="criticism">
        <div id="discuss">
            <div class="box">
                <div class="portrait">
                    <van-image round width="50px" height="50px" class="round" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="score">
                    {{review[0].comment_nickname}}
                    <van-rate v-model="review[0].rate" disabled />
                </div>
                <div class="time">{{review[0].comment_time}}</div>
            </div>
            <div class="text">{{review[0].content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        review: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
        }
    },
    components: {},
    methods: {},
    mounted () { },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
#discuss {
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    .box {
        display: flex;
        .portrait {
            margin-right: 20px;
        }
        .score {
            width: 165px;
        }
        .time {
            font-size: 15px;
            width: 170px;
            line-height: 54px;
        }
    }
    .text {
        margin: 10px 0;
        height: 200px;
    }
}
</style>
