<template>
    <!-- 设置 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">个人资料</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>

        <div style="font-size:16px; width: 90%;
   margin: 10px auto; background: white; ">
            <div class="boxes">github</div>
            <div class="boxes1">
                <div style="line-height:104px ;">头像</div>
                <div>
                    <van-image round width="80px" height="80px" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                    <van-icon name="arrow" size="16px" />
                </div>
            </div>
            <div class="boxes">
                <van-cell-group>
                    <van-field v-model="value" label="用户名" />
                </van-cell-group>
            </div>
            <div class="boxes1">
                <div style="line-height:54px">性别</div>
                <div>
                    <van-dropdown-menu>
                        <van-dropdown-item v-model="value1" :options="option1" />
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="boxes1">
                <div style="line-height:54px">出生年月</div>
                <div>
                    <van-field v-model="timeValue" @click="showPopFn" placeholder="选择的日期结果" readonly />
                    <span class="birthday" style="padding: 10px;">
                        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                            <van-datetime-picker v-model="currentDate" type="date" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
                        </van-popup>
                    </span>
                </div>
            </div>
            <div>
                <div style="margin:10px;">
                    <van-button type="primary" size="large" @click="affirm">确认</van-button>
                </div>
                <div style="margin:10px;">
                    <van-button type="default" size="large" to="/mine">取消</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DatetimePicker } from 'vant';
import Vue from 'vue';
Vue.use(DatetimePicker);
import { Toast } from 'vant';

Vue.use(Toast);


export default {
    name: '',
    props: {},
    data () {
        return {
            value: "",
            show: false,
            value1: -1,
            option1: [
                { text: '男', value: 0 },
                { text: '女', value: 1 },
            ],
            msg: '',
            currentDate: new Date(),
            changeDate: new Date(),
            show: false, // 用来显示弹出层
            timeValue: ''
        }
    },
    components: {},
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },
        showPopFn () {
            this.show = true;
        },
        showPopup () {
            this.show = true;
        },
        changeFn () { // 值变化是触发
            this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
        },
        confirmFn () { // 确定时间按钮
            this.timeValue = this.timeFormat(this.currentDate);
            this.show = false;
        },
        cancelFn () { //取消时间按钮
            this.show = false;
        },
        timeFormat (time) { // 时间格式化 2019-09-08
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            return year + '年' + month + '月' + day + '日'
        },
        affirm () {
            //底部确认修改值
            localStorage.setItem("nickname", this.value)
            localStorage.setItem("value1", this.value1)
            localStorage.setItem("timeValue", this.timeValue)
            Toast.success('修改成功');
            this.$router.back()
        }


    },
    mounted () {
        this.timeFormat(new Date());
        this.value = localStorage.getItem("nickname")
        this.value1 = Number(localStorage.getItem("value1"))
        this.timeValue = localStorage.getItem("timeValue")
    },
    computed: {

    },
    watch: {

    }
}
</script>

<style lang='scss' scoped>
.boxes {
    width: 95%;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.boxes1 {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}
.van-dropdown-item__content {
    left: 5%;
    position: absolute;
    max-height: 80%;
    width: 90%;
}
</style>
