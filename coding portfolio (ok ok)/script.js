document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting
    const userId1 = document.getElementById('searchInputLeetcode').value;
    const userId2 = document.getElementById('searchInputGFG').value;

    if (userId1) {
        showLoadingGif(); // Show loading GIF
        fetchLeetCodeStats(userId1);
    } else {
        displayErrorMessage('Please enter a valid LeetCode ID.');
    }

    if (userId2) {
        showLoadingGif2(); // Show loading GIF
        fecthGFGstats(userId2);
    } else {
        displayErrorMessage('Please enter a valid LeetCode ID.');
    }
});
function fetchLeetCodeStats(userId) {
    //   const apiUrl = `https://geeks-for-geeks-api.vercel.app/${userId}`; 
    const apiUrl = `https://leetcode-stats-api.herokuapp.com/${userId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            console.log("before the resposne.json() thing");
            return response.json();
        })
        .then(data => {
            console.log("after the resposne.json() thing");
            hideLoadingGif(); // Hide loading GIF
            displayLeetCodeStats(data);
        })
        .catch(error => {
            hideLoadingGif(); // Hide loading GIF
            displayErrorMessage('Unable to fetch data. Please check the LeetCode ID.');
        });
}
function displayLeetCodeStats(data) {
    const statsList = document.getElementById('statsList');
    statsList.innerHTML = `

        <p><strong>Total Questions Solved: </strong> ${data.totalSolved}</p>
        <p><strong>Easy Questions Solved: </strong> ${data.easySolved}</p>

        <p><strong> Medium Questions Solved: </strong> ${data.mediumSolved}</p>
        <p><strong> Hard Questions Solved: </strong> ${data.hardSolved}</p>
     

    `;
    document.getElementById('error-message').textContent = '';
}

function displayErrorMessage(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('statsList').innerHTML = '';
}

function showLoadingGif() {
    const loadingGif = document.createElement('img');
    loadingGif.src = 'assets/loading.gif'; // Path to your loading GIF
    loadingGif.alt = 'Loading...';
    loadingGif.id = 'loadingGif'; // Give it an ID for easy access
    loadingGif.style.display = 'block'; // Make it visible
    loadingGif.style.margin = '0 auto'; // Center the GIF if needed
    loadingGif.style.width = '100px'; // Set width
    loadingGif.style.height = '100px'; // Set height

    const statsContainer = document.getElementById('statsContainer'); // Container for stats
    statsContainer.appendChild(loadingGif); // Append the loading GIF
}
function hideLoadingGif() {
    const loadingGif = document.getElementById('loadingGif');
    if (loadingGif) {
        loadingGif.remove(); // Remove the GIF from the DOM
    }
}

// gfg starts from here...

async function fecthGFGstats(userId2) {
    const apiUrl = `https://geeks-for-geeks-stats-api.vercel.app/?userName=${userId2}`;
//    showLoadingGif2();
    try {
        // Fetch the image from the API
        const response = await fetch(apiUrl);
        
        // Check if the response is successful
        if (response.ok) {
            // Create an img element to display the image
            hideLoadingGif2();
            hideLoadingGif();
            const imgElement = document.createElement('img');
            imgElement.src = apiUrl; // Set the src to the image URL
            imgElement.alt = "GFG Stats Card nhi ho paya......"; // Alt text for the image
            imgElement.style.width = "100%"; // Adjust the size of the image

            // Append the image to the container
            const container = document.getElementById('statsList2'); 
            container.appendChild(imgElement);
        } else {
            hideLoadingGif2();
            console.error("Failed to fetch GFG Stats Card:", response.status);
        }
    } catch (error) {
        console.error("Error fetching GFG Stats Card:", error);
    }


}

function displayErrorMessage2(message) {
    document.getElementById('error-message2').textContent = message;
    document.getElementById('statsList2').innerHTML = '';
}

// Functions to show and hide loading GIF
function showLoadingGif2() {
    const loadingGif2 = document.createElement('img');
    loadingGif2.src = 'assets/loading.gif'; // Path to your loading GIF
    // loadingGif2.alt = 'Loading...';
    loadingGif2.id = 'loadingGif2'; // Give it an ID for easy access
    loadingGif2.style.display = 'block'; // Make it visible
    loadingGif2.style.margin = '0 auto'; // Center the GIF if needed
    loadingGif2.style.width = '100px'; // Set width
    loadingGif2.style.height = '100px'; // Set height

    const statsContainer2 = document.getElementById('statsContainer-2'); // Container for stats
    statsContainer2.appendChild(loadingGif2); // Append the loading GIF
}

function hideLoadingGif2() {
    const loadinggif= document.getElementById('loadingGif2');
    // if (loadinggif) {
    //     loadinggif.remove(); // Remove the GIF from the DOM
    // }

    loadinggif.classList.add('vanish');
    // loadingGif2.remove();
}
