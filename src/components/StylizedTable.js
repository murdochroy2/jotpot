import React, { useEffect, useState } from 'react'
import Item from './Item'
import AddItem from './AddItem'
import { useContext } from 'react'
import itemContext from '../context/ItemContext'
import $ from 'jquery';

const StylizedTable = (props) => {
    const { items, getItems } = useContext(itemContext)
    const [showAddForm, setShowAddForm] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        getItems()
            .then(() => {
                console.log(`items loaded:`, items)
            })
            .catch(error => {
                console.error('Error loading items:', error)
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            // Destroy existing DataTable if it exists
            if ($.fn.DataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy();
            }
            // Initialize new DataTable
            $('#example').DataTable({
                destroy: true,
                responsive: true,
                pageLength: 10,
                order: [[5, 'desc']] // Sort by Updated On column (index 5) in descending order
            })
        }
    }, [items])

    const showAlert = (type, message) => {
        setAlert({ type, message })
        setTimeout(() => setAlert(null), 3000)
    }

    const handleItemAdded = () => {
        setShowAddForm(false)
        // Refresh items will happen automatically due to context update
    }

    return (
        <div>
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setAlert(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            
            <div className="row mb-3">
                <div className="col-12">
                    <button 
                        className="btn btn-success"
                        onClick={() => setShowAddForm(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add New Item
                    </button>
                </div>
            </div>

            <AddItem 
                show={showAddForm}
                onHide={() => setShowAddForm(false)}
                showAlert={showAlert}
                onItemAdded={handleItemAdded}
            />

            <div className="row py-5">
                <div className="col-lg-10 mx-auto">
                    <div className="card rounded shadow border-0">
                        <div className="card-body p-5 bg-white rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h3>Items List</h3>
                                <span className="badge bg-primary">
                                    Total: {items.length}
                                </span>
                            </div>
                            <div className="table-responsive">
                                <table 
                                    id="example" 
                                    style={{ "width": "100%" }} 
                                    className="table table-striped table-bordered" 
                                    ref={props.tableRef}
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Current Location</th>
                                            <th>Previous Location</th>
                                            <th>Area</th>
                                            <th>Updated On</th>
                                            <th>Updated By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <Item data={item} key={item._id || index} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StylizedTable