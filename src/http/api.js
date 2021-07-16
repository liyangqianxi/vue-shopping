// 封装所有的请求
import http from './index';

export default {
    // // 传参数都传成功对象的方式
    // login({ username, password }) {
    //     return http.post('/login', {
    //         username,
    //         password
    //     })
    // },
    // 所有接口的api封装
    /**
     * 首页(Home)所有接口
     * recommend            首页的默认数据
     * search               搜索 参数： value：搜索关键词
     * keeplogin            保持登录
     */
    recommend() {
        return http.get('/recommend');
    },

    search(value) {
        return http.post('/search', {
            value
        });
    },
    // ===============================================================================================================
    /**
     * 分类页面(Category)所有接口
     * category 分类查询  参数id：默认分类的id
     */
    classification(id) {
        return http.get(`/classification?mallSubId=${id}`);
    },

    // ===============================================================================================================
    /**
     * 购物车(ShoppingCart)所有接口
     * getCard      查询获取购物车数据
     * editCart     购物车加减商品      参数 ： 数量  商品id 价格
     * deleteShop   购物车商品删除      参数 id：需要删除的商品cid
     */
    getCard() {
        return http.post(`/getCard`);
    },

    editCart(count, id, mallPrice) {
        return http.post('/editCart', {
            count,
            id,
            mallPrice
        });
    },

    deleteShop(id) {
        return http.post('/deleteShop', id);
    },

    // ===============================================================================================================
    /**
     * 购物车支付页面(ShoppingPayMent)所有接口
     * placeOrder 提交订单 参数：address:收货地址,tel:电话，orderId：所有商品的id，totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
     */
    placeOrder({ address, tel, orderId, totalPrice, idDirect, count }) {
        return http.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count
        });
    },

    // ===============================================================================================================
    /**
     * 商品详情页面(Details)所有接口
     * goods ***      请求单个商品详情,        参数： id:商品的id,page: 商品评论的页码
     * collection ***       收藏单个商品            参数：  goods:商品的详情信息
     * cancelCollection 取消收藏单个商品        参数：  id:商品的cid
     * isCollection***     查询商品是否已收藏      参数：  id:商品的id
     * addShop          加入购物车             参数：  id:商品的id
     */
    goods(id) {
        return http.get(`/goods/one?id=${id}`);
    },

    collection(goods) {
        return http.post('/collection', goods);
    },

    cancelCollection(id) {
        return http.post('/cancelCollection', { id });
    },

    isCollection(id) {
        return http.post(`/isCollection`, { id });
    },

    addShop(id) {
        return http.post(`/addShop`, { id });
    },
    // ===============================================================================================================

    /**
     * 会员中心(My)所有接口
     * loginOut 退出登录
     * user     获取用户信息
     * saveUser 修改保存用户信息(gender,email,year,month,day,id,nickname,avatar)
     * getOrderNum 查询用户订单数量
     * comment  商品评论(id,rate,content, anonymous(是否匿名), _id, order_id, image=[])
     */
    loginOut() {
        return http.post(`/loginOut`);
    },

    user() {
        return http.post(`/queryUser`);
    },

    saveUser({...args }) {
        return http.post(`/saveUser`, args);
    },

    getOrderNum() {
        return http.get(`/myOrder/orderNum`);
    },

    comment({ id, rate, content, anonymous, _id, order_id, image }) {
        return http.post(`/goodsOne/comment`, {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image
        });
    },
    // ===============================================================================================================
    /**
     * 用户相关(user文件夹下)所有接口
     * getAverify           获取登录注册默认验证码
     * replaceVerify        更换验证码
     * getAddress           查询用户收货地址
     * getDefaultAddress    查询默认收货地址
     * setDefaultAddress    设置默认收货地址    参数：id：地址id
     * postAddress          增加收货地址        参数：name:用户名,tel:电话，address:(省+市+区+详情地址)，isDefault：是否默认
     *                                province：省，city：市，county：区，addressDetail：详情地址，
     *                                areaCode：地区代码，id：修改地址时候要传id
     * deleteAddress        删除地址            参数： id：地址_id
     * getCollection        查询我的收藏    参数：page，页码，默认第一页
     * register             注册            参数：nickname，用户名 password：密码，verify:验证码
     * login                登录
     * codeMsg              短信验证码      参数： sms 4位验证码
     * getMyOrder           订单查询        参数：evaluate：用来判断是不是查询订单，默认false
     * alreadyEvaluated     查询已评价      参数： page：页面
     * tobeEvaluated        查询待评价      参数： page：页面
     * evaluateOne          查询单条评论    参数： id：商品id，_id：数据库的那条id
     */
    verify() {
        return http.get('/verify');
        //   return process.env.NODE_ENV === 'production' ? `/v1/verify?mt=${Math.random()}` : `/api/v1/verify?mt=${Math.random()}`
    },

    getAddress() {
        return http.get(`/getAddress`);
    },

    getDefaultAddress() {
        return http.get(`/getDefaultAddress`);
    },

    setDefaultAddress(id) {
        return http.post(`/setDefaultAddress`, { id });
    },

    postAddress({
        name,
        tel,
        address,
        isDefault,
        province,
        city,
        county,
        addressDetail,
        areaCode,
        id
    }) {
        return http.post(`/address`, {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id
        });
    },

    deleteAddress(id) {
        return http.post('/deleteAddress', {
            id
        });
    },

    getCollection() {
        return http.get(`/collection/list`);
    },

    register({ nickname, password, verify }) {
        return http.post('/register', {
            nickname,
            password,
            verify
        });
    },

    login({ nickname, password, verify }) {
        return http.post('/login', {
            nickname,
            password,
            verify
        });
    },

    codeMsg(phone) {
        return http.post('/sendCodeMsg', {
            phone
        });
    },

    getMyOrder() {
        return http.get(`/myOrder`);
    },

    alreadyEvaluated(page = 1) {
        return http.get('/alreadyEvaluated', {
            params: { page }
        });
    },

    tobeEvaluated(page = 1) {
        return http.get('/tobeEvaluated', {
            params: { page }
        });
    },

    evaluateOne({ id, _id }) {
        return http.post('/evaluateOne', {
            id,
            _id
        });
    }
};