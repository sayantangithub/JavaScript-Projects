const API_BASE_URL = "https://stocksapi-uhe1.onrender.com/api/stocks";
const STOCKS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "PYPL",
  "TSLA",
  "JPM",
  "NVDA",
  "NFLX",
  "DIS",
];
let currentStock = STOCKS[0];
let currentRange = "5y";

async function fetchAndCreateChart(range = "5y", symbol = "AAPL") {
  const url = `${API_BASE_URL}/getstocksdata`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    const chartData = result.stocksData[0][symbol][range].value;
    const labels = result.stocksData[0][symbol][range].timeStamp.map(
      (timestamp) => new Date(timestamp * 1000).toLocaleDateString()
    );

    drawChart(chartData, labels, symbol);
    updateStockDetails(symbol);
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
}

async function updateStockDetails(symbol) {
  try {
    const [profileData, statsData] = await Promise.all([
      fetch(`${API_BASE_URL}/getstocksprofiledata`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/getstockstatsdata`).then((res) => res.json()),
    ]);

    const summary = profileData.stocksProfileData[0][symbol].summary;
    const { bookValue, profit } = statsData.stocksStatsData[0][symbol];

    document.getElementById("name").textContent = symbol;
    document.getElementById("profit").textContent = `${profit}%`;
    document.getElementById("profit").style.color =
      profit > 0 ? "green" : "red";
    document.getElementById("bookValue").textContent = `$${bookValue}`;
    document.getElementById("summaryText").textContent = summary;
  } catch (error) {
    console.error("Error updating stock details:", error);
  }
}

async function renderStockList() {
  const stockListContainer = document.getElementById("stock-list");

  try {
    const [profileData, statsData] = await Promise.all([
      fetch(`${API_BASE_URL}/getstocksprofiledata`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/getstockstatsdata`).then((res) => res.json()),
    ]);

    STOCKS.forEach((stock) => {
      const profit = statsData.stocksStatsData[0][stock].profit;
      const bookValue = statsData.stocksStatsData[0][stock].bookValue;
      const profitColor = profit > 0 ? "green" : "red";
      const stockElement = document.createElement("div");
      stockElement.className = "stock-item";
      stockElement.innerHTML = `
                <div class="stock-name" style="color: white;">${stock}</div>
                <div>$${bookValue} <span style="font-size: 0.8em; color: ${profitColor};">${profit}%</span></div>`;
      stockElement
        .querySelector(".stock-name")
        .addEventListener("click", () => {
          currentStock = stock;
          fetchAndCreateChart(currentRange, currentStock);
        });
      stockListContainer.appendChild(stockElement);
    });
  } catch (error) {
    console.error("Error fetching stock list data:", error);
  }
}

function drawChart(data, labels, stockName) {
  const canvas = document.getElementById("chartCanvas");
  const ctx = canvas.getContext("2d");
  const chartHeight = canvas.height - 40;
  const chartWidth = canvas.width - 60;
  const dataMax = Math.max(...data);
  const dataMin = Math.min(...data);
  const dataRange = dataMax - dataMin;
  const dataStep = dataRange > 0 ? chartHeight / dataRange : 0;
  const stepX = chartWidth / (data.length - 1);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, chartHeight - (data[0] - dataMin) * dataStep);
  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(i * stepX, chartHeight - (data[i] - dataMin) * dataStep);
  }
  ctx.strokeStyle = "#39FF14";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([2, 2]);
  const zeroY = chartHeight - (0 - dataMin) * dataStep;
  ctx.moveTo(0, zeroY);
  ctx.lineTo(canvas.width, zeroY);
  ctx.strokeStyle = "#ccc";
  ctx.stroke();
  ctx.setLineDash([]);

  const tooltip = document.getElementById("tooltip");
  const xAxisLabel = document.getElementById("xAxisLabel");

  canvas.addEventListener("mousemove", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const dataIndex = Math.min(Math.floor(x / stepX), data.length - 1);
    const dataValue = data[dataIndex];
    const label = labels[dataIndex];

    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y - 30}px`;
    tooltip.style.display = "block";
    tooltip.innerHTML = `<strong>${label}</strong><br>${stockName}: $${dataValue.toFixed(
      2
    )}`;

    xAxisLabel.style.left = `${x}px`;
    xAxisLabel.style.display = "block";
    xAxisLabel.textContent = label;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, chartHeight - (data[0] - dataMin) * dataStep);
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(i * stepX, chartHeight - (data[i] - dataMin) * dataStep);
    }
    ctx.strokeStyle = "#39FF14";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([2, 2]);
    ctx.moveTo(0, zeroY);
    ctx.lineTo(canvas.width, zeroY);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(dataIndex * stepX, chartHeight);
    ctx.lineTo(dataIndex * stepX, 0);
    ctx.strokeStyle = "#888";
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(
      dataIndex * stepX,
      chartHeight - (data[dataIndex] - dataMin) * dataStep,
      5,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#39FF14";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
    xAxisLabel.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn1d").addEventListener("click", () => {
    currentRange = "1mo";
    fetchAndCreateChart(currentRange, currentStock);
  });

  document.getElementById("btn1mo").addEventListener("click", () => {
    currentRange = "3mo";
    fetchAndCreateChart(currentRange, currentStock);
  });

  document.getElementById("btn1y").addEventListener("click", () => {
    currentRange = "1y";
    fetchAndCreateChart(currentRange, currentStock);
  });

  document.getElementById("btn5y").addEventListener("click", () => {
    currentRange = "5y";
    fetchAndCreateChart(currentRange, currentStock);
  });

  renderStockList();
  fetchAndCreateChart();
});
