const categorySelect = document.getElementById('category');

var selectedCategory;

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

const categoryJsonFilePath = '../categories/categories.json';

fetch(categoryJsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    data.categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });

categorySelect.addEventListener('change', function () {
  selectedCategory = categorySelect.value;

  populateLeaderboard(selectedCategory);
});

// Function to populate the leaderboard
async function populateLeaderboard(selectedCategory) {
  const leaderboardBody = document.getElementById('leaderboardBody');
  const leaderboardData = await getData();

  var userScoreName = 'score' + selectedCategory;

  // Clear existing content
  leaderboardBody.innerHTML = '';

  // Add rows to the table
  leaderboardData.forEach((player, i) => {
    const row = document.createElement('tr');
    if (player[userScoreName] == 0) return;
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${player.username}</td>
      <td>${player[userScoreName]}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}
