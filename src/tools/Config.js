export default {
    getIp(){
        console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV === 'production'){
            return 'http://101.35.144.20:3000'
        }else{
            return 'http://localhost:3000'
        }
    }
    // GetUserId(){

    // }
}