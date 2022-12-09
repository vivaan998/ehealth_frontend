const setProfileData = (data) => {
    localStorage.setItem('profileData', JSON.stringify(data));
}

const getProfileData = () => {
    var profileData;
    profileData = JSON.parse(localStorage.getItem('profileData'));
    return profileData
}

const Config = {
    setProfileData: setProfileData,
    getProfileData: getProfileData
}


export default Config;