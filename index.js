const COHORT = "JoeWallace-Demo";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

async function fetchParties() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error fetching parties');
    const data = await response.json();
    renderParties(data);
  } catch (error) {
    console.error('Error fetching parties:', error);
    alert('Failed to fetch parties. Please try again later.');
  }
}

async function addParty(party) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(party),
    });

    if (!response.ok) {
      throw new Error('Error adding party');
    }

    await fetchParties();
  } catch (error) {
    console.error('Error adding party:', error);
    alert('Failed to add the party. Please try again.');
  }
}

async function deleteParty(partyId) {
  try {
    const response = await fetch(`${API_URL}/${partyId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting party');
    }

    await fetchParties();
  } catch (error) {
    console.error('Error deleting party:', error);
    alert('Failed to delete the party. Please try again.');
  }
}

function renderParties(parties) {
  const partyList = document.getElementById('party-list');
  partyList.innerHTML = ''; 

  parties.forEach(party => {
    const partyItem = document.createElement('li');
    partyItem.innerHTML = `
      <h3>${party.name}</h3>
      <p><strong>Date:</strong> ${party.date}</p>
      <p><strong>Time:</strong> ${party.time}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p><strong>Description:</strong> ${party.description}</p>
      <button class="delete-btn" data-id="${party.id}">Delete</button>
    `;

    partyList.appendChild(partyItem);
  });
}

document.getElementById('party-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const partyId = event.target.getAttribute('data-id');
    deleteParty(partyId);
  }
});


document.getElementById('add-party-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const date = event.target.date.value;
  const time = event.target.time.value;
  const location = event.target.location.value;
  const description = event.target.description.value;

 
  const newParty = {
    name,
    date,
    time,
    location,
    description,
  };


  await addParty(newParty);

 
  event.target.reset();
});

fetchParties();