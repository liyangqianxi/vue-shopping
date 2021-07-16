<template>
    <!-- 楼层 -->
    <div>
        <div class="box">
            <div style="display: flex; margin: 10px 38%;">
                <slot name="floor"></slot>
                {{floorName1}}
            </div>

            <div class="photo">
                <div class="left">
                    <img :src="floor1[0].image" alt class="picture" @click="details(floor1[0].goodsId)" />
                    <img :src="floor1[3].image" alt @click="details(floor1[3].goodsId)" />
                </div>
                <div class="right">
                    <img :src="floor1[1].image" alt @click="details(floor1[1].goodsId)" />
                    <img :src="floor1[2].image" alt @click="details(floor1[2].goodsId)" />
                    <img :src="floor1[4].image" alt @click="details(floor1[4].goodsId)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        floor1: {
            type: Array,
            required: true
        },
        floorName1: {
            type: String,
            required: true
        }
    },
    data () {
        return {
        }
    },
    components: {},
    methods: {
        details (val) {
            this.$router.push({
                path: '/single',
                query: {
                    id: val
                }
            })
            // console.log(val);
        }

    },
    mounted () {
        // console.log(this.floor1);
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
.photo {
    display: flex;
}
.left {
    width: 185px;
}
.right {
    width: 185px;
}
.photo img {
    width: 180px;
    border: 1px solid #ddd;
}
.picture {
    margin: 1px;
    height: 50.8vw;
}
</style>
