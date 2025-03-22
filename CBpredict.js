function predictStock() {
    let stockName = document.getElementById("stockSearch").value.toUpperCase();
    if (stockName === "") {
        alert("Please enter a stock symbol!");
        return;
    }

    // Placeholder data (In real case, fetch from API)
    document.getElementById("stock-name").textContent = stockName;
    document.getElementById("stock-price").textContent = "$" + (Math.random() * 1000).toFixed(2);
    
    let sentiments = ["Positive", "Neutral", "Negative"];
    let sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    document.getElementById("sentiment").textContent = sentiment;
}
