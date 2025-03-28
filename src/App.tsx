import './App.style.scss'
import { Header } from './components/header/header'
import { Menu } from './components/menu/menu'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Rows, Workspace } from './components/workspace/workspace'
import { server } from './server'

export function App() {
    const params = Object.entries({
        cc_load_policy: 0,
        controls: 2,
        fs: 0,
        rel: 0,
        showinfo: 0
    }).map(([key, value]) => `${key}=${value}`).join('&')

    const [rows, setRows] = useState([])
    const [isSave, setIsSave] = useState(false)

    useEffect(()=>{
        server.getData().then((res)=> setRows(res))
    },[isSave])

    return (
        <>
            <Header />
            <div className='app-main'>
                <Menu />
                <Workspace rows={rows} setIsSave={setIsSave} setRows={setRows}/>
            </div>
        </>
    )
}

