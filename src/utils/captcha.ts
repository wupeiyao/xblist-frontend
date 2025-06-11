import request from '@/utils/request';

export const getCaptcha = async () => {
  const response = await request({
    url: '/user/captcha',
    method: 'GET',
    responseType: 'blob', // 接收图片类型
  });

  const blob = new Blob([response.data], { type: 'image/png' });
  const imageUrl = URL.createObjectURL(blob);

  // 调试：打印所有响应头
  console.log('所有响应头:', response.headers);

  // 兼容大小写的获取方式
  const captchaCode =
    response.headers['Captcha-Code'] ||
    response.headers['captcha-code']

  if (!captchaCode) {
    throw new Error('无法从响应头获取Captcha-Code');
  }

  return {
    imageUrl,
    captchaCode,
  };
};
