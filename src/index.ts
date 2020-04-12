import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transfromRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

// 用于对传入的config做处理，不仅仅只是url的参数处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // headers处理逻辑要放前面，因为transformData时候把data字段转化为字符串了，所以先处理header
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transfromRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig):any {
  // config中有可能没有headers，所以设置一个默认值保证存在，因为processHeaders中
  const {headers = {},data}  = config
  return processHeaders(headers,data)
}

export default axios
