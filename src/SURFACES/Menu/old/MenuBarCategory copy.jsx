import React, { useState, useRef, useEffect } from 'react';
import MenuItem from '../MenuItem';

const MenuBarCategory = ({ label, items, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="w3f-nested-menu-container" ref={containerRef}>
            <button
                className={`w3f-nested-menu-trigger ${isOpen ? 'is-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                style={{ border: 'none', background: 'transparent', color: 'white', cursor: 'pointer' }}
            >
                {label}
            </button>

            {isOpen && (
                <div className="w3f-nested-menu-dropdown" style={{ display: 'block', overflow: 'visible' }}>
                    {items.map((item, index) => (
                        <MenuItem
                            key={index}
                            item={item}
                            onClose={() => setIsOpen(false)}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuBarCategory;