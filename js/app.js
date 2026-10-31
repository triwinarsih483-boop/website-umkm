"use strict" ;

console.log("P09 JavaScript aktif") ;


const produkUmkm = [
  {
    nama: "Kopi Tubruk Signatur",
    kategori: "Kopi",
    harga: 45000,
    stok: 12,
    unggulan: true,
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


console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));


function statusStok(stok) {
  if (stok === 0) {
    return {
      label: "Habis",
      className: "empty",
    };
  }

  if (stok <= 5) {
    return {label: "Stok terbatas",className: "warning", };
  }

  return {
    label: "Tersedia",
    className: "",
  };
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

  // Halaman lain tidak memiliki target produk dinamis.
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi =
      produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";
            const labelUnggulan = produk.unggulan
  ? '<span class="product-badge">Produk unggulan</span>' : "";


    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup += `
    <article class="js-product-card">
    ${labelUnggulan}
    <h3>${produk.nama}</h3>

        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">
          ${status.label}
        </span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent =
    `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);
