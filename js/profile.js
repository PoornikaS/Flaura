const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');
const logoutBtn = document.querySelector('.logout-btn');
const profileInfo = document.querySelector('.profile-info');
const profileInputs = profileInfo.querySelectorAll('span:not(:first-child)');
const profileImage = document.getElementById('profileImage');
const imageUpload = document.getElementById('imageUpload');
const uploadLabel = document.querySelector('.upload-label');

let isEditing = false;

// Load data from local storage
const storedData = JSON.parse(localStorage.getItem('profileData')) || {};
updateProfileInfo(storedData);

// Event listeners
editBtn.addEventListener('click', () => {
    isEditing = true;
    editBtn.style.display = 'none';
    saveBtn.disabled = false;
    uploadLabel.style.display = 'block';
    profileInputs.forEach((input) => {
        input.contentEditable = true;
        input.style.backgroundColor = '#f5f5f5';
    });
});

saveBtn.addEventListener('click', () => {
    isEditing = false;
    editBtn.style.display = 'block';
    saveBtn.disabled = true;
    uploadLabel.style.display = 'none';
    profileInputs.forEach((input) => {
        input.contentEditable = false;
        input.style.backgroundColor = 'transparent';
    });

    const updatedData = {
        username: document.getElementById('username').textContent,
        name: document.getElementById('name').textContent,
        email: document.getElementById('email').textContent,
        gender: document.getElementById('gender').textContent,
        orders: document.getElementById('orders').textContent,
        mobile: document.getElementById('mobile').textContent,
        profileImage: profileImage.src
    };

    localStorage.setItem('profileData', JSON.stringify(updatedData));
});

logoutBtn.addEventListener('click', () => {
    // Clear local storage
    localStorage.removeItem('profileData');
    // Redirect to the login page or any other desired action
    window.location.href = 'login.html';
});

imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        profileImage.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

function updateProfileInfo(data) {
    document.getElementById('username').textContent = data.username || 'puru';
    document.getElementById('name').textContent = data.name || 'Poornika Sharma';
    document.getElementById('email').textContent = data.email || 'poornikasharma.p@gmail.com';
    document.getElementById('gender').textContent = data.gender || 'Female';
    document.getElementById('orders').textContent = data.orders || '1';
    document.getElementById('mobile').textContent = data.mobile || '+91 934785236';
    profileImage.src = data.profileImage || 'https://via.placeholder.com/150';
}