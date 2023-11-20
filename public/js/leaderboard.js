async function getData() {
  try {
    const res = await fetch('/getUserScore', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return data.leaderboardData;
  } catch (err) {
    console.log(err);
  }
}

// Function to populate the leaderboard
async function populateLeaderboard() {
  const leaderboardBody = document.getElementById('leaderboardBody');
  const leaderboardData = await getData();

  // Clear existing content
  leaderboardBody.innerHTML = '';

  // Add rows to the table
  leaderboardData.forEach((player, i) => {
    const row = document.createElement('tr');
    if (player.score == 0) return;
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${player.username}</td>
      <td>${player.score}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

// Call the function to initially populate the leaderboard
populateLeaderboard();
