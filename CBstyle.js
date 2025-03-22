document.addEventListener("DOMContentLoaded", function () {
    
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // Stock Ticker Data
    async function fetchStockTicker() {
        const stocks = ["AAPL", "GOOGL", "AMZN"];
        const prices = await Promise.all(
            stocks.map(symbol => fetch(`https://api.example.com/${symbol}`).then(res => res.json()))
        );
        document.getElementById("ticker").textContent = prices.map(p => `${p.symbol}: ${p.price}`).join(" | ");
    }
    fetchStockTicker();

    // Tab Switching
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Fetch News
    async function fetchNews() {
        const response = await fetch("https://api.example.com/news");
        const data = await response.json();
        document.getElementById("news-container").innerHTML = data.map(news => `<p>${news.title}</p>`).join("");
    }
    fetchNews();

});
