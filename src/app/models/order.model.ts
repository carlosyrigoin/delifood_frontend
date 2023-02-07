export interface Order {
    _id?: string,
    delivery_address: string,
    user_id: string,
    date?:Date,
    total:number,
    state?:boolean,
    items: Detail[]
}

export interface Detail {
    product_id: string,
    order_id?: string,
    quantity: number,
    description: string,
    price:number
}