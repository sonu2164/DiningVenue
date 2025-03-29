import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBL0gwDZBDlAo0cBzj886IvySkSyJ6ij-4",
    authDomain: "diningvenue-ebce1.firebaseapp.com",
    projectId: "diningvenue-ebce1",
    storageBucket: "diningvenue-ebce1.firebasestorage.app",
    messagingSenderId: "208317989241",
    appId: "1:208317989241:web:cd273ffbdd3f8076c42fa8",
    measurementId: "G-Q12DX6R2FX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };