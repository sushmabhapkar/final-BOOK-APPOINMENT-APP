// script.js
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const list = document.getElementById('userlist');

form.addEventListener('submit', addItem);

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/da7ab3ac0bd249a4a1c4318b4b617737/AppoinmentData")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showData(response.data[i]);
            }
        })
        .catch((error) => {
            console.error(error);
        });
});

function addItem(e) {
    e.preventDefault();

    const Name = name.value;
    const Email = email.value;
    const data = {
        Name,
        Email
    };

    axios.post("https://crudcrud.com/api/da7ab3ac0bd249a4a1c4318b4b617737/AppoinmentData", data)
        .then((response) => {
            showData(response.data);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showData(data) {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
        <strong>Name:</strong> ${data.Name},
        <strong>Email:</strong> ${data.Email}`;
    
    const deleteBtn = createButton("Delete", () => deleteData(data._id, listItem));
    const editBtn = createButton("Edit", () => editData(data));

    listItem.appendChild(deleteBtn);
    listItem.appendChild(editBtn);

    list.appendChild(listItem);
}

function createButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}

function deleteData(id, listItem) {
    axios.delete(`https://crudcrud.com/api/da7ab3ac0bd249a4a1c4318b4b617737/AppoinmentData/${id}`)
        .then(response => {
            console.log(response);
            listItem.remove();
        })
        .catch(error => {
            console.log(error);
        });
}

function editData(data) {
    // Populate the form with the user details for editing
    name.value = data.Name;
    email.value = data.Email;

    // Change the form submit handler for editing
    form.removeEventListener('submit', addItem);
    form.addEventListener('submit', (e) => updateItem(e, data._id));
}

function updateItem(e, id) {
    e.preventDefault();

    const updatedName = name.value;
    const updatedEmail = email.value;
    const updatedData = {
        Name: updatedName,
        Email: updatedEmail
    };

    axios.put(`https://crudcrud.com/api/da7ab3ac0bd249a4a1c4318b4b617737/AppoinmentData/${id}`, updatedData)
        .then(response => {
            console.log(response);
            // Refresh the list with updated data
            list.innerHTML = "";
            axios.get("https://crudcrud.com/api/da7ab3ac0bd249a4a1c4318b4b617737/AppoinmentData")
                .then((response) => {
                    for (var i = 0; i < response.data.length; i++) {
                        showData(response.data[i]);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.log(error);
        });

    }