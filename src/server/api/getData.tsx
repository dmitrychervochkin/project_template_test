import { eID, DATABASE_URL as databaseUrl } from '../../constants';

export async function getData(){
    const response = await fetch(`${databaseUrl}/v1/outlay-rows/entity/${eID}/row/list`).then((data) => data.json())

    return response;
}