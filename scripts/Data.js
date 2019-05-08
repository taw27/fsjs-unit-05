"use strict";

class Data {
  constructor() {
    this.users = null;
    this.filteredUsers = null;
    this.currentModalUser = null;

    this.setActiveModalUsingImg = this.setActiveModalUsingImg.bind(this);
    this.updateCurrentModalInfo = this.updateCurrentModalInfo.bind(this);
    this.getNextUserInfo = this.getNextUserInfo.bind(this);
    this.getPreviousUserInfo = this.getPreviousUserInfo.bind(this);
  }

  getNextUserInfo(){
    const currentUserImg = this.currentModalUser.picture.medium;
    const currentUserIndex = this.filteredUsers.findIndex((user) => user.picture.medium === currentUserImg);

    console.log(currentUserIndex );
    console.log(currentUserImg);
    console.log(currentUserIndex < this.filteredUsers.length ? this.filteredUsers[currentUserIndex + 1] : null);

    if(currentUserIndex < this.filteredUsers.length - 1 ){
      const nextUser = this.filteredUsers[currentUserIndex + 1];
      this.currentModalUser = nextUser;
      return nextUser
    } 

    return null;
  }

  getPreviousUserInfo(){
    const currentUserImg = this.currentModalUser.picture.medium;
    const currentUserIndex = this.filteredUsers.findIndex((user) => user.picture.medium === currentUserImg);

    if(currentUserIndex > 0){
      const previousUser = this.filteredUsers[currentUserIndex - 1];
      this.currentModalUser = previousUser
      return previousUser;
    }

    return  null; 
  }
  

  formatDob(dob) {
    const birthDate = new Date(dob);
    console.log(birthDate);
    return `${birthDate.getMonth()}/${birthDate.getDate()}/${
      birthDate.getFullYear()
    }`;
  }

  // from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ")" + match[2] + "-" + match[3];
    }
    return null;
  }

  async setUsers(numberOfUsers = 12, nationalities = ["us"]) {
    const concatedNationalities = nationalities.join();
    const apiEndPoint = `https://randomuser.me/api/1.2/?results=${numberOfUsers}&nat=${concatedNationalities}`;
    try {
      const response = await fetch(apiEndPoint);
      this.users = await response.json().then(data => data.results);
      this.filteredUsers = this.users;
      console.log(this.users);
    } catch (error) {
      throw error;
    }
  }

  setActiveModalUsingImg(emailString){
    const selectedUser = (this.filteredUsers.filter((user) => user.email === emailString))[0];
    this.updateCurrentModalInfo(selectedUser);
  }

  updateCurrentModalInfo(user){
    user.phone = this.formatPhoneNumber(user.phone);
    user.dob.date = this.formatDob(user.dob.date);

    this.currentModalUser =  user;
  }
}
