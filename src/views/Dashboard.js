import React, { useState, useEffect } from "react";
import { Bar, Line, Scatter } from "react-chartjs-2";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/prod");
      setProducts(result.data);
    };
    fetchData();
  }, []);

  const productNames = products.map((item) => item.productname);
  const sales = products.map((item) => parseFloat(item.sales));
  const quantities = products.map((item) => parseInt(item.quantity));
  const prices = products.map((item) => parseFloat(item.price));

  const lineChartData = {
    labels: productNames,
    datasets: [
      {
        label: "Sales",
        borderColor: "#FFFFFF",
        pointBorderColor: "#FFFFFF",
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: "#FFFFFF",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        data: sales,
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: "Medicines",
        data: products.map((item) => ({
          x: parseInt(item.sales), // Use item.sales for x-axis (assuming sales corresponds to quantity)
          y: parseFloat(item.price), // Use item.price for y-axis (assuming price remains the same)
        })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };  

  const barChartQuantitiesData = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "black",
        borderWidth: 2,
        data: quantities,
      },
    ],
  };

  const barChartPricesData = {
    labels: productNames,
    datasets: [
      {
        label: "Price",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "black",
        borderWidth: 2,
        data: prices,
      },
    ],
  };

  return (
    <div>
      <div className="content" style={{ background: "black", paddingTop: "100px", height: "101vh" }}>
        <div className="container-fluid">
          <h2 style={{ color: "#FFF" }}>Sales by Product</h2>
          <Line
            data={lineChartData}
            options={{
              scales: {
                y: {
                  ticks: {
                    color: "#FFF",
                  },
                  grid: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: "#FFF",
                  },
                },
              },
            }}
          />
          
          <div className="d-flex justify-content-between">
            <div style={{ width: "33%" }}>
            <h2 style={{ color: "black", marginTop: "40px" }}>Medicine Sales and Price</h2>
              <Scatter
                data={scatterChartData}
                options={{
                  scales: {
                    x: {
                      type: "linear",
                      position: "bottom",
                      ticks: {
                        color: "black",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                    y: {
                      ticks: {
                        color: "black",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "black",
                      },
                    },
                  },
                }}
              />
            </div>
            <div style={{ width: "33%" }}>
              <h3 style={{ color: "black", marginTop: "40px" }}>Quantity by Product</h3>
              <Bar
                data={barChartQuantitiesData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        color: "black",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "#FFF",
                      },
                    },
                  },
                }}
              />
            </div>
            <div style={{ width: "33%" }}>
              <h2 style={{ color: "black", marginTop: "40px"}}>Prices by Product</h2>
              <Bar
                data={barChartPricesData}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        color: "black",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: "black",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
