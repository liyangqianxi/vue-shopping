<template>
    <!-- 编辑地址 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto()">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">编辑地址</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>

        <van-address-edit
            :address-info="arr"
            :area-list="areaList"
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit, Toast } from 'vant';
import { areaList } from '@vant/area-data';
Vue.use(AddressEdit);
export default {
    name: '',
    props: {
    },
    data () {
        return {
            areaList,
            searchResult: [],
            arr: {}
        }
    },
    components: {},
    methods: {
        goto () {
            this.$router.back()
        },
        onSave (address) {
            // console.log(address);
            this.$api.postAddress({
                name: address.name,
                tel: address.tel,
                address: `${address.province}${address.city}${address.county}${address.addressDetail}`,
                isDefault: address.isDefault,
                province: address.province,
                city: address.city,
                county: address.county,
                addressDetail: address.addressDetail,
                areaCode: address.areaCode,
                id: address._id
            }).then(res => {
                // console.log(res);
                Toast('修改成功');
                this.$router.back()

            }).catch(err => {
                console.log(err);
            })


        },
        // 删除地址
        onDelete () {
            this.$api.deleteAddress(this.arr.id).then(res => {
                // console.log(res);
                Toast('删除成功');
                this.$router.back()
            }).catch(err => {
                console.log(err);
            })
        },

    },
    mounted () {
        this.arr = JSON.parse(this.$route.query.arr)
        // console.log(this.arr);
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>
