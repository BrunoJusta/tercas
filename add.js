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
    window.location.href = "index.html";
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
