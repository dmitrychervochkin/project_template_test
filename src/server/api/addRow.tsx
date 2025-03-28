import { eID, DATABASE_URL as databaseUrl } from '../../constants';

interface AddRowProps{
    equipmentCosts?: number,
    estimatedProfit?: number,
    overheads?: number,
    parentId: number,
    rowName: string,
    salary?: number,
    machineOperatorSalary?: number,
    mainCosts?: number,
    materials?: number,
    mimExploitation?: number,
    supportCosts?: number
}

export async function addRow(obj: AddRowProps){
    const response = await fetch(`${databaseUrl}/v1/outlay-rows/entity/${eID}/row/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(obj)
    }).then((data) => data.json());

    console.log(obj)

    return response;
}