import axios from '@/interceptor'
/**
 * 获取access_token
 * @param {string} appId  appId
 * @param {string} secret secret
 */
export const getAccessToken = () => axios.get(`/Token/getToken?appId=JFosfCB6bYcZ437KaH&secret=wYnVZnoCm9CBEC65F6DE`)

/**
 * 获取微信签名
 * @param {string} url  //当前的网址
 */
export const getSignature = (url) => axios.get(`/weixin/getWeiXinSignature?appId=wx6038e83256e10474&appSecret=ae26046a89c3c3d8e4f9a78a6de48a0e&url=${url}`)

/**
 * 获取分类列表
 * @param {string} access_token 
 */
export const findClasses = (access_token) => axios.get(`/xmz/find?access_token=${access_token}`)

/**
 * 获取标签列表
 * @param {*}  data
 */
export const findLabel = (data) => axios.post(`/xmz/findLabel`,data)

/**
 * 初始化接口
 * @param {string} sysNum //站点sysNum
 * @param {string} s //s=p
 * @param {string} sourceId //渠道信息
 */
export const initMessage = () => axios.get(`/servlet/AQ?sysNum=15095187164821479&s=p&sourceId=0`)

/**
 * 获取问答内容
 * @param {string} sysNum //站点sysNum
 * @param {string} s //s=aq
 * @param {string} sourceId //渠道信息
 * @param {string} question //搜索的内容
 */
export const getFAQ = (question) => axios.get(`/servlet/AQ?sysNum=15095187164821479&s=aq&sourceId=0&question=${question}`)

/**
 * 获取文档检索内容
 * @param {string} access_token
 * @param {string} s //s=aq
 * @param {string} clientId //1
 * @param {string} question //搜索的问题
 * @param {string} pageNo //当前页
 * @param {string} pageSize //每页展示条数
 * @param {string} classIds  //筛选标签的id
 */
export const getDoc = (access_token,question,pageNo,pageSize,classIds) => axios.get(`/servlet/apichat/v4?access_token=${access_token}&s=documentSearch&clientId=1&question=${question}&pageNo=${pageNo}&pageSize=${pageSize}&classIds=${classIds}`)

/**
 * 发送邮件
 * @param {string} url //发送问档的链接
 * @param {string} toUserName //收件人邮箱
 * @param {string} content //邮件标题，默认写死
 * @param {string} access_token //access_token
 */
export const sendEmailModal = (url,toUserName,content,access_token) => axios.get(`/xmz/sendEmail?url=${url}&toUserName=${toUserName}&content=${content}&access_token=${access_token}`)