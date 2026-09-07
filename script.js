// ============================================================
//  DATA PRODUK (Sesuaikan dengan produk asli MAP)
// ============================================================
const products = [
    {
        id: 'wp001',
        name: 'Wall Panel Oak',
        code: 'WP-001',
        category: 'Wall Panel',
        color: 'Oak Natural',
        size: '1200 x 2400 mm',
        description: 'Wall panel dengan motif serat kayu oak alami. Cocok untuk interior modern dan minimalis. Memberikan kesan hangat dan elegan.',
        mainImage: 'https://picsum.photos/id/1/800/800',
        rangkaImage: 'https://picsum.photos/id/2/800/800',
        otherImages: [
            'https://picsum.photos/id/3/800/800',
            'https://picsum.photos/id/4/800/800',
            'https://picsum.photos/id/5/800/800'
        ]
    },
    {
        id: 'wpb001',
        name: 'Wall Panel Board Walnut',
        code: 'WPB-001',
        category: 'Wall Panel Board',
        color: 'Walnut Dark',
        size: '1200 x 2400 mm',
        description: 'Panel dinding berbahan board dengan finishing walnut gelap. Tahan lama dan mudah perawatan. Ideal untuk ruang tamu dan kantor.',
        mainImage: 'https://picsum.photos/id/10/800/800',
        rangkaImage: 'https://picsum.photos/id/20/800/800',
        otherImages: [
            'https://picsum.photos/id/30/800/800',
            'https://picsum.photos/id/40/800/800'
        ]
    },
    {
        id: 'lwp001',
        name: 'List Wall Panel White',
        code: 'LWP-001',
        category: 'List Wall Panel',
        color: 'White Gloss',
        size: '50 x 2400 mm',
        description: 'List panel dinding berwarna putih mengkilap. Memberikan aksen elegan pada dinding. Mudah dipasang dan cocok untuk berbagai gaya.',
        mainImage: 'https://picsum.photos/id/50/800/800',
        rangkaImage: 'https://picsum.photos/id/60/800/800',
        otherImages: [
            'https://picsum.photos/id/70/800/800',
            'https://picsum.photos/id/80/800/800',
            'https://picsum.photos/id/90/800/800'
        ]
    },
    {
        id: 'dk001',
        name: 'Decking Teak',
        code: 'DK-001',
        category: 'Decking',
        color: 'Teak Brown',
        size: '150 x 3000 mm',
        description: 'Decking kayu jati dengan tekstur alami. Tahan terhadap cuaca dan kelembaban. Sangat cocok untuk area outdoor seperti teras dan taman.',
        mainImage: 'https://picsum.photos/id/100/800/800',
        rangkaImage: 'https://picsum.photos/id/110/800/800',
        otherImages: [
            'https://picsum.photos/id/120/800/800',
            'https://picsum.photos/id/130/800/800'
        ]
    },
    {
        id: 'cl001',
        name: 'Cladding Grey',
        code: 'CL-001',
        category: 'Cladding',
        color: 'Stone Grey',
        size: '200 x 3000 mm',
        description: 'Cladding dinding eksterior dengan warna abu-abu batu. Memberikan tampilan modern dan industrial. Tahan terhadap cuaca ekstrem.',
        mainImage: 'https://picsum.photos/id/140/800/800',
        rangkaImage: 'https://picsum.photos/id/150/800/800',
        otherImages: [
            'https://picsum.photos/id/160/800/800',
            'https://picsum.photos/id/170/800/800',
            'https://picsum.photos/id/180/800/800'
        ]
    },
    {
        id: 'pfb001',
        name: 'PVC Foam Board White',
        code: 'PFB-001',
        category: 'PVC Foam Board',
        color: 'White',
        size: '1220 x 2440 mm',
        description: 'Papan PVC foam berwarna putih. Ringan, tahan air, dan mudah dibentuk. Digunakan untuk signage, display, dan aplikasi interior.',
        mainImage: 'https://picsum.photos/id/190/800/800',
        rangkaImage: 'https://picsum.photos/id/200/800/800',
        otherImages: [
            'https://picsum.photos/id/210/800/800',
            'https://picsum.photos/id/220/800/800'
        ]
    }
];

// ============================================================
//  FUNGSI RENDER
// ============================================================

/**
 * Menampilkan daftar produk di halaman utama
 */
