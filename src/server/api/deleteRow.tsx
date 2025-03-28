import { eID, DATABASE_URL as databaseUrl } from '../../constants';

export async function deleteRow(rID: number){
    console.log(rID)
    await fetch(`${databaseUrl}/v1/outlay-rows/entity/${eID}/row/${rID}/delete`, {
        method: 'DELETE',
    })

    // return response;
}