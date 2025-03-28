import { useState } from 'react';
import { Icon } from '../icon/icon';
import './menu.style.scss';

const initialProjects = [
    {id: 1, name: 'По проекту'},
    {id: 2, name: 'Объекты'},
    {id: 3, name: 'РД'},
    {id: 4, name: 'МТО'},
    {id: 15, name: 'СМР'},
    {id: 5, name: 'График'},
    {id: 6, name: 'МиМ'},
    {id: 7, name: 'Рабочие'},
    {id: 8, name: 'Капвложения'},
    {id: 9, name: 'Бюджет'},
    {id: 10, name: 'Финансирование'},
    {id: 11, name: 'Панорамы'},
    {id: 12, name: 'Камеры'},
    {id: 13, name: 'Поручения'},
    {id: 14, name: 'Контрагенты'},
];

interface initialProjectsProps {
    id: number;
    name: string;
}

export function Menu(){
    const [currentProject, setCurrentProject] = useState(15);
    
    function onMenuClicked(event: any) {
        const targetId = event.currentTarget.id;
        setCurrentProject(Number(targetId));
    }

    return(
        <div className='menu-container'>
            <div className='menu-header'>
                <div className='menu-header-title'>
                    <div className='project-name'>Название проекта</div>
                    <div className='abbreviation'>Аббревиатура</div>
                </div>
                <Icon className='arrow-down' source='arrow-down.png' alt='Вниз' />
            </div>
            <div>
                {initialProjects.map(( { id, name }: initialProjectsProps )=>
                    <div 
                        key={id} 
                        id={id.toString()} 
                        className={'menu-project ' + (currentProject === id ? 'current-project' : '')} 
                        onClick={onMenuClicked}>
                        <Icon source='project-icon.png' alt='Icon' />
                        <div>{name}</div>
                    </div>
                )}
                
            </div>
        </div>
    )
}
