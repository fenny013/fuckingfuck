(function () {
    if (document.cookie.includes("termsAccepted=true")) return;

    window.addEventListener("DOMContentLoaded", () => {
        const overlay = document.createElement("div");
        overlay.id = "legalOverlay";
        overlay.style.cssText = `
      position:fixed;
      top:0;left:0;width:100%;height:100%;
      background:#000;
      color:#fff;
      z-index:9999;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      text-align:center;
      padding:2em;
      font-family:'Courier New', monospace;
      font-size:16px;
    `;

        overlay.innerHTML = `
      <div style="max-width:600px;">
        <h1 style="margin-bottom:1em;">!!! ВНИМАНИЕ !!!</h1>
        <p>
          Этот сайт содержит вымышленные, сатирические или потенциально запрещённые темы.
          Продолжая, вы подтверждаете, что вам есть 18 лет и вы согласны с
          <a href="/terms.html" target="_blank" style="color:#0ff;">условиями использования</a>.
        </p>
        <button id="acceptTermsBtn" style="
          margin-top:2em;
          padding:0.5em 1em;
          font-family:'Courier New', monospace;
          background:#fff;
          color:#000;
          border:none;
          cursor:pointer;
        ">Мне есть 18 лет, я согласен</button>
      </div>
    `;

        document.body.appendChild(overlay);

        document.getElementById("acceptTermsBtn").onclick = function () {
            document.cookie = "termsAccepted=true; path=/; max-age=31536000";
            overlay.remove();
        };
    });
})();
