import firebase from '../firebaseHandler'
import User from '../models/admin';

const firestore = firebase.firestore();

export const getUsers = async () => {
    try {
        const response = await firestore.collection('users').where('userType', '==', "Admin");
        const data = await response.get();
        let array = [];
        data.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().username,
                doc.data().email,
                doc.data().userType,
                doc.data().department,
            );
            array.push(user);
        });
        return array;
    } catch (error) {
        throw error;
    }
}

export const addUser = async (user) => {
    try {
        await firestore.collection('users').doc(user.username).set(user);
    } catch (error) {
        throw error;
    }
}

export const getUser = async (id) => {
    try {
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        return data.data();
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, data) => {
    try {
        const user = await firestore.collection('users').doc(id);
        await user.update(data)
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        await firestore.collection('users').doc(id).delete();
    } catch (error) {
        throw error;
    }
}