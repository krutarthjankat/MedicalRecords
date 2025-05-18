import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  // Statistics cards data
  const stats = [
    { title: "Total Patients", value: "1,248", change: "+12%", trend: "up" },
    { title: "New Admissions", value: "84", change: "+5%", trend: "up" },
    { title: "Avg. Stay (days)", value: "4.2", change: "-0.3", trend: "down" },
    { title: "Occupancy Rate", value: "78%", change: "+2%", trend: "up" },
  ];

  // Line chart data - Patient Visits
  const visitsChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Outpatient Visits",
        data: [
          1200, 1900, 1500, 2000, 1800, 2100, 2400, 2200, 2300, 2500, 2700,
          3000,
        ],
        borderColor: "#3b82f6", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Inpatient Admissions",
        data: [400, 500, 450, 600, 550, 650, 700, 680, 720, 750, 800, 850],
        borderColor: "#10b981", // emerald-500
        backgroundColor: "rgba(16, 185, 129, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Pie chart data - Patient Status
  const statusChartData = {
    labels: ["Undetermined", "Good", "Fair", "Serious", "Critical", "Deceased"],
    datasets: [
      {
        data: [15, 30, 5, 15, 10, 25],
        backgroundColor: [
          "#9ca3af", // gray-400 - Undetermined
          "#22c55e", // green-500 - Good
          "#a3e635", // lime-400 - Fair
          "#f97316", // orange-500 - Serious
          "#ef4444", // red-500 - Critical
          "#000000", // black - Deceased
        ],
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    ],
  };

  // Bar chart data - Department Statistics
  const departmentChartData = {
    labels: [
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Oncology",
      "Orthopedics",
    ],
    datasets: [
      {
        label: "Current Patients",
        data: [120, 85, 150, 70, 90],
        backgroundColor: "rgba(99, 102, 241, 0.7)", // indigo-500
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
      {
        label: "Avg. Stay (days)",
        data: [5.2, 6.5, 3.2, 8.1, 4.7],
        backgroundColor: "rgba(244, 114, 182, 0.7)", // pink-400
        borderColor: "rgba(244, 114, 182, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart data - Age Distribution
  const ageChartData = {
    labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
    datasets: [
      {
        data: [15, 25, 30, 20, 10],
        backgroundColor: [
          "#6366f1", // indigo-500
          "#8b5cf6", // violet-500
          "#ec4899", // pink-500
          "#f97316", // orange-500
          "#f59e0b", // amber-500
        ],
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    ],
  };

  // Common chart options with dark mode classes
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "text-gray-700 dark:text-gray-300",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "text-gray-700 dark:text-gray-300",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "text-gray-700 dark:text-gray-300",
        },
      },
      title: {
        display: true,
        color: "text-gray-800 dark:text-white",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Medical Records Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
          >
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </h3>
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-semibold text-gray-800 dark:text-white">
                {stat.value}
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Patient Visits Line Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Monthly Patient Visits
          </h2>
          <div className="h-80">
            <Line
              data={visitsChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Monthly Patient Visits",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Patient Status Pie Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Patient Status Distribution
          </h2>
          <div className="h-80">
            <Pie
              data={statusChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Patient Status Distribution",
                  },
                  legend: {
                    position: "right",
                    labels: {
                      color: "text-gray-700 dark:text-gray-300",
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Statistics Bar Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Department Statistics
          </h2>
          <div className="h-80">
            <Bar
              data={departmentChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Department Statistics",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Age Distribution Doughnut Chart */}
        <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Patient Age Distribution
          </h2>
          <div className="h-80">
            <Doughnut
              data={ageChartData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Patient Age Distribution",
                  },
                  legend: {
                    position: "right",
                    labels: {
                      color: "text-gray-700 dark:text-gray-300",
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
