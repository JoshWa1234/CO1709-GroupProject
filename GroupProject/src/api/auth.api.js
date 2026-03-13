

export async function getAuthToken(){
    this.authToken = await fetch(apiurl+'/getToken');
}

export async function loginUserIn(email,password){
    const response = await fetch("https://api.github.com/users/login", {})
    return response.json()
}