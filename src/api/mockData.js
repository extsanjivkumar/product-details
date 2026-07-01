export const productInfo = {
    id: "P10001",
    productName: "Apple iPhone 16 Pro 256GB",
    sku: "APL-IP16P-256-BLK",
    category: "Smartphones",
    brand: "Apple",
    description:
        "Premium smartphone with A18 Pro chip, 256GB storage, and 48MP camera.",
};

export const inventory = [
    {
        warehouse: "Bangalore Warehouse",
        location: "Bangalore",
        availableStock: 150,
        reservedStock: 20,
        totalStock: 170,
    },
    {
        warehouse: "Delhi Warehouse",
        location: "Delhi",
        availableStock: 90,
        reservedStock: 10,
        totalStock: 100,
    },
    {
        warehouse: "Mumbai Warehouse",
        location: "Mumbai",
        availableStock: 75,
        reservedStock: 15,
        totalStock: 90,
    },
];

export const availability = [
    {
        location: "Bangalore",
        available: true,
        remarks: "Ready for dispatch",
    },
    {
        location: "Delhi",
        available: true,
        remarks: "Limited stock",
    },
    {
        location: "Hyderabad",
        available: false,
        remarks: "Out of stock",
    },
];

export const network = [
    {
        source: "Apple Factory",
        destination: "Bangalore Warehouse",
        status: "Delivered",
    },
    {
        source: "Bangalore Warehouse",
        destination: "Delhi Warehouse",
        status: "In Transit",
    },
    {
        source: "Delhi Warehouse",
        destination: "Retail Store",
        status: "Pending",
    },
];