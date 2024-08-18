import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import StylizedTable from './StylizedTable';

const Items = (props) => {
    let tableRef = useRef()
    const [table, setTable] = useState(null)
    useEffect(
        () => {
            props.removeBodyClass()
            // When items were updated, the first row of the table still showed no data available
            // $(function () {
            //     $(document).ready(function () {
            //         $('#example').DataTable();
            //     });
            // });
            // When items were added, the table was not updated
            // const _table = $(tableRef.current).DataTable()
            // setTable(_table)
            // console.log(_table)
        },
        []
    )
    const style = {
        minHeight: '100vh',
        backgroundColor: '#FFE53B',
        backgroundImage: 'linear-gradient(147deg, #FFE53B 0%, #FF2525 100%)',
    }
    return (
        <div style={style}>
            <div className="container py-5">
                <header className="text-center text-white">
                    <h1 className="display-4">Bootstrap Datatables</h1>
                    <p className="lead mb-0">Using Bootstrap 4 and <a href="https://datatables.net/examples/styling/bootstrap4.html" className="text-white font-italic">
                        <u>Datatables</u></a>, add interaction controlsto your HTML tables.</p>
                    <p className="font-italic">Snippet By
                        <a href="https://bootstrapious.com" className="text-white">
                            <u>Bootstrapious</u>
                        </a>
                    </p>
                </header>
                <StylizedTable
                // These were passed to the StylizedTable component. But they could not be updated
                // tableRef={tableRef} table={table}
                />
            </div>
        </div>
    )
}

export default Items