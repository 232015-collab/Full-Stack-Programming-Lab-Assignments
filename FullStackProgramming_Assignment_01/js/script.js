/* =============================================
   HotSpring Spas – script.js
   Full Cart System + Auth Guard + jQuery
   ============================================= */

/* =============================================
   1. AUTH GUARD
   Pages accessible WITHOUT login
   ============================================= */
var PUBLIC_PAGES = ['login.html', 'register.html', 'forgot-password.html', 'terms.html'];
var _currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

if (PUBLIC_PAGES.indexOf(_currentPage) === -1) {
  if (!localStorage.getItem('hs_logged_in')) {
    // Save intended destination so we can redirect after login
    localStorage.setItem('hs_redirect', window.location.href);
    window.location.replace('login.html');
  }
}

/* =============================================
   2. CART SYSTEM (localStorage)
   ============================================= */
var Cart = {

  get: function () {
    return JSON.parse(localStorage.getItem('hs_cart') || '[]');
  },

  save: function (items) {
    localStorage.setItem('hs_cart', JSON.stringify(items));
    Cart.updateBadge();
  },

  add: function (id, name, price, image) {
    var items = Cart.get();
    var found = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].qty += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      items.push({ id: id, name: name, price: parseFloat(price), image: image, qty: 1 });
    }
    Cart.save(items);
    Cart.showToast(name);
  },

  remove: function (id) {
    var items = Cart.get().filter(function (i) { return i.id !== id; });
    Cart.save(items);
  },

  updateQty: function (id, qty) {
    var items = Cart.get();
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].qty = parseInt(qty);
        if (items[i].qty < 1) { items[i].qty = 1; }
        break;
      }
    }
    Cart.save(items);
  },

  total: function () {
    return Cart.get().reduce(function (sum, i) { return sum + (i.price * i.qty); }, 0);
  },

  count: function () {
    return Cart.get().reduce(function (sum, i) { return sum + i.qty; }, 0);
  },

  clear: function () {
    localStorage.removeItem('hs_cart');
    Cart.updateBadge();
  },

  updateBadge: function () {
    var n = Cart.count();
    $('.cart-badge').text(n).toggle(n > 0);
  },

  showToast: function (name) {
    var $t = $('<div class="cart-toast">🛒 <b>' + name + '</b> added to cart! <a href="cart.html">View Cart →</a></div>');
    $('body').append($t);
    setTimeout(function () { $t.addClass('show'); }, 10);
    setTimeout(function () { $t.removeClass('show'); setTimeout(function () { $t.remove(); }, 400); }, 3200);
  }
};

/* =============================================
   3. DOCUMENT READY
   ============================================= */
