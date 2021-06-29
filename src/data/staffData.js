import firebase from '../firebaseHandler'
import Staff from '../models/staff';

const firestore = firebase.firestore();

export const getStaffs = async (user) => {
    try {
        const response = await firestore.collection('staffs').where("department","==",user.department);
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const staff = new Staff(
                doc.id,
                doc.data().firstname,
                doc.data().lastname,   
                doc.data().phonenumber,
                doc.data().gender,
                doc.data().department,
                doc.data().role,
                doc.data().adminName,
                doc.data().adminEmail
            );
            array.push(staff);
        });
        return array;
    } catch (error) {
        throw error;
    }
}
export const getAllStaffs = async () => {
    try {
        const response = await firestore.collection('staffs')
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const staff = new Staff(
                doc.id,
                doc.data().firstname,
                doc.data().lastname,
                doc.data().phonenumber,
                doc.data().gender,
                doc.data().department,
                doc.data().role,
                doc.data().adminName,
                doc.data().adminEmail
            );
            array.push(staff);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addStaff = async (staff) => {
    try {
        await firestore.collection('staffs').doc(staff.firstname).set(staff);
    } catch (error) {
        throw error;
    }
}

export const getStaff = async (id) => {
    try {
        const staff = await firestore.collection('staffs').doc(id);
        const data = await staff.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateStaff = async (id, data) => {
    try {
        const staff = await firestore.collection('staffs').doc(id);
        await staff.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteStaff = async (id) => {
    try {
        await firestore.collection('staffs').doc(id).delete();
    } catch (error) {
        throw error;
    }
}