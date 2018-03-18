const envWarning =() =>{
  if(!process.env.envFileExists) {
    console.log("!!! The .env file does not exist")
    console.log("Please rename .env.development to .env")
    console.log("Or ping  @alexboots and ask for it :)")
  }
}

module.exports = envWarning