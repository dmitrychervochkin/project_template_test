import './header.style.scss';
import { Icon } from '../icon/icon';
import { useState } from 'react';

export function Header (){
    const [currentBtn, setCurrentBtn] = useState<'viewing' | 'management'>('viewing');

    function onNavMenuClicked(event: React.MouseEvent<HTMLButtonElement>) {
        const targetId = event.currentTarget.id as 'viewing' | 'management';
        setCurrentBtn(targetId);
    }

    return (
        <div className="header-container">
            <Icon source='nav-menu-icon.png' alt='Меню' />
            <Icon source='menu-return.png' alt='Назад' />
            <div className='header-btns'>
                <button 
                    onClick={onNavMenuClicked} 
                    id='viewing' 
                    className={`header-btn ${currentBtn === 'viewing' ? 'current-nav-btn' : ''}`}
                >
                    Просмотр
                </button>
                <button 
                    onClick={onNavMenuClicked} 
                    id='management' 
                    className={`header-btn ${currentBtn === 'management' ? 'current-nav-btn' : ''}`}
                >
                    Управление
                </button>
            </div>
        </div>
    );
}