function renderHome() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card" data-id="${p.id}">
            <img src="${p.mainImage}" alt="${p.name}" loading="lazy" />
            <div class="card-body">
                <h3>${p.name}</h3>
                <div class="product-code">${p.code}</div>
                <span class="product-category">${p.category}</span>
            </div>
        </div>
    `).join('');

    // Event listener pada setiap card
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            showDetail(id);
        });
    });
}

/**
 * Menampilkan halaman detail untuk produk dengan ID tertentu
 */
function showDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    // Sembunyikan home, tampilkan detail
    document.getElementById('homeView').style.display = 'none';
    const detailView = document.getElementById('detailView');
    detailView.classList.remove('hidden');

    const container = document.getElementById('detailContainer');

    // Gabungkan semua gambar (utama + rangka + lainnya)
    const allImages = [product.mainImage, product.rangkaImage, ...product.otherImages];

    // Rekomendasi: produk dengan kategori sama (kecuali dirinya)
    const recommendations = products.filter(p => p.category === product.category && p.id !== product.id);

    // Susun HTML detail
    container.innerHTML = `
        <div class="detail-layout">
            <!-- GALERI -->
            <div class="gallery-main">
                <img id="detailMainImage" src="${product.mainImage}" alt="${product.name}" />
                <div class="thumbnail-list" id="thumbnailList">
                    ${allImages.map((img, idx) => `
                        <img src="${img}" alt="Thumb ${idx+1}" data-index="${idx}" class="${idx === 0 ? 'active' : ''}" />
                    `).join('')}
                </div>
            </div>

            <!-- INFO PRODUK -->
            <div class="detail-info">
                <h1 class="product-title">${product.name}</h1>
                <div class="product-code-large">${product.code}</div>

                <div class="spec-box">
                    <div class="spec-item"><strong>Warna</strong> ${product.color}</div>
                    <div class="spec-item"><strong>Ukuran</strong> ${product.size}</div>
                    <div class="spec-item"><strong>Kategori</strong> ${product.category}</div>
                </div>

                <div class="detail-description">
                    <h4>Deskripsi</h4>
                    <p>${product.description}</p>
                </div>
            </div>

            <!-- REKOMENDASI -->
            <div class="recommend-section">
                <h3>Produk Lain yang Mungkin Anda Suka</h3>
                <div class="recommend-grid">
                    ${recommendations.length > 0 
                        ? recommendations.map(rec => `
                            <div class="recommend-card" data-id="${rec.id}">
                                <img src="${rec.mainImage}" alt="${rec.name}" loading="lazy" />
                                <div class="rec-name">${rec.name}</div>
                                <div class="rec-code">${rec.code}</div>
                            </div>
                        `).join('')
                        : '<p style="color:#888; grid-column:1/-1;">Tidak ada rekomendasi untuk kategori ini.</p>'
                    }
                </div>
            </div>
        </div>
    `;

    // Event thumbnail: ganti gambar utama
    document.querySelectorAll('#thumbnailList img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const src = this.src;
            document.getElementById('detailMainImage').src = src;
            document.querySelectorAll('#thumbnailList img').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Event rekomendasi: klik untuk melihat produk tersebut
    document.querySelectorAll('.recommend-card').forEach(card => {
        card.addEventListener('click', () => {
            const recId = card.dataset.id;
            showDetail(recId);
            // Scroll ke atas detail
            document.getElementById('detailView').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update URL hash agar bisa di-share
    window.location.hash = id;
    // Scroll ke detail
    detailView.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Kembali ke halaman utama (home)
 */
function goHome() {
    document.getElementById('homeView').style.display = 'block';
    document.getElementById('detailView').classList.add('hidden');
    window.location.hash = ''; // hapus hash
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
//  INISIALISASI
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Render semua produk di home
    renderHome();

    // Event tombol kembali
    document.getElementById('backHomeBtn').addEventListener('click', goHome);

    // Jika ada hash di URL (misal #wp001) maka langsung tampilkan detail
    if (window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const found = products.find(p => p.id === id);
        if (found) {
            document.getElementById('homeView').style.display = 'none';
            showDetail(id);
        }
    }

    // Saat hash berubah (tombol back/forward browser)
    window.addEventListener('hashchange', () => {
        const id = window.location.hash.replace('#', '');
        if (id) {
            const found = products.find(p => p.id === id);
            if (found) {
                document.getElementById('homeView').style.display = 'none';
                showDetail(id);
            } else {
                goHome();
            }
        } else {
            goHome();
        }
    });
});
