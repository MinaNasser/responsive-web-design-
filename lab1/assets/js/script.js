// اختيار العناصر المطلوبة
const navToggler = document.querySelector('.nav-toggler'); // زر القائمة
const mainNav = document.querySelector('.main-nav'); // عنصر التنقل الرئيسي
const toggleIcon = document.querySelector('.nav-toggler i'); // أيقونة زر القائمة
const links = document.querySelectorAll('.links'); // عناصر التنقل
// إضافة حدث النقر لزر القائمة
navToggler.addEventListener('click', () => {
    mainNav.classList.toggle('toggler-open'); // تفعيل أو إلغاء كلاس "toggler-open"
    toggleIcon.classList.toggle('fa-bars'); // تبديل الأيقونة إلى "fa-bars"
    toggleIcon.classList.toggle('fa-times'); // تبديل الأيقونة إلى "fa-times"
    links.classList.toggle('toggler-open'); // تبديل كلاس "open" لعناصر التنقل
});
