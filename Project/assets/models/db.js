const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',      // اسم المضيف (Host)
    user: 'root',           // اسم المستخدم
    password: 'yourpassword', // كلمة المرور
    database: 'ecommerce',  // اسم قاعدة البيانات
});

module.exports = pool.promise();
