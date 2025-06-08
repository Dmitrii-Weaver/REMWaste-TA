import React from 'react'
import "./Footer.css"

const calculateFinalPrice = (priceBeforeVat, vatRate) => {
    if (priceBeforeVat === null || priceBeforeVat === undefined) return null;
    return (priceBeforeVat * (1 + vatRate / 100)).toFixed(2);
};

const Footer = ({ selectedSkip }) => {
    if (!selectedSkip) return null;

    const selectedSkipSize = selectedSkip?.size;
    const selectedSkipHirePeriodDays = selectedSkip?.hire_period_days;
    const selectedPriceBeforeVat = selectedSkip?.price_before_vat;
    const selectedVatRate = selectedSkip?.vat;

    const selectedSkipName = selectedSkipSize ? `${selectedSkipSize} Yard Skip` : 'Unknown Skip';
    const selectedFinalPrice = calculateFinalPrice(selectedPriceBeforeVat, selectedVatRate);
    const selectedHirePeriodDisplay = selectedSkipHirePeriodDays ? `${selectedSkipHirePeriodDays} day hire` : 'N/A';

    const currencySymbol = (selectedFinalPrice && parseFloat(selectedFinalPrice) < 300) ? '€' : '£';

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-details">
                    <span className="footer-name">{selectedSkipName}</span>
                    <span className="footer-price">
                        {selectedFinalPrice ? `${currencySymbol} ${selectedFinalPrice}` : 'Price N/A'}
                    </span>
                    <span className="footer-hire-period">
                        {selectedHirePeriodDisplay}
                    </span>
                </div>
                <div className="footer-buttons">
                    <button
                        className="footer-button footer-button-back"
                        onClick={() => console.log('Back button clicked')}
                    >
                        Back
                    </button>
                    <button
                        className="footer-button footer-button-continue"
                        onClick={() => console.log('Continue button clicked', selectedSkip)}
                    >
                        <span>Continue</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer