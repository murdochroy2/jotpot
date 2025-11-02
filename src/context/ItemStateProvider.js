// ItemProvider.js
import { useState } from 'react';
import itemContext from './ItemContext';

const initialItemState = {
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageData: null,
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

    const addItem = async (name, type, currentLocation, area, updatedBy) => {
        const url = `${host}/api/items/add`
        const method = "POST"
        const requestInit = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                name,
                type,
                currentLocation,
                area: area || 'home',
                updatedBy
            })
        }
        
        try {
            const response = await fetch(url, requestInit)
            const json = await response.json()
            
            if (response.ok) {
                // Add the new item to the local state
                setItems(prevItems => [...prevItems, json])
                return json
            } else {
                throw new Error(json.error || 'Failed to add item')
            }
        } catch (error) {
            console.error('Error adding item:', error)
            throw error
        }
    }

    // Image handling functions for local storage
    const storeImageInLocalStorage = (file, itemId) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageKey = `item_image_${itemId}`;
                const imageData = {
                    dataUrl: e.target.result,
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    storedAt: new Date().toISOString(),
                    localStorageKey: imageKey
                };
                
                try {
                    localStorage.setItem(imageKey, e.target.result);
                    resolve(imageData);
                } catch (error) {
                    reject(new Error('Failed to store image in local storage: ' + error.message));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    };

    const getImageFromLocalStorage = (imageData) => {
        if (!imageData || !imageData.localStorageKey) return null;
        return localStorage.getItem(imageData.localStorageKey);
    };

    const removeImageFromLocalStorage = (imageData) => {
        if (imageData && imageData.localStorageKey) {
            localStorage.removeItem(imageData.localStorageKey);
        }
    };

    const addImageToItem = async (file, itemId) => {
        try {
            const imageData = await storeImageInLocalStorage(file, itemId);
            return imageData;
        } catch (error) {
            console.error('Error adding image to item:', error);
            throw error;
        }
    };

    return (
        <itemContext.Provider value={{ 
            item, 
            resetItem, 
            updateItem, 
            items, 
            getItems,
            addItem,
            addImageToItem,
            getImageFromLocalStorage,
            removeImageFromLocalStorage
        }}>
            {children}
        </itemContext.Provider>
    );
};

export default ItemStateProvider;