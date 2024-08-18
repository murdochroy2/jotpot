// ItemProvider.js
import { useState } from 'react';
import itemContext from './ItemContext';

const initialItemState = {
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
};

const ItemStateProvider = ({ children }) => {
    const host = "http://localhost:5000"
    const [item, setItem] = useState(initialItemState);
    const [items, setItems] = useState([]);

    const resetItem = () => {
        setItem(initialItemState);
    };

    const updateItem = (newItem) => {
        setItem((prevItem) => ({ ...prevItem, ...newItem }));
    };

    const getItems = async () => {
        const url = `${host}/api/items/list`
        const method = "GET"
        const requestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        }
        const response = await fetch(url, requestInit)
        const json = await response.json()
        // console.log(json)
        setItems(json)
    }

    return (
        <itemContext.Provider value={{ item, resetItem, updateItem, items, getItems }}>
            {children}
        </itemContext.Provider>
    );
};

export default ItemStateProvider;