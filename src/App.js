import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { auth, generateFCMToken } from './notifications/firebase';
import { OAuthProvider } from 'firebase/auth';
import { signInWithRedirect, getRedirectResult, signInWithCredential, signInWithPopup, } from 'firebase/auth';

function App() {
  
  const handleAppleLogin = async () => {
    try {      
      // Initialize the Apple provider
      const provider = new OAuthProvider('apple.com');

      // Add scopes if needed
      provider.addScope('email');
      provider.addScope('name');

      const result = await signInWithPopup(auth, provider)
      const credential = OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    generateFCMToken()
  }, [])

  return (
    <div className="App">
      <button type='button' onClick={handleAppleLogin}>Sign in with apple</button>
    </div>
  );
}

export default App;
