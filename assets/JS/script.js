$(document).ready(function () {
  // إشعار عند إضافة منتج
  $('.btn-primary').on('click', function () {
    $('#alert-box').fadeIn(300);
    setTimeout(() => {
      $('#alert-box').fadeOut(300);
    }, 2500);
  });

  // إضافة المنتج إلى localStorage وتحديث العداد
  $('.add-to-cart').on('click', function () {
    const name = $(this).data('name');
    const price = $(this).data('price');
    const img = $(this).data('img');

    const item = { name, price, img };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('تمت إضافة المنتج إلى السلة!');
    updateCartCount(); // 🔄 تحديث العداد بعد الإضافة
  });

  // تحديث العداد عند تحميل الصفحة
  updateCartCount();
});

// دالة تحديث العداد
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

// تأثير ظهور الكروت عند التمرير
const cards = document.querySelectorAll('.fade-in-up');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// تأكيد الطلب (صفحة checkout.html)
document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirm-order");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (!name || !email || !phone) {
        alert("❌ الرجاء تعبئة جميع الحقول!");
        return;
      }

      if (cart.length === 0) {
        alert("🚫 لا يوجد منتجات في السلة.");
        return;
      }

      const order = {
        customer: { name, email, phone },
        products: cart,
        total: cart.reduce((sum, item) => sum + Number(item.price), 0),
        date: new Date().toLocaleString()
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      localStorage.removeItem("cart");

      alert("✅ تم تأكيد الطلب بنجاح!\nشكراً لتسوقك معنا ❤️");
      window.location.href = "index.html";
    });
  }
});
