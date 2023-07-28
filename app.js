import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

// Function to add a new entry to Firestore
const addEntryToFirestore = async (entryData) => {
  try {
    const docRef = await addDoc(collection(db, "entries"), entryData);
    console.log("Document written with ID: ", docRef.id);
    location.reload();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Event listener for the form submission
document.getElementById("newEntryForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the form data
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const image = document.getElementById("image").value;
  const author = document.getElementById("author").value;

  // Create an object with the entry data
  const entryData = {
    title: title,
    date: date,
    image: image,
    author: author,
  };

  // Add the new entry to Firestore
  addEntryToFirestore(entryData);
});

// Function to render each entry as a new card in the 'entries' section
const renderEntryCard = (entryDataArray) => {
// Sort the array by date in descending order (most recent on top)
  entryDataArray.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Rendering each entry as a new card in the 'entries' section
  entryDataArray.forEach(entryData => {
    const card = document.createElement("div");
    card.className = "card";
  
  const card = document.createElement("div");
  card.className = "card";

  const imageElement = document.createElement("div");
  imageElement.className = "card-img";
  imageElement.style.background = `url('${entryData.image}') 50% 50% no-repeat`;
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
  titleDateElement.appendChild(dateElement);
  cardInfo.appendChild(titleDateElement);
  authorElement.appendChild(authorNameElement);
  cardInfo.appendChild(authorElement);

  card.appendChild(imageElement);
  card.appendChild(cardInfo);

  document.querySelector(".entries").appendChild(card);
};

// Function to fetch entries from Firestore and render them as cards
const fetchEntriesFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "entries"), orderBy("date"));
    querySnapshot.forEach((doc) => {
      renderEntryCard(doc.data());
    });
  } catch (error) {
    console.error("Error fetching entries: ", error);
  }
};

// Call the fetch function when the page loads
window.addEventListener("load", () => {
  fetchEntriesFromFirestore();
});
