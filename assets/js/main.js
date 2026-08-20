(function () {
  "use strict";

  // Discord raw .zip indirme bağlantınızı buraya yapıştırın.
  var DOWNLOAD_URL = "https://cdn.discordapp.com/attachments/1535427832350769212/1540055942253781032/Elbit_Surum_3.0.zip?ex=6a88905d&is=6a873edd&hm=1e972182afc603fc819a41e9c887c87f9eaa1a12ef4d2258935f4b9386c23f10&";

  var bgParallax = document.getElementById("bgParallax");
  var glowOuter = document.getElementById("glowOuter");

  // Çok hafif parallax (fare hareketine göre yumuşak kayma, spring benzeri easing)
  var mx = 0,
    my = 0,
    sx = 0,
    sy = 0;

  window.addEventListener("mousemove", function (e) {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  });

  function tick() {
    sx += (mx - sx) * 0.08;
    sy += (my - sy) * 0.08;

    var bgX = sx * 14;
    var bgY = sy * 14;
    var glowX = -sx * 26;
    var glowY = -sy * 26;

    bgParallax.style.transform = "translate(" + bgX.toFixed(2) + "px, " + bgY.toFixed(2) + "px)";
    glowOuter.style.transform =
      "translate(-50%, -50%) translate(" + glowX.toFixed(2) + "px, " + glowY.toFixed(2) + "px)";

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // İndirme butonu
  var downloadBtn = document.getElementById("downloadBtn");
  var downloadTitle = document.getElementById("downloadTitle");
  var downloadSub = document.getElementById("downloadSub");
  var iconCloud = downloadBtn.querySelector(".icon-cloud");
  var iconLoader = downloadBtn.querySelector(".icon-loader");

  var loading = false;
  var loadingTimer = null;

  downloadBtn.setAttribute("href", DOWNLOAD_URL);

  downloadBtn.addEventListener("click", function (e) {
    // Tarayıcı, tıklama anında href'e geçiş yapıp "Hazırlanıyor" animasyonunu
    // yarıda kesmesin diye önce her zaman engelleniyor; asıl gidiş animasyon
    // bittikten sonra tetikleniyor.
    e.preventDefault();
    if (loading) {
      return;
    }
    loading = true;
    downloadBtn.classList.add("is-loading");
    downloadBtn.setAttribute("aria-busy", "true");
    iconCloud.classList.add("is-hidden");
    iconLoader.classList.remove("is-hidden");
    downloadTitle.textContent = "Hazırlanıyor...";
    downloadSub.textContent = "Dosya hazırlanıyor";

    loadingTimer = window.setTimeout(function () {
      loading = false;
      downloadBtn.classList.remove("is-loading");
      downloadBtn.setAttribute("aria-busy", "false");
      iconCloud.classList.remove("is-hidden");
      iconLoader.classList.add("is-hidden");
      downloadTitle.textContent = "Hemen İndir";
      downloadSub.textContent = "Full Client (.zip)";
      window.location.href = DOWNLOAD_URL;
    }, 2600);
  });
})();
