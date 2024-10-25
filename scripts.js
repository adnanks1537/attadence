document.addEventListener('DOMContentLoaded', () => {
    // Initialize Chart for attendance (existing code)
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const attendanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Attendance %',
                data: [80, 85, 90, 75, 95, 100],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Fetch cadet data on load
    fetchCadetData();
});

// Function to switch between sections
function showSection(sectionId) {
    document.getElementById('attendanceSection').style.display = 'none';
    document.getElementById('cadetsSection').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// Fetch cadet data from API and populate the table
async function fetchCadetData() {
    try {
        const response = await axios.get('https://attadence.onrender.com/api/cadets');  // Updated API endpoint
        const cadets = response.data;

        // Check if cadets data is an array and not empty
        if (!Array.isArray(cadets) || cadets.length === 0) {
            console.error("No cadet data found or response is not an array.");
            return;
        }

        const tableBody = document.getElementById('cadetsTableBody');
        tableBody.innerHTML = ''; // Clear any existing data

        cadets.forEach(cadet => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cadet.cadetID}</td>
                <td>${cadet.name}</td>
                <td>${cadet.rank}</td>
                <td>${cadet.year}</td>
                <td><button class="btn btn-attendance" onclick="markAttendance('${cadet.cadetID}')">Mark</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Initialize DataTables for interactivity after populating data
        $('#cadetsTable').DataTable();
    } catch (error) {
        console.error("Error fetching cadet data:", error);
    }
}

// Logout Function
function logout() {
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to login page
}

// Mark Attendance Function
async function markAttendance(cadetID) {
    try {
        await axios.post('https://attadence.onrender.com/api/attendance/mark', { cadetID });  // Updated API endpoint
        alert(`Attendance marked for Cadet ID: ${cadetID}`);
    } catch (error) {
        console.error("Error marking attendance:", error);
    }
}
