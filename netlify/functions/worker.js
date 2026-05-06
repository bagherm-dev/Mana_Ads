// این یک تابع استاندارد Netlify برای مدیریت درخواست‌های HTTP و WebSocket است
exports.handler = async (event, context) => {
    const upgradeHeader = event.headers['upgrade'] || '';

    // تشخیص اینکه آیا درخواست از نوع WebSocket (مناسب برای کلش) است یا خیر
    if (upgradeHeader.toLowerCase() === 'websocket') {
        return {
            statusCode: 101, // وضعیت تغییر پروتکل به وب‌ساکت
            headers: {
                'Upgrade': 'websocket',
                'Connection': 'Upgrade',
                'Sec-WebSocket-Accept': event.headers['sec-websocket-key']
            }
        };
    }

    // پاسخ معمولی برای تست سالم بودن سرور
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: "Server is active",
            message: "Netlify Function is running successfully.",
            timestamp: new Date().toISOString()
        }),
    };
};
