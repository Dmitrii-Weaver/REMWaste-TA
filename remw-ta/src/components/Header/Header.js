import React from 'react'
import "./Header.css"

export const Header = () => {
    const navItems = [
        { icon: '📦', label: 'Postcode' },
        { icon: '♻️', label: 'Waste Type' },
        { icon: '🗑️', label: 'Select Skip' },
        { icon: '📄', label: 'Permit Check' },
        { icon: '📅', label: 'Choose Date' },
        { icon: '💰', label: 'Payment' },
    ];

    return (
        <header className="header">
            <nav className="header-nav">
                <ul className="header-nav-list">
                    {navItems.map((item, index) => (
                        <li key={index} className={`header-nav-item ${index === 2 ? 'header-nav-item-active' : ''}`}>
                            <span className="header-nav-icon">{item.icon}</span>
                            <span className="header-nav-label">
                                {item.label}
                                {index == navItems.length - 1 ? "" : " -> "}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
