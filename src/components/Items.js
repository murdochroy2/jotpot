import React, { useEffect } from 'react'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import StylizedTable from './StylizedTable';

const Items = (props) => {
    useEffect(() => {
        props.removeBodyClass()
        $(function() {
            $(document).ready(function() {
              $('#example').DataTable();
            });
          });
    }, []
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
                <StylizedTable />
            </div>
        </div>
    )
}

export default Items