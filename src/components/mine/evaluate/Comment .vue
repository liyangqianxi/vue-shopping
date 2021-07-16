<template>
    <!-- 评论 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">评价中心</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div style="display: flex; padding: 10px;">
            <div>
                <img class="graph" :src="comment.image_path" alt />
            </div>
            <div style="margin-left: 20px;">
                <div style="margin: 20px 0;">商品评分</div>
                <van-rate v-model="value" />
            </div>
        </div>
        <div id="remark">
            <van-field v-model="message" rows="2" autosize type="textarea" placeholder="说说你的感受吧~~" show-word-limit />
        </div>
        <div style="margin: 20px 0;padding: 10px;">
            <van-checkbox v-model="checked">匿名评价</van-checkbox>
        </div>
        <div style="padding:10px;">
            <van-button type="primary" size="large" @click="submit">提交</van-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data () {
        return {
            message: "",
            checked: false,
            comment: [],
            value: 0,
        }
    },
    components: {},
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },
        // 提交
        submit () {
            this.$api.comment({
                id: this.comment.cid,
                rate: this.value,
                content: this.message,
                anonymous: this.checked,
                _id: this.comment._id,
                order_id: this.comment.order_id,
                image: []
            }).then(res => {
                // console.log(res);
                if (res.code === 200) {
                    Toast.success('评论成功');
                    this.$router.back()
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted () {
        this.comment = JSON.parse(this.$route.query.comment)
        console.log(this.comment);
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.graph {
    width: 100px;
}
</style>
