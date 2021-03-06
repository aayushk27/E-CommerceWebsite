import { API } from "../../backend";


// note: category calls


// create: create category
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// read: get all categories
export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}





// note: product calls


// create: create product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`        
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// read: get all products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// read: get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method : "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// update: update product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : "PUT",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`        
        },
        body : product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// delete: delete product
export const deleteProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : "DELETE",
        headers : {
            Accept : "application/json",
            Authorization : `Bearer ${token}`        
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}



