
export default ({ $axios }) => {
  $axios.onRequest( (config) => {
    config.headers.client = window.localStorage.getItem("client")
    config.headers["access-token"] = window.localStorage.getItem("access-token")
    config.headers.uid = window.localStorage.getItem("uid")
    config.headers["token-type"] = window.localStorage.getItem("token-type")
  })

  $axios.onResponse( (response) => {
    console.log(response)
    if(response.headers.client){
      localStorage.setItem("access-token",response.headers["access-token"])
      localStorage.setItem("client",response.headers.client)
      localStorage.setItem("uid",response.headers.uid)
      localStorage.setItem("token-type",response.headers["token-type"])

      localStorage.setItem("user-id",response.data.data.id)
    }
  })
}
