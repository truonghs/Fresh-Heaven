import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {createHmac} from 'react-native-crypto';
import {sha256} from 'react-native-sha256';

const VnPay = () => {
  const total = 100;
  const returnUrl = 'your_return_url';
  const tmnCode = 'your_tmn_code';
  const orderId = 'your_order_id';
  const bankCode = 'NCB';
  const secretKey = 'your_secret_key';

  useEffect(() => {
    const data = {
      vnp_Amount: total * 100,
      vnp_Command: 'pay',
      vnp_CreateDate: new Date().toISOString(),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '127.0.0.1',
      vnp_Locale: 'vn',
      vnp_OrderInfo: 'Adding To Wallet',
      vnp_OrderType: 'billpayment',
      vnp_ReturnUrl: returnUrl,
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: orderId,
      vnp_Version: '2.0.0',
      vnp_BankCode: bankCode,
    };

    const sortedData = Object.keys(data)
      .sort()
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    const signData = Object.entries(sortedData)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Tạo chữ ký SHA-256
    sha256(signData).then(hash => {
      data.vnp_SecureHashType = 'SHA256';
      data.vnp_SecureHash = hash.toUpperCase();

      // Tạo URL thanh toán của VNPAY
      const paymentUrl = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${new URLSearchParams(
        data,
      ).toString()}`;

      // Hiển thị trang thanh toán trong WebView
      // Chú ý: Đối với ứng dụng thực tế, bạn cần xử lý sự kiện chuyển hướng và kết quả thanh toán
      return <WebView source={{uri: paymentUrl}} style={{flex: 1}} />;
    });
  }, []);

  return null; // Trả về null để không hiển thị gì cả khi không có WebView
};

export default VnPay;
