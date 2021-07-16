<template>
    <!-- 新增地址 -->
    <div>
        <Top>
            <template #top>
                <div class="back" @click="goto('/mine')">
                    <van-icon name="arrow-left" color="rgb(91,171,251)" size="18px" />
                </div>
                <div class="set">新增地址</div>
            </template>
        </Top>
        <div style="height: 41px;"></div>
        <van-address-edit :area-list="areaList" show-set-default :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
    </div>
</template>

<script>
import Vue from 'vue';
import { AddressEdit, Toast } from 'vant';
import { areaList } from '@vant/area-data';

Vue.use(AddressEdit);
export default {
    name: '',
    props: {},
    data () {
        return {
            areaList,
            searchResult: [],
        }
    },
    components: {},
    methods: {
        // 返回
        goto () {
            this.$router.back()
        },
        onSave (address) {
            // console.log(address);
            // console.log(address.name, address.tel, `${address.province}${address.city}${address.county}${address.addressDetail}`, address.isDefault, address.province, address.city, address.county, address.addressDetail, address.areaCode,);
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
            }).then(res => {
                console.log(res);
                this.$router.back()
            }).catch(err => {
                console.log(err);
            })
        },
    },
    mounted () {

    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>
</style>
