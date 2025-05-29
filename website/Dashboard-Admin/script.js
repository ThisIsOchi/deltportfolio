// script.js
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const overlay = document.getElementById("overlay");
    const navLinks = document.querySelectorAll(".nav-link");
    const contentSections = document.querySelectorAll(".content-section");
    const themeToggle = document.getElementById("themeToggle");
    const notifBtn = document.getElementById("notifBtn");
    const settingsForm = document.getElementById("settingsForm");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const logoutBtn = document.getElementById("logoutBtn");
  
    // Initialize theme
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);
  
    // Toggle sidebar
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      toggleBtn.classList.toggle("open");
      overlay.classList.toggle("active");
    });
  
    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      toggleBtn.classList.remove("open");
      overlay.classList.remove("active");
    });
  
    // Navigation between sections
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove("active"));
        contentSections.forEach(sec => sec.classList.remove("active"));
  
        // Add active class to clicked link and corresponding section
        link.classList.add("active");
        const target = link.getAttribute("data-section");
        document.getElementById(target).classList.add("active");
  
        // Close sidebar on mobile after selection
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active");
          toggleBtn.classList.remove("open");
          overlay.classList.remove("active");
        }
      });
    });
  
    // Theme toggle functionality
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
      
      showToast(`Mode ${newTheme === "dark" ? "gelap" : "terang"} diaktifkan`);
    });
  
    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector("i");
      if (theme === "dark") {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }
  
    // Notification dropdown toggle
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelector(".notif-dropdown").classList.toggle("show");
    });
  
    // Close notification dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".notifications")) {
        document.querySelector(".notif-dropdown").classList.remove("show");
      }
    });
  
    // Mark notifications as read
    document.querySelector(".mark-read").addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".notif-item.unread").forEach(item => {
        item.classList.remove("unread");
      });
      document.querySelector(".badge").style.display = "none";
      showToast("Notifikasi ditandai sudah dibaca");
    });
  
    // Settings form submission
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showLoading();
      
      // Simulate form submission
      setTimeout(() => {
        hideLoading();
        showToast("Pengaturan berhasil disimpan", "success");
      }, 1500);
    });
  
    // Logout button
    logoutBtn.addEventListener("click", () => {
      showLoading();
      
      // Simulate logout process
      setTimeout(() => {
        hideLoading();
        showToast("Anda berhasil logout", "success");
        // In a real app, you would redirect to login page
      }, 1000);
    });
  
    // Table sorting functionality
    document.querySelectorAll("th").forEach(header => {
      if (header.querySelector("i")) {
        header.addEventListener("click", () => {
          const table = header.closest("table");
          const columnIndex = Array.from(header.parentNode.children).indexOf(header);
          const rows = Array.from(table.querySelectorAll("tbody tr"));
          const isAscending = header.classList.contains("asc");
          
          // Reset all headers
          table.querySelectorAll("th").forEach(th => {
            th.classList.remove("asc", "desc");
          });
          
          // Sort rows
          rows.sort((a, b) => {
            const aText = a.children[columnIndex].textContent.trim();
            const bText = b.children[columnIndex].textContent.trim();
            
            if (columnIndex === 3) { // Date column
              return isAscending 
                ? new Date(aText) - new Date(bText)
                : new Date(bText) - new Date(aText);
            } else {
              return isAscending 
                ? aText.localeCompare(bText)
                : bText.localeCompare(aText);
            }
          });
          
          // Toggle sort direction
          header.classList.add(isAscending ? "desc" : "asc");
          
          // Rebuild table
          const tbody = table.querySelector("tbody");
          tbody.innerHTML = "";
          rows.forEach(row => tbody.appendChild(row));
        });
      }
    });
  
    // Chart initialization with multiple datasets
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartData = {
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Pengguna Baru',
            data: [15, 22, 18, 25, 30, 28, 35, 40, 32, 38, 42, 50],
            borderColor: 'rgb(52, 152, 219)',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Transaksi',
            data: [120, 150, 110, 180, 200, 190, 220, 250, 210, 230, 240, 300],
            borderColor: 'rgb(46, 204, 113)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      quarterly: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Pengguna Baru',
            data: [55, 83, 107, 130],
            borderColor: 'rgb(52, 152, 219)',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Transaksi',
            data: [380, 570, 680, 770],
            borderColor: 'rgb(46, 204, 113)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      yearly: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Pengguna Baru',
            data: [280, 350, 420, 500, 600],
            borderColor: 'rgb(52, 152, 219)',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'Transaksi',
            data: [1800, 2200, 2600, 3200, 4000],
            borderColor: 'rgb(46, 204, 113)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      }
    };
  
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData.monthly,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  
    // Chart period toggle
    document.querySelectorAll(".chart-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".chart-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const period = btn.getAttribute("data-period");
        myChart.data = chartData[period === "month" ? "monthly" : period === "quarter" ? "quarterly" : "yearly"];
        myChart.update();
      });
    });
  
    // Show toast notification
    function showToast(message, type = "info") {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-times-circle" : "fa-info-circle"}"></i>
        <span>${message}</span>
      `;
      
      document.getElementById("notification-toast").appendChild(toast);
      
      setTimeout(() => {
        toast.style.animation = "fadeOut 0.2s ease forwards";
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  
    // Show loading overlay
    function showLoading() {
      loadingOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  
    // Hide loading overlay
    function hideLoading() {
      loadingOverlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  
    // Simulate initial loading
    showLoading();
    setTimeout(hideLoading, 1000);
  });