$(document).ready(function () {

  // Update badge on every page load
  Cart.updateBadge();

  /* ---- ADD TO CART ---- */
  $(document).on('click', '.add-to-cart', function () {
    var $card = $(this).closest('.card, .product-info, .product-detail-section');
    var name = $card.find('h6, h2').first().text().trim() || 'HotSpring Spa';
    var ptxt = $card.find('.price-tag, p').first().text();
    var price = parseFloat(ptxt.replace(/[^0-9.]/g, '')) || 500;
    var image = $card.find('img').first().attr('src') || 'images/product1.jpg';
    var id = 'item-' + name.replace(/\W+/g, '-').toLowerCase().slice(0, 30);

    Cart.add(id, name, price, image);

    var $btn = $(this);
    var orig = $btn.html();
    $btn.html('✓ Added!').addClass('btn-added');
    setTimeout(function () { $btn.html(orig).removeClass('btn-added'); }, 2200);
  });

  /* ---- SEARCH BAR ---- */
  $(document).on('click', '.searchbar .btn', function () {
    var q = $(this).siblings('.form-control').val().trim();
    if (!q) { alert('Please enter a search term.'); return; }
    window.location.href = 'products.html?search=' + encodeURIComponent(q);
  });

  $(document).on('keypress', '.searchbar .form-control', function (e) {
    if (e.which === 13) { $(this).siblings('.btn').trigger('click'); }
  });

  /* ---- NEWSLETTER SUBSCRIBE ---- */
  $(document).on('click', '.newsletter-btn', function () {
    var $inp = $(this).siblings('.form-control');
    var email = $inp.val().trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.'); return;
    }
    alert('✅ Thank you for subscribing!');
    $inp.val('');
  });

  /* ---- SCROLL TO TOP ---- */
  $(window).scroll(function () {
    $('#scroll-top-btn').toggle($(this).scrollTop() > 300);
  });
  $(document).on('click', '#scroll-top-btn', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* ---- QTY PICKER ---- */
  $(document).on('click', '.qty-plus', function () {
    var $i = $(this).siblings('.qty-input');
    $i.val(parseInt($i.val() || 1) + 1);
  });
  $(document).on('click', '.qty-minus', function () {
    var $i = $(this).siblings('.qty-input');
    var v = parseInt($i.val() || 1);
    if (v > 1) $i.val(v - 1);
  });

  /* ---- LOGOUT ---- */
  $(document).on('click', '#logoutBtn', function (e) {
    e.preventDefault();
    localStorage.removeItem('hs_logged_in');
    localStorage.removeItem('hs_user');
    window.location.href = 'login.html';
  });

  /* ============================================
     CART PAGE LOGIC
     ============================================ */
  if (_currentPage === 'cart.html') {
    renderCart();

    $(document).on('click', '.cart-remove', function () {
      var id = $(this).data('id');
      Cart.remove(id);
      renderCart();
    });

    $(document).on('change', '.cart-qty', function () {
      var id = $(this).data('id');
      var qty = parseInt($(this).val());
      Cart.updateQty(id, qty);
      renderCart();
    });
  }

  /* ============================================
     CHECKOUT PAGE LOGIC
     ============================================ */
  if (_currentPage === 'checkout.html') {
    renderOrderSummary();
    initCheckoutSteps();
  }

  /* ============================================
     ORDER CONFIRMATION
     ============================================ */
  if (_currentPage === 'order-confirmation.html') {
    renderConfirmation();
  }

  /* ============================================
     LOGIN FORM
     ============================================ */
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    var email = $('#email').val().trim();
    var password = $('#password').val().trim();
    var $err = $('#loginError');

    if (!email || !password) { $err.text('⚠ All fields are required.').show(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $err.text('⚠ Enter a valid email.').show(); return; }
    if (password.length < 6) { $err.text('⚠ Password must be at least 6 characters.').show(); return; }

    // Set auth
    localStorage.setItem('hs_logged_in', '1');
    localStorage.setItem('hs_user', email.split('@')[0]);

    // Redirect to intended page or home
    var dest = localStorage.getItem('hs_redirect') || 'index.html';
    localStorage.removeItem('hs_redirect');
    window.location.href = dest;
  });

  /* ============================================
     REGISTER FORM
     ============================================ */
  $('#registerForm').submit(function (e) {
    e.preventDefault();
    var fn = $('#first_name').val().trim();
    var ln = $('#last_name').val().trim();
    var em = $('#email').val().trim();
    var pw = $('#password').val().trim();
    var cpw = $('#confirm_password').val().trim();
    var agr = $('#agreeTerms').is(':checked');
    var $err = $('#registerError');

    if (!fn || !ln || !em || !pw || !cpw) { $err.text('⚠ All fields are required.').show(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { $err.text('⚠ Enter a valid email.').show(); return; }
    if (pw.length < 6) { $err.text('⚠ Password must be at least 6 characters.').show(); return; }
    if (pw !== cpw) { $err.text('⚠ Passwords do not match.').show(); return; }
    if (!agr) { $err.text('⚠ You must agree to the Terms & Conditions.').show(); return; }

    localStorage.setItem('hs_logged_in', '1');
    localStorage.setItem('hs_user', fn);
    var dest = localStorage.getItem('hs_redirect') || 'index.html';
    localStorage.removeItem('hs_redirect');
    window.location.href = dest;
  });

  /* ============================================
     FORGOT PASSWORD
     ============================================ */
  $('#forgotForm').submit(function (e) {
    e.preventDefault();
    var email = $('#fp_email').val().trim();
    var $err = $('#fpError');
    if (!email) { $err.text('⚠ Please enter your email.').show(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $err.text('⚠ Enter a valid email.').show(); return; }
    $err.hide();
    $('#sentEmailDisplay').text(email);
    $('#step1').fadeOut(300, function () { $('#step2').fadeIn(300); });
  });

  $('#resendLink').on('click', function (e) {
    e.preventDefault();
    $(this).text('Sent!');
    setTimeout(function () { $('#resendLink').text('click to resend'); }, 3000);
  });

  /* ============================================
     CONTACT FORM
     ============================================ */
  $('#contactForm').submit(function (e) {
    e.preventDefault();
    var name = $('#contact_name').val().trim();
    var email = $('#contact_email').val().trim();
    var msg = $('#contact_message').val().trim();
    if (!name || !email || !msg) { alert('⚠ Please fill all required fields.'); return; }
    $('#contactForm').hide();
    $('#contact-success').fadeIn(300);
  });

  /* ============================================
     BILLING ADDRESS FORM
     ============================================ */
  $('#billingForm').submit(function (e) {
    e.preventDefault();
    var fields = ['#b_first_name', '#b_last_name', '#b_email', '#b_phone', '#b_address', '#b_city', '#b_state', '#b_zip', '#b_country'];
    var empty = fields.filter(function (f) { return $(f).val().trim() === ''; });
    if (empty.length) { $('#billingError').text('⚠ Please fill all required fields.').show(); return; }
    $('#billingError').hide();
    $('#billingForm').hide();
    $('#billing-success').fadeIn(300);
    $('html,body').animate({ scrollTop: 0 }, 400);
  });

  /* ============================================
     SHIPPING ADDRESS FORM
     ============================================ */
  $('#sameAsBilling').change(function () {
    var on = $(this).is(':checked');
    $('#s_first_name').val(on ? 'John' : '');
    $('#s_last_name').val(on ? 'Smith' : '');
    $('#s_email').val(on ? 'john.smith@email.com' : '');
    $('#s_phone').val(on ? '888-201-8899' : '');
    $('#s_address').val(on ? '1009S, Ford Avenue' : '');
    $('#s_city').val(on ? 'Monmouth' : '');
    $('#s_state').val(on ? 'NJ' : '');
    $('#s_zip').val(on ? '07145' : '');
    $('#s_country').val(on ? 'United States' : '');
  });

  $('#shippingForm').submit(function (e) {
    e.preventDefault();
    var fields = ['#s_first_name', '#s_last_name', '#s_email', '#s_phone', '#s_address', '#s_city', '#s_state', '#s_zip', '#s_country'];
    var empty = fields.filter(function (f) { return $(f).val().trim() === ''; });
    if (empty.length) { $('#shippingError').text('⚠ Please fill all required fields.').show(); return; }
    $('#shippingError').hide();
    $('#shippingForm').hide();
    $('#sameAsBilling').closest('div').hide();
    $('#shipping-success').fadeIn(300);
    $('html,body').animate({ scrollTop: 0 }, 400);
  });

  /* ============================================
     DISPLAY USER NAME IN HEADER
     ============================================ */
  var user = localStorage.getItem('hs_user');
  if (user) {
    $('.user-display').text('Hi, ' + user).show();
  }

}); // end document.ready

/* =============================================
   CART PAGE – Render Function
   ============================================= */
function renderCart() {
  var items = Cart.get();
  var $body = $('#cartBody');
  var $empty = $('#cartEmpty');
  var $summary = $('#cartSummary');

  if (!$body.length) return;

  if (items.length === 0) {
    $body.html('');
    $empty.show();
    $summary.hide();
    Cart.updateBadge();
    return;
  }

  $empty.hide();
  $summary.show();

  var html = '';
  items.forEach(function (item) {
    html += '<tr class="cart-row">' +
      '<td><div class="d-flex align-items-center gap-3">' +
      '<img src="' + item.image + '" alt="' + item.name + '" class="cart-thumb">' +
      '<div><div class="fw-bold">' + item.name + '</div>' +
      '<small class="text-muted">Unit Price: $' + item.price.toFixed(2) + '</small></div>' +
      '</div></td>' +
      '<td><div class="qty-ctrl d-flex align-items-center gap-1">' +
      '<button class="qty-ctrl-btn qty-minus-cart" data-id="' + item.id + '">−</button>' +
      '<input type="number" class="cart-qty" data-id="' + item.id + '" value="' + item.qty + '" min="1" max="99">' +
      '<button class="qty-ctrl-btn qty-plus-cart" data-id="' + item.id + '">+</button>' +
      '</div></td>' +
      '<td class="fw-bold text-danger">$' + (item.price * item.qty).toFixed(2) + '</td>' +
      '<td><button class="cart-remove" data-id="' + item.id + '">🗑 Remove</button></td>' +
      '</tr>';
  });

  $body.html(html);

  // Subtotal, shipping, total
  var subtotal = Cart.total();
  var shipping = subtotal > 0 ? 25.00 : 0;
  var total = subtotal + shipping;
  $('#cartSubtotal').text('$' + subtotal.toFixed(2));
  $('#cartShipping').text('$' + shipping.toFixed(2));
  $('#cartTotal').text('$' + total.toFixed(2));
  Cart.updateBadge();

  // Qty buttons inside cart table
  $(document).off('click', '.qty-minus-cart').on('click', '.qty-minus-cart', function () {
    var id = $(this).data('id');
    var items2 = Cart.get();
    items2.forEach(function (i) { if (i.id === id && i.qty > 1) i.qty--; });
    Cart.save(items2);
    renderCart();
  });
  $(document).off('click', '.qty-plus-cart').on('click', '.qty-plus-cart', function () {
    var id = $(this).data('id');
    var items2 = Cart.get();
    items2.forEach(function (i) { if (i.id === id) i.qty++; });
    Cart.save(items2);
    renderCart();
  });
}

/* =============================================
   CHECKOUT PAGE – Order Summary
   ============================================= */
function renderOrderSummary() {
  var items = Cart.get();
  var $sum = $('#checkoutSummaryItems');
  if (!$sum.length) return;

  if (items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  var html = '';
  items.forEach(function (item) {
    html += '<div class="co-item">' +
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<div class="co-item-info"><div class="co-item-name">' + item.name + '</div>' +
      '<div class="co-item-qty">Qty: ' + item.qty + '</div></div>' +
      '<div class="co-item-price">$' + (item.price * item.qty).toFixed(2) + '</div>' +
      '</div>';
  });
  $sum.html(html);

  var subtotal = Cart.total();
  var shipping = 25.00;
  $('#coSubtotal').text('$' + subtotal.toFixed(2));
  $('#coShipping').text('$' + shipping.toFixed(2));
  $('#coTotal').text('$' + (subtotal + shipping).toFixed(2));
}

/* =============================================
   CHECKOUT PAGE – Multi-Step
   ============================================= */
function initCheckoutSteps() {
  var step = 1;

  function showStep(n) {
    step = n;
    $('.co-step-panel').hide();
    $('#coStep' + n).fadeIn(250);
    $('.co-step-indicator').removeClass('active done');
    for (var i = 1; i < n; i++) {
      $('#coInd' + i).addClass('done');
    }
    $('#coInd' + n).addClass('active');
    $('html,body').animate({ scrollTop: $('#checkoutSection').offset().top - 20 }, 300);
  }

  showStep(1);

  // Step 1 → Step 2 (Billing → Payment)
  $('#coBillingNext').click(function () {
    var fields = ['#co_fname', '#co_lname', '#co_email', '#co_phone', '#co_addr', '#co_city', '#co_state', '#co_zip', '#co_country'];
    var empty = fields.filter(function (f) { return $(f).val().trim() === ''; });
    if (empty.length) { $('#coBillingError').text('⚠ Please fill all required fields.').show(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#co_email').val().trim())) {
      $('#coBillingError').text('⚠ Enter a valid email.').show(); return;
    }
    $('#coBillingError').hide();

    // Show billing summary in review step
    var addr = $('#co_fname').val() + ' ' + $('#co_lname').val() + ', ' +
      $('#co_addr').val() + ', ' + $('#co_city').val() + ', ' +
      $('#co_state').val() + ' ' + $('#co_zip').val() + ', ' + $('#co_country').val();
    $('#reviewBillingAddr').text(addr);
    $('#reviewEmail').text($('#co_email').val());
    showStep(2);
  });

  // Step 2 → Step 3 (Payment → Review)
  $('#coPaymentNext').click(function () {
    var cardNum = $('#co_card').val().replace(/\s+/g, '');
    var expiry = $('#co_expiry').val().trim();
    var cvv = $('#co_cvv').val().trim();
    var name = $('#co_cardholder').val().trim();

    if (!name || !cardNum || !expiry || !cvv) {
      $('#coPaymentError').text('⚠ Please fill all card details.').show(); return;
    }
    if (!/^\d{13,19}$/.test(cardNum)) {
      $('#coPaymentError').text('⚠ Enter a valid card number.').show(); return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      $('#coPaymentError').text('⚠ Expiry format must be MM/YY.').show(); return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      $('#coPaymentError').text('⚠ Enter a valid CVV.').show(); return;
    }
    $('#coPaymentError').hide();

    // Mask card for display
    var masked = '**** **** **** ' + cardNum.slice(-4);
    $('#reviewCard').text(masked);
    showStep(3);
  });

  // Back buttons
  $('#coPaymentBack').click(function () { showStep(1); });
  $('#coReviewBack').click(function () { showStep(2); });

  // Format card number input
  $('#co_card').on('input', function () {
    var v = $(this).val().replace(/\D/g, '').slice(0, 16);
    $(this).val(v.replace(/(.{4})/g, '$1 ').trim());
  });

  // Expiry formatting
  $('#co_expiry').on('input', function () {
    var v = $(this).val().replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    $(this).val(v);
  });

  // Place Order
  $('#coPlaceOrder').click(function () {
    var $btn = $(this);
    $btn.html('<span class="spinner"></span> Processing…').prop('disabled', true);
    setTimeout(function () {
      // Save order reference
      var orderNum = 'HS-' + Math.floor(10000 + Math.random() * 90000);
      var orderData = {
        num: orderNum,
        items: Cart.get(),
        total: (Cart.total() + 25).toFixed(2),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      localStorage.setItem('hs_last_order', JSON.stringify(orderData));
      Cart.clear();
      window.location.href = 'order-confirmation.html';
    }, 2000);
  });
}

/* =============================================
   ORDER CONFIRMATION – Render
   ============================================= */
function renderConfirmation() {
  var raw = localStorage.getItem('hs_last_order');
  if (!raw) { $('#confirmContent').html('<p>No order found. <a href="index.html">Continue shopping</a>.</p>'); return; }
  var o = JSON.parse(raw);

  $('#confirmOrderNum').text(o.num);
  $('#confirmDate').text(o.date);
  $('#confirmTotal').text('$' + o.total);

  var ihtml = '';
  o.items.forEach(function (item) {
    ihtml += '<div class="co-item">' +
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<div class="co-item-info"><div class="co-item-name">' + item.name + '</div>' +
      '<div class="co-item-qty">Qty: ' + item.qty + '</div></div>' +
      '<div class="co-item-price">$' + (item.price * item.qty).toFixed(2) + '</div>' +
      '</div>';
  });
  $('#confirmItems').html(ihtml);
}
