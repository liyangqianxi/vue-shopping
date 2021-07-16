<template>
    <!-- 地址管理 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">地址列表</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div>
            <div v-if="arr.length>0">
                <van-address-list v-model="chosenAddressId" :list="arr" default-tag-text="默认" @add="onAdd" @edit="onEdit" @select="select" />
            </div>
            <div v-else>
                <div class="text">暂无收货地址~~</div>
                <div class="btn">
                    <van-button type="danger" @click="onAdd" block>新增</van-button>
                </div>
            </div>
            <!-- <div class="increased">
                <van-button type="danger" size="large " @click="goto('/increased')">新增地址</van-button>
            </div>-->
        </div>
    </div>
</template>

<script>

export default {
    name: '',
    props: {},
    data () {
        return {
            chosenAddressId: '1',
            arr: [],
            location: []
        }
    },
    components: {

    },
    methods: {
        // 更换地址
        select (item) {
            // this.location.push(item)
            localStorage.setItem("location", JSON.stringify(item))
            this.$router.back()
        },
        // 返回
        goto () {
            this.$router.back()
        },
        // 增加
        onAdd () {
            this.$router.push('/increased')
        },
        // 编辑
        onEdit (item) {
            // console.log(item, index);
            this.$router.push({
                path: '/setting',
                query: {
                    arr: JSON.stringify(item)
                }
            })
        },

        getData () {
            this.$api.getAddress().then(res => {
                // console.log(res);
                this.arr = res.address

                this.arr.map(item => {
                    this.$set(item, "id", item._id);
                    if (item.isDefault) {
                        this.chosenAddressId = item._id
                    }
                })
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
.increased {
    width: 100%;
    position: fixed;
    bottom: 0;
}
.van-address-list__bottom {
    border: 1px solid white;
}
.text {
    font-size: 20px;
    margin: 50px;
    text-align: center;
    color: #ddd;
}
.btn {
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>
