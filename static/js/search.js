document.addEventListener("DOMContentLoaded", function () {
    const stockInput = document.getElementById("stockInput");
    const resultsDiv = document.getElementById("results");

    stockInput.addEventListener("input", async function () {
        let query = stockInput.value.trim();

        if (query.length < 2) {
            resultsDiv.style.display = "none";
            return;
        }

        try {
            let response = await fetch(`/search-stock/?query=${query}`); // ✅ Ensure this matches Django's URL
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            let data = await response.json();
            resultsDiv.innerHTML = ""; // Clear previous results

            if (data.stocks && data.stocks.length > 0) {
                data.stocks.forEach(stock => {
                    let item = document.createElement("div");
                    item.classList.add("result-item");
                    item.innerHTML = `${stock.name} (${stock.symbol}) - <span class="price">$${stock.price}</span>`;

                    // Fill input field when clicked
                    item.addEventListener("click", () => {
                        stockInput.value = stock.name;
                        resultsDiv.style.display = "none";
                    });

                    resultsDiv.appendChild(item);
                });

                resultsDiv.style.display = "block";
            } else {
                resultsDiv.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
            resultsDiv.style.display = "none";
        }
    });

    // Hide results when clicking outside
    document.addEventListener("click", function (e) {
        if (!stockInput.contains(e.target) && !resultsDiv.contains(e.target)) {
            resultsDiv.style.display = "none";
        }
    });
});
