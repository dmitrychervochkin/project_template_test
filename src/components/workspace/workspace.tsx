import { useState } from "react";
import { RowCard } from './rowCard/rowCard';
import './workspace.style.scss';
import '../../App.style.scss'

export interface Rows {
    id: number;
    rowName: string;
    child: Rows[];
    parentId?: number;
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    salary: number;
    supportCosts: number;
    total: number;
}

interface TreeViewProps {
    rows: Rows[];
    setIsSave: (prev: any) => void;
    setRows: (prev: any) => void;
}
  
export const Workspace = ({ rows, setRows, setIsSave }: TreeViewProps ) => {

    function toggleSave () {
        setIsSave((prev: boolean) => !prev);  // Меняет состояние на противоположное
    };

    return (
        <div className="workspace-container">
            <div className="workspace-header">
                <div className="project-title">    
                    Строительно-монтажные работы
                </div>
            </div>
            <div className="table-header">
                <div className="table-section-side">
                    <div className="table-header-level">Уровень</div>
                    <div className="table-header-title">Наименование работ</div>
                </div>
                <div className="table-section-side">
                    <div className="table-header-section">Основная з/п</div>
                    <div className="table-header-section">Оборудование</div>
                    <div className="table-header-section">Накладные расходы</div>
                    <div className="table-header-section">Сметная прибыль</div>
                </div>
            </div>
            <div className="workspace-main">
                {rows.map((node) => (
                    <RowCard key={node.id} node={node} setIsSave={toggleSave} setRows={setRows} />
                ))}
            </div>
        </div>
    );
};