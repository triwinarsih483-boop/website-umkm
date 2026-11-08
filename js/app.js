"use strict" ;

console.log("P09 JavaScript aktif") ;


const produkUmkm = [
  {
    nama: "Kopi Tubruk Signatur",
    kategori: "Kopi",
    harga: 45000,
    stok: 12,
    unggulan: true,
    diskonPersen:10,
  },
  {
    nama: "Cold Brew Aren",
    kategori: "Kopi",
    harga: 22000,
    stok: 4,
    unggulan: true,
  },
  {
    nama: "Hazelnut latte",
    kategori: "Kopi",
    harga: 20000,
    stok: 4,
    unggulan: false,
  },
  {
    nama: "Kopi Gayo Arabica",
    kategori: "Kopi",
    harga: 25000,
    stok: 4,
    unggulan: false,
  },
  {
    nama: "Paket seduh rumahan",
    kategori: "Bundling",
    harga: 75000,
    stok: 0,
    unggulan: false,
  },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function hitungHargaPromo(produk) {
  if (typeof produk.diskonPersen !== "number") {
    return produk.harga;
  }

  return Math.round(
    produk.harga - (produk.harga * produk.diskonPersen / 100)
  );
}

function ringkasanKategori(daftarProduk) {
  const jumlahKategori = {};

  daftarProduk.forEach((produk) => {
    if (!jumlahKategori[produk.kategori]) {
      jumlahKategori[produk.kategori] = 0;
    }

    jumlahKategori[produk.kategori]++;
  });

  return Object.entries(jumlahKategori)
    .map(([kategori, jumlah]) => `${kategori}: ${jumlah} produk`)
    .join(", ");
}


function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "warning" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}


function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const punyaDiskon =
    typeof produk.diskonPersen === "number" &&
    produk.diskonPersen > 0;

    const tampilanHarga = punyaDiskon ? `
    <p class="price">
      <s>${formatRupiah(produk.harga)}</s>
      <strong>${formatRupiah(hitungHargaPromo(produk))}</strong>
    </p>
    <p class="promo-label">Diskon ${produk.diskonPersen}%</p>
  ` : `
    <p class="price">
      ${formatRupiah(produk.harga)}
    </p>
    <p class="regular-label">Harga reguler</p>
  `;

  const labelJenisProduk = punyaDiskon
  ? "Produk promo"
  : "Tanpa diskon";

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      
      ${tampilanHarga}
      <p>${labelJenisProduk}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
      </article> `;
}

function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }
  const produkTersedia = produkUmkm.filter(
    (produk) => produk.stok > 0
  );
  const produkUnggulan = produkUmkm.find(
    (produk) => produk.unggulan === true
  );

  const markupProduk = produkTersedia
    .map(buatKartuProduk)
    .join("");

  grid.innerHTML = markupProduk;

  ringkasan.textContent =
    `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;

    unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.log("Produk tersedia:", produkTersedia);
  console.log("Produk unggulan:", produkUnggulan);

  produkUmkm.forEach((produk) => {
    console.log(`${produk.nama} - Stok: ${produk.stok}`);
  });

  console.table(produkUmkm);

  console.log(
  "Ringkasan kategori:",
  ringkasanKategori(produkUmkm)
  );

}
document.addEventListener("DOMContentLoaded", renderProduk);
