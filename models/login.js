class login {
    constructor(){
        this.current = null
    }

    logIn(userName, password){
        mongoose.connect(process.env.DATABASE_URL)
        const users = await userInfo.find({})
        for (let i = 0; i < users.length - 1; i++) {
            let userNameR = users[i].username
            let passwordR = users[i].password
            if (password == passwordR && userName == userNameR){
                this.current = userNameR
                break
            }
        }
        throw new Exception("Login invalid")
    }

}