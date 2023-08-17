import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const entriesPerPage = 9; // Number of entries to display per page
let currentPage = 1; // Initialize the current page to 1

// Firebase configuration (keep it as it is)
const firebaseConfig = {
  apiKey: "AIzaSyCtM_PPj1hmxD0vQBN_Dbmf1dz3s5FZ7KI",
  authDomain: "doces-380a0.firebaseapp.com",
  projectId: "doces-380a0",
  storageBucket: "doces-380a0.appspot.com",
  messagingSenderId: "389035551948",
  appId: "1:389035551948:web:fc325e0b258d93ebb8e669",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to render each entry as a new card in the 'entries' section
const renderEntryCard = (entryDataArray) => {
  // Sort the array by date in descending order (most recent on top)
  entryDataArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Rendering each entry as a new card in the 'entries' section
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const entriesToShow = entryDataArray.slice(startIndex, endIndex);

  document.querySelector(".entries").innerHTML = ""; // Clear previous entries

  entriesToShow.forEach((entryData) => {
    const card = document.createElement("div");
    card.className = "card";

    const imageElement = document.createElement("div");
    imageElement.className = "card-img";

    // Check if entryData.image is empty
    const imageUrl = entryData.image
      ? entryData.image
      : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c45f2463-bf29-439a-983d-b7ecb15282ea/dg3zwsg-255b989f-afe6-4b3d-9314-db929a9f6002.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0NWYyNDYzLWJmMjktNDM5YS05ODNkLWI3ZWNiMTUyODJlYVwvZGczendzZy0yNTViOTg5Zi1hZmU2LTRiM2QtOTMxNC1kYjkyOWE5ZjYwMDIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vP1p-luhySznk8MQz9ZcAmieLjPFfOT-BjQKzG8v7IU";

    imageElement.style.background = `url('${imageUrl}') 50% 50% no-repeat`;
    imageElement.style.backgroundSize = "cover";
    imageElement.style.width = "80px";
    imageElement.style.height = "80px";

    const cardInfo = document.createElement("div");
    cardInfo.className = "card-info";

    const titleDateElement = document.createElement("div");
    titleDateElement.className = "card-title-date";

    const titleElement = document.createElement("h2");
    titleElement.textContent = entryData.title;

    const dateElement = document.createElement("p");
    dateElement.textContent = entryData.date;
    dateElement.style.width = "91px";
    dateElement.style.textAlign = "end";

    const authorElement = document.createElement("div");
    authorElement.className = "card-person";

    const authorNameElement = document.createElement("p");
    authorNameElement.textContent = entryData.author;

    titleDateElement.appendChild(titleElement);
    cardInfo.appendChild(titleDateElement);
    authorElement.appendChild(authorNameElement);
    authorElement.appendChild(dateElement);
    cardInfo.appendChild(authorElement);

    card.appendChild(imageElement);
    card.appendChild(cardInfo);

    document.querySelector(".entries").appendChild(card);
  });
};

// Event listener for "Forward" button
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchEntriesAndRender();
});

// Event listener for "Back" button
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchEntriesAndRender();
  }
});

// Function to fetch entries from Firestore and render the current page
const fetchEntriesAndRender = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "entries"),
      orderBy("date")
    );
    const entryDataArray = [];

    querySnapshot.forEach((doc) => {
      entryDataArray.push(doc.data());
    });

    renderEntryCard(entryDataArray);
  } catch (error) {
    console.error("Error fetching entries: ", error);
  }
};

// Call the fetch and render function when the page loads
window.addEventListener("load", () => {
  fetchEntriesAndRender();
});

// Function to fetch entries from Firestore and render them as cards
const fetchEntriesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "entries"),
      orderBy("date")
    );
    const entryDataArray = []; // Create an empty array to store entry data

    querySnapshot.forEach((doc) => {
      // Push each entry data (doc.data()) into the array
      entryDataArray.push(doc.data());
    });

    // Now you can call the renderEntryCard function with the array of entry data
    renderEntryCard(entryDataArray);
  } catch (error) {
    console.error("Error fetching entries: ", error);
  }
};

// Call the fetch function when the page loads
window.addEventListener("load", () => {
  fetchEntriesFromFirestore();
});
