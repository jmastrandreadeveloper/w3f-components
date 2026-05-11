import React, { useState, useRef } from 'react';

const MenuItem = ({ item, onClose, onSelect }) => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const timeoutRef = useRef(null);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowSubmenu(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setShowSubmenu(false), 200);
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Evita el cierre accidental de niveles superiores
        if (hasSubItems) {
            setShowSubmenu(!showSubmenu);
        } else {
            if (onSelect) onSelect(item.label);
            onClose();
        }
    };

    return (
        <div
            className={`w3f-nested-menu-item ${showSubmenu ? 'is-active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative' }}
        >
            <button
                className={`w3f-nested-menu-button ${hasSubItems ? 'w3f-nested-menu-button-parent' : 'w3f-nested-menu-button-leaf'}`}
                onClick={handleClick}
            >
                <span className="w3f-nested-menu-label">{item.label}</span>
                {hasSubItems && <span className="w3f-nested-menu-arrow">▸</span>}
            </button>

            {hasSubItems && showSubmenu && (
                <div
                    className="w3f-nested-menu-submenu"
                    style={{ display: 'block', position: 'absolute', left: '100%', top: 0, overflow: 'visible' }}
                >
                    {item.subItems.map((subItem, index) => (
                        <MenuItem key={index} item={subItem} onClose={onClose} onSelect={onSelect} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;