
import request from '@/utils/request'
/***
 * 第三方接口
 * @description 图片相关接口
 */
/**
 * 获取图片列表
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
export function getImgList(page=1,size=10){
    return request({
      url: `https://picsum.photos/v2/list?page=${page}&limit=${size}`,
      method: 'get'
    })
}
/**
 * 获取图片详情
 * @param {*} id 
 * @returns 
 */
export function getImgById(id=0){
    return request({
      url: `https://picsum.photos/id/${id}/info`,
      method: 'get'
    })
}