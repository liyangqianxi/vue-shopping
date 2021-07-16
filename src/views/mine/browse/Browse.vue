<template>
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">最近浏览</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <div v-if="list.length>0">
            <div v-for="(item, index) in list" :key="index">
                <div class="xiang">
                    <div id="img">
                        <img :src="item.image_path" class="img" />
                    </div>
                    <div>
                        <div class="name">{{ item.name }}</div>
                        <div class="pri">
                            <div class="price">￥{{ item.present_price }}</div>
                            <div class="orl">{{ item.orl_price }}</div>
                        </div>
                    </div>
                    <div class="close">
                        <van-icon name="close" class="icon" @click="icon" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <van-empty description="暂无浏览记录" />
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    props: {},
    data () {
        return {
            list: [],
        };
    },
    components: {},
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },
        icon (item) {
            this.list.splice(item, 1);
            localStorage.setItem(
                `${localStorage.getItem("nickname")}listHistory`,
                JSON.stringify(this.list)
            );
        },
    },
    mounted () {
        let a = this.$utils.getHistory({
            user: localStorage.getItem("nickname"),
            key: "list",
        });
        if (a) {
            this.list = a;
        }
        console.log(this.list);
    },
    computed: {},
    watch: {},
};
</script>

<style lang='scss' scoped>
.box {
    display: flex;
}
.fillet {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: gray;
    font-size: 16px;
    margin-top: 5px;
}
.order {
    width: 310px;
    display: flex;
    justify-content: center;
    font-size: 17px;
    margin-top: 6px;
}
#img {
    width: 100px;
    height: 100px;
    border: 1px solid #eee;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
}
.img {
    width: 90px;
    height: 90px;
}
.xiang {
    width: 100%;
    height: 110px;
    display: flex;
    padding: 5px 0;
    position: relative;
}
.pri {
    display: flex;
}
.price {
    color: red;
    margin-right: 10px;
    margin-left: 10px;
}
.name {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
}
.orl {
    margin-top: 2.5px;
    text-decoration: line-through;
}

.icon {
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 16px;
}
</style>
