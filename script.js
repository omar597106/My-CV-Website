document.addEventListener("DOMContentLoaded", () => {
  // ========== Back to Top Button ==========
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // يظهر الزرار لما تنزل 300px
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // حركة ناعمة
    });
  });

  // ========== Header Shrink/Color Change on Scroll ==========
  const header = document.querySelector("header"); // بنجيب الهيدر بتاعنا

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // لو نزلنا 50px
      header.classList.add("scrolled"); // بنضيف كلاس 'scrolled'
    } else {
      header.classList.remove("scrolled"); // بنشيل الكلاس لو طلعنا فوق
    }
  });
});
// ... الكود القديم ...
// === Navigation Menu (Mobile Drawer) ===
const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

menuToggle.addEventListener("click", () => {
  navList.classList.toggle("active");
});
