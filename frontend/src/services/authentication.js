
// Export tous les services pour accès public
export const authenticationServices = {
    login,
    logout,
};

function login(email, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    // };
  
    // return fetch(`/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         localStorage.setItem('user', JSON.stringify(user));

    //         return user;
    //     });

    var user = {
                firstname: 'Benoit',
                lastname: 'Kovarz',
                email: 'benoit.kovarz@whoog.com',
                last_connexion: "2000-01-03T00:00:00.000Z",
            }
    localStorage.setItem('user', JSON.stringify(user));
    return new Promise(function(resolve, reject)
    {  
        resolve(user);
    });
}


function logout() {
    localStorage.removeItem('user')
    return  new Promise((resolve, reject) => { 
        resolve(true); 
    });
}

