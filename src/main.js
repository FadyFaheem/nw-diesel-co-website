import "./style.css";

document.querySelector("#app").innerHTML = `
  <div class="coming-soon-container">
    <div class="content">
      <div class="logo-section">
        <h1 class="company-name">Northwestern Diesel</h1>
        <div class="divider"></div>
      </div>
      
      <h2 class="coming-soon-title">Coming Soon</h2>
      <p class="subtitle">We're revving up something powerful. Our new website is under construction.</p>
      
      <div class="info-section">
        <div class="info-item">
          <svg class="icon icon-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>info@northwesterndiesel.com</span>
        </div>
        <div class="info-item">
          <svg class="icon icon-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>(682) 540-4507</span>
        </div>
      </div>
    </div>
    
    <div class="background-pattern"></div>
  </div>
`;
