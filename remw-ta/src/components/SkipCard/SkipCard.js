import React from 'react'
import "./SkipCard.css"

const calculateFinalPrice = (priceBeforeVat, vatRate) => {
    if (priceBeforeVat === null || priceBeforeVat === undefined) return null;
    return (priceBeforeVat * (1 + vatRate / 100)).toFixed(2);
};


const SkipCard = ({ skip, isSelected, onSelect }) => {
    const skipSize = skip?.size;
    const skipHirePeriodDays = skip?.hire_period_days;
    const priceBeforeVat = skip?.price_before_vat;
    const vatRate = skip?.vat;

    const skipName = skipSize ? `${skipSize} Yard Skip` : 'Unknown Skip';
    const finalPrice = calculateFinalPrice(priceBeforeVat, vatRate);
    const hirePeriodDisplay = skipHirePeriodDays ? `${skipHirePeriodDays} day hire period` : 'N/A';

    const currencySymbol = (finalPrice && parseFloat(finalPrice) < 300) ? '€' : '£';


    const imageUrl = `https://placehold.co/300x200/F0FDF4/0D9488?text=${skipName.replace(/\s/g, '+')}`;

    return (
        <div
            className={`skip-card ${isSelected ? 'skip-card-selected' : ''}`}
            onClick={() => onSelect(skip)}
        >
            <div className="skip-card-image-container">
                <img
                    src={imageUrl}
                    alt={`${skipName}`}
                    className="skip-card-image"
                    onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://placehold.co/300x200/E0E0E0/333333?text=Image+Not+Found';
                    }}
                />
            </div>


            <div className="skip-card-info-content">


                <h3 className="skip-card-title">{skipName}</h3>
                <p className="skip-card-hire-period">
                    {hirePeriodDisplay}
                </p>
                <div className="skip-card-price">
                    {finalPrice ? `${currencySymbol} ${finalPrice}` : 'Price N/A'}
                </div>


                <div className="skip-card-action-area">
                    {isSelected && (
                        <div className="skip-card-checkmark">
                            ✔
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default SkipCard