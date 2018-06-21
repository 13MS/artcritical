import alt from '../alt';
import "isomorphic-fetch"

class AuthActions {
    constructor() {
        this.generateActions(
            'sessionCheckFailure', 
            'sessionCheckSuccess',
            'addToMyListSuccess',
            'addToMyListFailure',
            'loginAttempt',
            'loginFailure',
            'loginSuccess',
            'logoutSuccess',
            'logoutFailure',
            'registerAttempt',
            'registerSuccess',
            'registerFailure',
            'updateUserSuccess',
            'updateUserFailure',
            'updateUserAttempt',
            'deleteUserSuccess',
            'deleteUserFailure',
            'deleteUserAttempt',
            'getMylistSuccess',
            'getMylistFailure',
            'reorderMyListSuccess',
            'reorderMyListFailure',
            'getUserMylistSuccess',
            'getUserMylistFailure',
            'getAllUserAttempt',
            'getAllUserSuccess',
            'getAllUserFailure'
        );
    }
    
    async attemptLogIn(userData) {
        
        this.loginAttempt();


        await fetch(
          '/auth/login',
          {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
          },
        ).then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return null;
        })
        .then((json) => {
          if (json) {
            console.log(json);
            this.loginSuccess(json);
          } else {
            this.loginFailure(new Error('Authentication Failed'));
          }
        })
        .catch((error) => {
          this.loginFailure(new Error(error));
        });
  }
    
    async attemptLogOut() {

        await fetch(
          '/auth/logout',
          {
            method: 'GET',
            credentials: 'same-origin',
          },
        )
        .then((response) => {
          if (response.status === 200) {
            return this.logoutSuccess();
              return true;
          }
          return this.logoutFailure('Error: ${response.status}');
            return true;
        })
        .catch((error) => {
          this.logoutFailure(error);
            return true;
        });

    }
    
    facebookLogin(user){
        return(user);
    }
    
    async attemptRegister(registerData) {
        
        this.registerAttempt();

        await fetch(
          '/auth/signup',
          {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
              'Content-Type': 'application/json',
            },
			 credentials: 'same-origin',
          },
        ).then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return null;
        })
        .then((json) => {
          if (json) {
            this.registerSuccess(json);
          } else {
            this.registerFailure(new Error('Registration Failed'));
          }
        })
        .catch((error) => {
          this.registerFailure(new Error(error));
        });
  }
    
    async getMylist() {
        console.log('Get MyList');
        await fetch(
          '/auth/getmylist',
          {
            method: 'GET',
            credentials: 'same-origin',
          },
        )
        .then((response) => {
          if (response.status === 200) {
              return response.json();
          }
          return null;
        })
        .then((data) => {
            if (data) {
                this.getMylistSuccess(data)
                return true;
            } 
            this.getMylistFailure(data.error);
            return true;
        })
        .catch((error) => {
            this.getMylistFailure(error)
            return true;
        });
    }
	
	async getUserMylist(user_slug) {
        await fetch(
          '/auth/getusermylist/' + user_slug,
          {
            method: 'GET',
            credentials: 'same-origin',
          },
        )
        .then((response) => {
          if (response.status === 200) {
              return response.json();
          }
          return null;
        })
        .then((data) => {
            if (data) {
                this.getUserMylistSuccess(data)
                return true;
            } 
            this.getUserMylistFailure(data.error);
            return true;
        })
        .catch((error) => {
            this.getUserMylistFailure(error)
            return true;
        });
    }
    
    async checkSession() {
        console.log('Check Session');
        await fetch(
          '/auth/checksession',
          {
            method: 'GET',
            credentials: 'same-origin',
          },
        )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          return null;
        })
        .then((json) => {
            if (json._id) {
            this.sessionCheckSuccess(json);
              return true;
            } 
            this.sessionCheckFailure(json.error);
            return true;
        })
        .catch((error) => {
          this.sessionCheckFailure(error);
            return true;
        });
      }
    
    async addToUserList(listing) {

      let newListing = listing
      delete newListing.zoomLevels
        
        //Upload the ID to the user profile
        await fetch(
          '/auth/addtolist',
          {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(listing),
            headers: {
              'Content-Type': 'application/json',
            }
          },
        ).then((response) => {
          if (response.status === 200) {
              return response.json();
          }
          return null;
        })
        .then((json) => {
            this.addToMyListSuccess(json);
            return true;
        })
        .catch((error) => {
          this.addToMyListFailure(error);
            return true;
        });
    }
    
    async reorderMyList(newList) {
        
        this.reorderMyListAttempt(newList);
        
        await fetch(
          '/auth/updatemylist',
          {
            body: JSON.stringify(newList),
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            }
          },
        )
        .then((response) => {
          if (response.status === 200) {
              return response.json();
          }
            return null;
        })
        .then((json) => {
            this.reorderMyListSuccess(json);
            return true;
        })
        .catch((error) => {
            this.reorderMyListFailure(error);
            return true;
        });
    }
    reorderMyListAttempt(newList){
        return newList;
    }
    
    async updateUser(newUserInfo) {

        this.updateUserAttempt();
        
        await fetch(
          '/auth/updateuser',
          {
            body: JSON.stringify(newUserInfo),
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            }
          },
        )
        .then((response) => {
          if (response.status === 200) {
              return response.json();
          }
            return null;
        })
        .then((json) => {
            this.updateUserSuccess(json);
            return true;
        })
        .catch((error) => {
            this.updateUserFailure(error);
            return true;
        });

    }

    async deleteUser(user) {

      this.deleteUserAttempt();
      
      await fetch(
        '/auth/deleteuser',
        {
          body: JSON.stringify(user),
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          }
        },
      )
      .then((response) => {
        if (response.status === 200) {
            return response.json();
        }
          return null;
      })
      .then((json) => {
          this.deleteUserSuccess(json);
          return true;
      })
      .catch((error) => {
          this.deleteUserFailure(error);
          return true;
      });

  }
	
	async getAllUsers() {
		
		console.log("Getting all Users");

        this.getAllUserAttempt.defer()
        
        await fetch(
          '/auth/getallusers',
          {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
            }
          },
        )
        .then((response) => {
          if (response.status === 200) {
              return response.json();
          }
            return null;
        })
        .then((json) => {
            this.getAllUserSuccess(json);
            return true;
        })
        .catch((error) => {
            this.getAllUserFailure(error);
            return true;
        });
    }
    
    // When a user type new info in the account page
    userInfoChange(event, index){
        return {event, index};
    }

}

export default alt.createActions(AuthActions);