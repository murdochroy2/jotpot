import React, { useContext, useState, useEffect } from 'react'
import itemContext from '../context/ItemContext'

const AddItem = ({ showAlert, onItemAdded, show, onHide }) => {
    const { addItem } = useContext(itemContext)
    const initialItem = { 
        name: "", 
        type: "", 
        currentLocation: "", 
        area: "home", 
        updatedBy: "" 
    }
    const [newItem, setNewItem] = useState(initialItem)
    const [isLoading, setIsLoading] = useState(false)

    // Reset form when modal is opened
    useEffect(() => {
        if (show) {
            setNewItem(initialItem)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    const handleAddItem = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        try {
            await addItem(
                newItem.name, 
                newItem.type, 
                newItem.currentLocation, 
                newItem.area, 
                newItem.updatedBy
            )
            setNewItem(initialItem)
            if (showAlert) {
                showAlert("success", "Item Added Successfully")
            }
            if (onItemAdded) {
                onItemAdded()
            }
            // Close modal after successful addition
            if (onHide) {
                onHide()
            }
        } catch (error) {
            console.error('Error adding item:', error)
            if (showAlert) {
                showAlert("danger", "Failed to add item: " + error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const onChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setNewItem(initialItem)
        if (onHide) {
            onHide()
        }
    }

    if (!show) return null

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Item</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={handleClose}
                            disabled={isLoading}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddItem} id="addItemForm">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name *</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="name" 
                                            name="name" 
                                            onChange={onChange} 
                                            minLength={3} 
                                            required 
                                            value={newItem.name}
                                            placeholder="Enter item name"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="type" className="form-label">Type</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="type" 
                                            name="type" 
                                            onChange={onChange} 
                                            value={newItem.type}
                                            placeholder="Enter item type"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="currentLocation" className="form-label">Current Location *</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="currentLocation" 
                                            name="currentLocation" 
                                            onChange={onChange} 
                                            minLength={3}
                                            required 
                                            value={newItem.currentLocation}
                                            placeholder="Enter current location"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="area" className="form-label">Area</label>
                                        <select 
                                            className="form-control" 
                                            id="area" 
                                            name="area" 
                                            onChange={onChange} 
                                            value={newItem.area}
                                            disabled={isLoading}
                                        >
                                            <option value="home">Home</option>
                                            <option value="office">Office</option>
                                            <option value="garage">Garage</option>
                                            <option value="storage">Storage</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="updatedBy" className="form-label">Updated By</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="updatedBy" 
                                            name="updatedBy" 
                                            onChange={onChange} 
                                            value={newItem.updatedBy}
                                            placeholder="Enter your name"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            form="addItemForm"
                            className="btn btn-primary" 
                            disabled={
                                newItem.name.length < 3 || 
                                newItem.currentLocation.length < 3 || 
                                isLoading
                            }
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Adding...
                                </>
                            ) : (
                                'Add Item'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem
