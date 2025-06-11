// src/websocketClient.ts

const socket = new WebSocket('ws:http://47.122.10.247:8989/ws/token');

socket.onopen = () => {
    console.log('WebSocket 连接成功');
};

socket.onmessage = (event: MessageEvent) => {
    console.log('Message from server:', event.data);
    if (event.data === 'clearToken') {
        localStorage.removeItem('TOKEN'); // 清除 token
        window.location.href = '/login'; // 重定向到登录页面
    }
};

socket.onclose = () => {
    console.log('WebSocket connection 关闭');

};

socket.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
};

export default socket; // 导出 socket 对象
