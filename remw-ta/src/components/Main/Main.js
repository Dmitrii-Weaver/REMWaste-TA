import React, { useEffect, useState } from 'react'
import "./Main.css"
import SkipCard from '../SkipCard/SkipCard';
import Footer from '../Footer/Footer';

const Main = () => {
    const [skips, setSkips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSkip, setSelectedSkip] = useState(null); 

    useEffect(() => {
        
        const fetchSkips = async () => {
          try {
            setLoading(true);
            setError(null);
            const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            let fetchedSkips = [];
            if (data && Array.isArray(data.skips)) {
              fetchedSkips = data.skips;
            } else if (Array.isArray(data)) {
              fetchedSkips = data;
            } else {
              console.warn("API response did not contain an expected array of skips:", data);
              setError("Received unexpected data format from API. Please try again.");
              setSkips([]);
              setLoading(false);
              return;
            }
            setSkips(fetchedSkips);
          } catch (e) {
            console.error("Failed to fetch skips:", e);
            setError("Failed to load skip data. Please check your network connection or try again later.");
          } finally {
            setLoading(false);
          }
        };
        fetchSkips();  
    }, []); 

    const handleSelectSkip = (skip) => {
        setSelectedSkip(skip);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading skips...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <main className="main-content">
            <div className="main-container">
                <h2 className="main-title">Choose Your Skip Size</h2>
                <br></br>

                <div className="skip-grid">
                    {skips.map((skip) => (
                        <SkipCard
                            key={skip.id} 
                            skip={skip}
                            isSelected={selectedSkip && selectedSkip.id === skip.id} 
                            onSelect={handleSelectSkip}
                        />
                    ))}
                </div>
            </div>
            <Footer selectedSkip={selectedSkip} />
        </main>
    );
};

export default Main