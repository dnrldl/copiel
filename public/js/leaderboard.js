const categorySelect = document.getElementById('category');
const gametypeSelect = document.getElementById('gametype');
const button = document.getElementById('leaderboard-btn');

var selectedCategory = '';
var selectedGametype = '';

async function getData() {
  try {
    const res = await fetch('/getUserScore', {
      method: 'POST',
      body: JSON.stringify({
        category: selectedCategory,
        gametype: selectedGametype,
      }),
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
  .then(response => response.json())
  .then(data => {
    data.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  });

categorySelect.addEventListener('change', function () {
  selectedCategory = categorySelect.value;

  if (selectedCategory == '' || selectedGametype == '') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});
gametypeSelect.addEventListener('change', function () {
  selectedGametype = gametypeSelect.value;

  if (selectedCategory == '' || selectedGametype == '') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});
if (selectedCategory == '' || selectedGametype == '') {
  button.disabled = true;
} else {
  button.disabled = false;
}

button.addEventListener('click', function () {
  populateLeaderboard(selectedCategory, selectedGametype);
});

// Function to populate the leaderboard
async function populateLeaderboard(selectedCategory, selectedGametype) {
  var leaderboardBody = document.getElementById('leaderboardBody');
  var leaderboardData = '';

  leaderboardData = await getData();

  var userScoreName = selectedGametype + 'score' + selectedCategory;

  // Clear existing content
  leaderboardBody.innerHTML = '';

  // Add rows to the table
  leaderboardData.forEach((player, i) => {
    const row = document.createElement('tr');
    row.innerHTML = '';
    if (player[userScoreName] == 0) return;
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${player.username}</td>
      <td>${player[userScoreName]}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}
