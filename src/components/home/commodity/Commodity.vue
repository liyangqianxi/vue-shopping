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
                    <img :src="floor1[0].image" alt class="picture" />
                    <img :src="floor1[3].image" alt />
                </div>
                <div class="right">
                    <img :src="floor1[1].image" alt />
                    <img :src="floor1[2].image" alt />
                    <img :src="floor1[4].image" alt />
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
    methods: {},
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
