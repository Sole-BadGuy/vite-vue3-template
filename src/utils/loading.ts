/*
全局loading
*/

import { ElLoading } from 'element-plus'

export default () => {
  const loading = (title: string) => {
    const loadingInstance = ElLoading.service({ text: title })
    return loadingInstance
  }

  return {
    loading
  }
}
