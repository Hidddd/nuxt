import request from './request'
// 获取赛事信息
export const getGameType = (params) => {
  return request({
      url: '/pbmsg.api.TournamentListRequest',
      method: 'post',
      data: params
  })
}
// 手机验证码
export const getCode = (params) => {
  return request({
    url: 'pbmsg.common.PhoneCodeRequest',
    method: 'post',
    data: params
  })
}
// 获取图片验证码
export const GetCaptcha = (params) => {
  return request({
    url: 'pbmsg.common.GetCaptchaRequest',
    method: 'post',
    data: params
  })
}
// 登录
export const Login = (params) => {
  return request({
    url: '/pbmsg.auth.LoginRequest',
    method: 'post',
    data: params
  })
}