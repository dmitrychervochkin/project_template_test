import { useState } from "react";
import { Rows } from "../workspace";
import './rowCard.style.scss';
import '../../../App.style.scss';
import { Icon } from "src/components/icon/icon";
import { server } from "src/server";
import { Input } from "src/components/input/input";

type Row = {
    id: number;
    child: Row[];
};

interface RowCardProps{
    node: Rows; 
    level?: number; 
    setIsSave: (value: any) => void 
    setRows: (value: any) => void 
}
  
const countNestedChildren = (node: Row): number => {
    if (!node.child.length) return 0; 

    let count = 0;

    for (let i = 0; i < node.child.length - 1; i++) { 
        count += 1 + countNestedChildren(node.child[i]); 
    }

    return count + 1; 
};
  
export const RowCard = ({ node, setRows, level = 0, setIsSave }: RowCardProps ) => {
    const [dataToSend, setDataToSend] = useState({
        equipmentCosts: node.equipmentCosts || 0, 
        estimatedProfit: node.estimatedProfit || 0, 
        overheads: node.overheads || 0, 
        parentId: node.id, 
        rowName: node.rowName || `Статья работы №${level + 1}`, 
        salary: node.salary || 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0 
    })
    const [isAdd, setIsAdd] = useState(false);

    function addNewRow(){
        server.addRow(dataToSend).finally(() => setIsSave((prev: boolean) => !prev));
    }
    function onEditRow(){
        setIsAdd((prev:boolean) => !prev)
    }
    function onSaveRow(){
        server.saveRow(dataToSend, node.id).finally(() => {
            setIsSave((prev: boolean) => !prev);
            setIsAdd((prev:boolean) => !prev);
        });
    }
    function deleteRow(){
        server.deleteRow(node.id).finally(() => setIsSave((prev: boolean) => !prev));
    }
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
        setDataToSend(prev => ({ ...prev, [column]: e.target.value}));
    }

    return (
        <div className="row-card-container"> 
            {!isAdd && <div className="row-card" onDoubleClick={onEditRow}>
                <div className="table-section-side">
                    <div className="row-card-level"
                        style={{ paddingLeft: level * 20 }}
                    >
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'relative', zIndex: 20 }}>
                                <Icon className="doc-btn" source='doc-icon.png' alt='doc' onClick={addNewRow}/>
                                <div className="row-menu">
                                    <Icon source='delete-icon.png' alt='doc' onClick={deleteRow}/>
                                </div>
                            </div>
                            <div className="top-line-row" style={{ height: `${countNestedChildren(node) * 48}px` }}></div>
                            {level > 0 && <div className="left-line-row"></div>}
                        </div>     
                    </div>     
                    <div 
                        className="row-card-title"
                        style={{ 
                            marginLeft: `${level * -20}px`, 
                        }}
                    >
                        {node.rowName}
                    </div> 
                    
                </div>
                <div className="table-section-side">
                    <div className="row-card-section">{node.salary}</div>     
                    <div className="row-card-section">{node.equipmentCosts}</div>     
                    <div className="row-card-section">{node.overheads}</div>     
                    <div className="row-card-section">{node.estimatedProfit}</div>     
                </div> 
            </div>}
            {isAdd &&
                <div className="row-card" onDoubleClick={onSaveRow}>
                    <div className="table-section-side">
                        <div className="row-card-level"
                            style={{ paddingLeft: level * 20 }}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'relative', zIndex: 20 }}>
                                    <Icon className="doc-btn" source='doc-icon.png' alt='doc' onClick={addNewRow}/>
                                </div>
                                <div className="top-line-row" style={{ height: `${countNestedChildren(node) * 48}px` }}></div>
                                {level > 0 && <div className="left-line-row"></div>}
                            </div>     
                        </div>     
                        <div 
                            className="row-card-title"
                            style={{ 
                                marginLeft: `${level * -20}px`, 
                            }}
                        >
                            <Input 
                                onChange={(e) => onChangeValue(e, 'rowName')}
                                value={dataToSend.rowName}
                                placeholder='Введите наименование работ...' 
                                style={{ width: '500px', marginRight: '20px' }}/>   
                        </div> 
                        
                    </div>
                    <div className="table-section-side">
                        <Input 
                            onChange={(e) => onChangeValue(e, 'salary')} 
                            placeholder='Заполните поле...' 
                            value={dataToSend.salary}
                            style={{width: '160px', marginRight: '20px'}}/>   
                        <Input 
                            onChange={(e) => onChangeValue(e, 'equipmentCosts')} 
                            value={dataToSend.equipmentCosts}
                            placeholder='Заполните поле...' 
                            style={{width: '160px', marginRight: '20px'}}/>   
                        <Input 
                            onChange={(e) => onChangeValue(e, 'overheads')}
                            value={dataToSend.overheads} 
                            placeholder='Заполните поле...' 
                            style={{width: '160px', marginRight: '20px'}}/>   
                        <Input 
                            onChange={(e) => onChangeValue(e, 'estimatedProfit')}
                            value={dataToSend.estimatedProfit} placeholder='Заполните поле...' 
                            style={{width: '160px', marginRight: '20px'}}/>   
                    </div> 
                </div>
            }
            
            {node.child.map(child => (
                <RowCard key={child.id} node={child} level={level + 1} setIsSave={setIsSave} setRows={setRows} /> 
            ))}
        </div>
    );
  };