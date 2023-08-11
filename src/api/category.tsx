import instance from "./instance";
import { IPcategory } from "../types/categories";

const getAllCategory = () => {
    return instance.get('/categories');
}
const getOneCategory= (id: number) => {
    return instance.get('/categories/' + id);
}
const addCategory = (category: IPcategory) => {
    return instance.post('/categories', category);
}
const deleteCategory = (id: number) => {
    return instance.delete('/categories/' + id);
}
const updateCategory = (category: IPcategory) => {
    return instance.put('/categories/' + category.id, category);
}

export { getAllCategory, getOneCategory, addCategory, deleteCategory, updateCategory }
