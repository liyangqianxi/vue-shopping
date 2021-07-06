<template>
    <!-- 登录 -->
    <div id="login">
        <div class="box">
            <div class="text">登录/注册</div>
            <div>
                <van-form @submit="onSubmit">
                    <van-field v-model="nickname" name="用户名" placeholder="USERNAME" :rules="[{ required: true, message: '请填写用户名' }]" />

                    <van-divider :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }" />

                    <van-field v-model="password" type="password" name="密码" placeholder="PASSWORD" :rules="[{ required: true, message: '请填写密码' }]" />

                    <van-divider :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }" />
                    <div id="note">
                        <van-field v-model="verify" label="验证码" placeholder="请输入验证码" :rules="[{ required: true, message: '请输入验证码' }]" />
                        <div class="yard" v-html="arr" @click="flush"></div>
                    </div>
                    <van-divider :style="{ color: 'gray', borderColor: 'gray', padding: '0 16px' }" />
                    <div class="operation">
                        <van-button type="primary" class="btn" @click="fire" size="normal">登录</van-button>
                        <van-button type="danger" @click="enroll" size="normal">注册</van-button>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {},
    data () {
        return {
            nickname: "",
            password: "",
            verify: "",
            // 图片验证
            arr: "",
        }
    },
    components: {},
    methods: {
        onSubmit (values) {
            console.log('submit', values);
        },
        // 刷新验证码
        flush () {
            this.$api.verify().then(res => {
                this.arr = res
            }).catch(err => {
                console.log(err);
            })
        },
        // 登录
        fire () {
            this.$api.login({
                nickname: this.nickname,
                password: this.password,
                verify: this.verify
            }).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.$notify(res.msg);
                    this.$router.push("/")
                } else {
                    this.$notify(res.msg);
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //注册
        enroll () {
            this.$api.register({
                nickname: this.nickname,
                password: this.password,
                verify: this.verify
            }).then(res => {
                console.log(res);
                if (res.code === 200) {
                    this.nickname = "",
                        this.password = "",
                        this.verify = "",
                        this.$notify(res.msg);
                } else {
                    this.$notify(res.msg);
                }
            }).catch(err => {
                console.log(err);
            })

        }
    },
    mounted () {
        // 图片验证码
        this.$api.verify().then(res => {
            this.arr = res
        }).catch(err => {
            console.log(err);
        })

    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
#login {
    width: 100%;
    height: 665px;
    background-image: url('../../assets/login.jpg');
    position: relative;

    .box {
        width: 85%;
        position: absolute;
        top: 18%;
        left: 5%;
        background: white;
        padding: 10px;
        .text {
            font-size: 25px;
        }
    }
}
#note {
    display: flex;
    .verify {
        width: 200px;
    }
    .yard {
        width: 100px;
    }
}
.van-cell {
    margin: 10px 0;
}
.van-divider {
    margin-top: -10px;
}
.btn {
    margin-right: 20px;
}
.operation {
    margin-bottom: 30px;
}
</style>
