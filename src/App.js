import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { auth, generateFCMToken } from './notifications/firebase';
import { OAuthProvider } from 'firebase/auth/web-extension';
import { signInWithPopup } from 'firebase/auth';

function App() {
  
  const handleAppleLogin = async () => {
    try {
      
      const provider = new OAuthProvider('apple.com');

      const result = await signInWithPopup(auth, provider)
      const credential = OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      const user = result.user

      if (result) {
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    generateFCMToken()
  }, [])

  return (
    <div className="App">
      <div onClick={handleAppleLogin}>Sign in with apple</div>
    </div>
  );
}

export default App;
