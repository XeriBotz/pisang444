// Fungsi untuk menambahkan produk ke keranjang
function addToCart(packageName, productName, price) {
    // Memastikan bahwa nama paket, produk, dan harga tidak undefined
    if (!packageName || !productName || !price) {
        alert("Data produk tidak lengkap!");
        return;
    }

    // Ambil keranjang yang sudah ada dari LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Buat objek produk baru
    const newProduct = {
        package: packageName,
        product: productName,
        price: price
    };

    // Tambahkan produk ke keranjang
    cart.push(newProduct);

    // Simpan kembali keranjang ke LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Menampilkan notifikasi sukses
    showNotification(`Produk ${productName} berhasil ditambahkan ke keranjang.`);
    loadCart();  // Memuat ulang keranjang setelah penambahan produk
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fungsi untuk memuat dan menampilkan keranjang
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;
    let productList = '';

    // Mengambil data keranjang dari LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = ''; // Kosongkan daftar keranjang sebelum dimuat ulang

    // Menampilkan produk di keranjang
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span class="item-name">${item.package} - ${item.product}</span>
                <span class="item-price">Rp. ${item.price.toLocaleString()}</span>
            </div>
            <button class="remove-button" onclick="removeFromCart(${index})">Hapus</button>
        `;
        cartItems.appendChild(li);

        // Menyusun daftar produk untuk checkout
        productList += `• ${item.package} - ${item.product} seharga Rp. ${item.price.toLocaleString()} \n`;
        total += item.price;
    });

    // Menampilkan total harga
    totalPrice.textContent = `Total: Rp. ${total.toLocaleString()}`;

    // Mengatur tombol checkout
    document.getElementById('checkout-button').onclick = () => {
        // Format pesan dengan teks tebal untuk total dan daftar produk dengan rapih
        const message = `Saya ingin membeli produk:\n\n${productList}Total harga: *Rp. ${total.toLocaleString()}*`;
        window.open(`https://wa.me/6285717194190?text=${encodeURIComponent(message)}`);
    };
}
// Fungsi untuk menghapus item dari keranjang
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Menghapus item dari array berdasarkan index
    localStorage.setItem('cart', JSON.stringify(cart)); // Simpan kembali ke LocalStorage
    loadCart(); // Muat ulang keranjang setelah penghapusan
}

// Panggil fungsi loadCart saat halaman dimuat untuk menampilkan produk yang ada di keranjang
window.onload = loadCart;
